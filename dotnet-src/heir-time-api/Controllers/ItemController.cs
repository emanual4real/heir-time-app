using System.Globalization;
using heir_time_api.Controllers.InputModels;
using heir_time_api.Models;
using heir_time_api.Services.Bid;
using heir_time_api.Services.Items;
using heir_time_api.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace heir_time_api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class ItemController : ControllerBase
{
    readonly private IItemService _itemService;
    readonly private IBidService _bidService;
    readonly private IUserService _userService;

    public ItemController(IItemService itemService, IBidService bidService, IUserService userService)
    {
        _itemService = itemService;
        _bidService = bidService;
        _userService = userService;
    }

    private async Task<User> GetUser()
    {
        var userId = ControllerHelpers.GetClaim(HttpContext.User, "UserId");

        if (userId != null)
        {
            return await _userService.GetUserById(userId);
        }
        return null;
    }



    // GET api/item/{id}?projectId={projectId}
    /// <summary>
    /// Get an item
    /// </summary>
    /// <param name="id"></param>
    /// <param name="projectId"></param>
    /// <returns>Item</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<Item?>> GetItem(int id, [FromQuery] string projectId)
    {
        var item = await _itemService.GetItem(projectId, id);

        if (item == null)
        {
            return NoContent();
        }

        return Ok(item);
    }

    // GET api/item?projectId={projectId}
    /// <summary>
    /// Get all items from project
    /// </summary>
    /// <param name="projectId"></param>
    /// <returns>List of Items</returns>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Item>>> GetItemsByProject([FromQuery] string projectId)
    {
        var items = await _itemService.GetItemsByProject(projectId);

        if (items != null)
        {
            return Ok(items);
        }

        return NoContent();
    }

    // POST api/item
    /// <summary>
    /// Create a new item with file
    /// </summary>
    /// <param name="itemWithFileInput"></param>
    /// <param name="file"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult<Item?>> CreateItem([FromForm] string itemWithFileInput, IFormFile? file)
    {
        var user = await GetUser();
        ItemWithFileInput? form = JsonConvert.DeserializeObject<ItemWithFileInput>(itemWithFileInput);
        var item = new Item()
        {
            Title = form.Title,
            ReleaseDate = form.ReleaseDate,
            ItemStatus = form.ItemStatus,
        };
        var projectId = form.ProjectId;

        var newItem = await _itemService.AddItem(projectId, item, user, file);

        if (newItem == null)
        {
            return NoContent();
        }

        return Ok(newItem);
    }

    // PUT api/item?projectId={projectId}
    /// <summary>
    /// Update item and file
    /// </summary>
    /// <param name="itemJson"></param>
    /// <param name="file"></param>
    /// <param name="projectId"></param>
    /// <returns>Item</returns>
    [HttpPut]
    public async Task<ActionResult<Item?>> UpdateItem([FromForm] string itemJson, IFormFile? file, [FromQuery] string projectId)
    {
        var user = await GetUser();
        Item? item = JsonConvert.DeserializeObject<Item>(itemJson);

        if (item == null)
        {
            return BadRequest();
        }

        var newItem = await _itemService.UpdateItem(projectId, item, user, file);

        if (newItem == null)
        {
            return NoContent();
        }

        return Ok(newItem);
    }

    // DELETE api/item/id?projectId={projectId}
    /// <summary>
    /// Deletes a file
    /// </summary>
    /// <param name="id"></param>
    /// <param name="projectId"></param>
    /// <returns>int</returns>
    [HttpDelete("{id}")]
    public async Task<ActionResult<int?>> Delete(int id, [FromQuery] string projectId)
    {
        var user = await GetUser();

        var response = await _itemService.DeleteItem(projectId, id, user);

        if (response == null)
        {
            return NoContent();
        }

        return Ok(response);
    }

    // PUT api/item/bid?projectId={projectId}
    /// <summary>
    /// Update bit on item
    /// </summary>
    /// <param name="bid"></param>
    /// <returns>Item</returns>
    [Route("bid")]
    [HttpPut]
    public async Task<ActionResult<Item?>> SetBid([FromBody] BidInput bid)
    {
        var user = await GetUser();

        var cultureInfo = new CultureInfo("en-US");
        var newBid = new Bid()
        {
            User = user.Id,
            Value = bid.Value,
            ReceivingDate = DateTime.Parse(bid.ReceivingDate, cultureInfo),
            CreatedAt = DateTime.Now,
        };

        var item = await _bidService.AddBid(bid.ProjectId, bid.ItemId, newBid);

        if (item == null)
        {
            return NoContent();
        }

        return Ok(item);
    }

    // PUT api/item/winner?projectId={projectId}
    /// <summary>
    /// Set the winner of the item
    /// </summary>
    /// <param name="input"></param>
    /// <param name="projectId"></param>
    /// <returns></returns>
    [Route("winner")]
    [HttpPut]
    public async Task<ActionResult<Item?>> SetWinner([FromBody] WinnerInput input, [FromQuery] string projectId)
    {
        var user = await GetUser();

        var item = await _bidService.SetWinner(projectId, input.ItemId, input.UserId, user);

        if (item == null)
        {
            return NoContent();
        }

        return Ok(item);
    }
}