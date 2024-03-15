using System.Globalization;
using heir_time_api.Controllers.InputModels;
using heir_time_api.Models;
using heir_time_api.Repositories.Items;
using heir_time_api.Services.Bid;
using heir_time_api.Services.Item;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace heir_time_api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class ItemController : ControllerBase
{
    readonly IItemRepository _repository;
    readonly IItemService _itemService;
    readonly IBidService _bidService;


    public ItemController(IItemRepository repository, IItemService itemService, IBidService bidService)
    {
        _repository = repository;
        _itemService = itemService;
        _bidService = bidService;
    }

    // GET api/item/{id}
    [HttpGet("{id}")]
    public async Task<Item?> GetItem(string id)
    {
        return await _repository.GetItemById(id);
    }

    // GET api/item/items
    [Route("items")]
    [HttpGet]
    public async Task<IEnumerable<Item>> GetItems()
    {
        return await _itemService.GetAllItems();
    }

    // POST api/item
    [HttpPost]
    public async Task<ActionResult<Item?>> Post([FromBody] Item item)
    {
        var isAdmin = ControllerHelpers.IsAdmin(HttpContext.User);

        if (isAdmin)
        {
            return await _repository.InsertItem(item);
        }

        return Unauthorized();
    }

    // PUT api/item
    [HttpPut]
    public async Task<ActionResult<Item?>> Update([FromBody] Item item)
    {
        var isAdmin = ControllerHelpers.IsAdmin(HttpContext.User);

        if (isAdmin)
        {
            return await _repository.UpdateItem(item);
        }

        return Unauthorized();

    }

    // DELETE api/item/id
    [HttpDelete("{id}")]
    public async Task<ActionResult<string?>> Delete(string id)
    {
        var isAdmin = ControllerHelpers.IsAdmin(HttpContext.User);
        if (isAdmin)
        {
            return await _repository.DeleteItem(id);
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