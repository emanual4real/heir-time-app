using System.Globalization;
using heir_time_api.Controllers.InputModels;
using heir_time_api.Models;
using heir_time_api.Repositories.Items;
using heir_time_api.Services.Bid;
using heir_time_api.Services.Item;
using heir_time_api.Services.S3;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace heir_time_api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class ItemController : ControllerBase
{
    readonly IConfiguration _configuration;
    readonly IItemRepository _itemRepository;
    readonly IItemService _itemService;
    readonly IS3Service _s3Service;
    readonly IBidService _bidService;

    public ItemController(IConfiguration configuration, IItemRepository repository, IItemService itemService, IBidService bidService, IS3Service s3Service)
    {
        _configuration = configuration;
        _itemRepository = repository;
        _itemService = itemService;
        _bidService = bidService;
        _s3Service = s3Service;
    }

    private static Item AddFileUrls(Item item, string prefix, IEnumerable<S3ObjectDto> files)
    {
        if (files.Any())
        {
            var fileKeys = item.FileKeys.Select(y => $"{prefix}/{y}");

            if (fileKeys.Any())
            {
                var fileUrls = files.Where(y => fileKeys.Contains(y.Name)).Select(y => y.PresignedUrl);

                item.FileUrls = fileUrls.ToList();

            }

        }

        return item;
    }

    private static IEnumerable<Item> AddFileUrls(IEnumerable<Item> items, string prefix, IEnumerable<S3ObjectDto> files)
    {
        if (files.Any())
        {
            return items.Select(x =>
            {
                var fileKeys = x.FileKeys.Select(y => $"{prefix}/{y}");

                if (fileKeys.Any())
                {
                    var fileUrls = files.Where(y => fileKeys.Contains(y.Name)).Select(y => y.PresignedUrl);

                    x.FileUrls = fileUrls.ToList();

                }

                return x;
            });
        }

        return items;
    }

    private string GetBucketName()
    {
        var bucketName = _configuration.GetSection("AWS").GetValue<string>("BucketName") ?? throw new Exception("BucketName is missing from configuration");
        return bucketName;
    }

    private async Task<Item> SaveFileToS3(Item item, IFormFile? file, string prefix)
    {
        var _bucketName = GetBucketName();
        if (file != null)
        {
            await _s3Service.SaveFile(file, _bucketName, prefix);

            if (item.FileKeys != null)
            {
                item.FileKeys.Add(file.FileName);
            }
            else
            {
                item.FileKeys = [file.FileName];
            }
        }

        return item;
    }

    // GET api/item/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Item?>> GetItem(string id)
    {
        var _bucketName = GetBucketName();
        var prefix = ControllerHelpers.GetClaim(HttpContext.User, "UserId");
        var files = await _s3Service.GetAllFiles(_bucketName, prefix);
        var item = await _itemRepository.GetItemById(id);

        if (files != null && item != null && prefix != null)
        {
            return Ok(AddFileUrls(item, prefix, files));
        }
        return Ok(item);
    }

    // GET api/item/items
    [Route("items")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Item>>> GetItems()
    {
        var _bucketName = GetBucketName();
        var prefix = ControllerHelpers.GetClaim(HttpContext.User, "UserId");
        var files = await _s3Service.GetAllFiles(_bucketName, prefix);

        var items = await _itemService.GetAllItems();

        if (files != null && items.Any() && prefix != null)
        {
            return Ok(AddFileUrls(items, prefix, files));
        }
        return Ok(items);


    }

    // POST api/item
    [HttpPost]
    public async Task<ActionResult<Item?>> Post([FromForm] string itemJson, IFormFile? file)
    {
        Item item = JsonConvert.DeserializeObject<Item>(itemJson);
        var isAdmin = ControllerHelpers.IsAdmin(HttpContext.User);
        var userId = ControllerHelpers.GetClaim(HttpContext.User, "UserId");

        if (isAdmin && userId != null)
        {
            var prefix = userId;
            var newItem = await SaveFileToS3(item, file, prefix);

            return await _itemRepository.InsertItem(newItem);
        }

        return Unauthorized();
    }

    // PUT api/item
    [HttpPut]
    public async Task<ActionResult<Item?>> Update([FromForm] IFormFile? file, string itemJson)
    {
        Item item = JsonConvert.DeserializeObject<Item>(itemJson);
        var isAdmin = ControllerHelpers.IsAdmin(HttpContext.User);
        var userId = ControllerHelpers.GetClaim(HttpContext.User, "UserId");

        if (isAdmin && userId != null)
        {
            var prefix = userId;
            var newItem = await SaveFileToS3(item, file, prefix);

            return await _itemRepository.UpdateItem(newItem);
        }

        return Unauthorized();
    }

    // DELETE api/item/id
    [HttpDelete("{id}")]
    public async Task<ActionResult<string?>> Delete(string id)
    {
        var _bucketName = GetBucketName();
        var isAdmin = ControllerHelpers.IsAdmin(HttpContext.User);
        var userId = ControllerHelpers.GetClaim(HttpContext.User, "UserId");

        if (isAdmin && userId != null)
        {
            var item = await _itemRepository.GetItemById(id);

            if (item != null && item.FileKeys != null)
            {
                var filePrefix = userId;
                var fileKeys = item.FileKeys;
                await _s3Service.DeleteFiles(_bucketName, filePrefix, fileKeys);
            }

            return await _itemRepository.DeleteItem(id);
        }

        return Unauthorized();
    }

    // PUT api/item/bid
    [Route("bid")]
    [HttpPut]
    public async Task<Item?> SetBid([FromBody] BidInput bid)
    {
        var userId = ControllerHelpers.GetClaim(HttpContext.User, "UserId");

        if (userId == null)
        {
            return null;
        }
        var cultureInfo = new CultureInfo("en-US");
        var newBid = new Bid()
        {
            User = userId,
            Value = bid.Value,
            ReceivingDate = DateTime.Parse(bid.ReceivingDate, cultureInfo),
            CreatedAt = DateTime.Now,
        };
        return await _bidService.AddBid(bid.ItemId, newBid);
    }

    // PUT api/item/winner
    [Route("winner")]
    [HttpPut]
    public async Task<Item?> SetWinner([FromBody] WinnerInput input)
    {
        var isAdmin = ControllerHelpers.IsAdmin(HttpContext.User);

        if (isAdmin)
        {
            return await _bidService.SetWinner(input.ItemId, input.UserId);
        }

        return null;
    }
}