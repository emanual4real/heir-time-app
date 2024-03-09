using heir_time_api.Models;
using heir_time_api.Repositories.Items;
using heir_time_api.Services.Bid;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace heir_time_api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class ItemController : ControllerBase
{
    readonly IItemRepository _repository;
    readonly IBidService _bidService;


    public ItemController(IItemRepository repository, IBidService bidService)
    {
        _repository = repository;
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
        return await _repository.GetItems();
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

    // PUT api/item/bid/{id}
    [Route("bid/{itemId}")]
    [HttpPut]
    public async Task<Item?> SetBid([FromBody] Bid bid, string itemId)
    {
        return await _bidService.AddBid(itemId, bid);
    }

    // PUT api/item/winner/{id}
    [Route("winner/{itemId}")]
    [HttpPut]
    public async Task<Item?> SetWinner([FromBody] string userId, string itemId)
    {
        return await _bidService.SetWinner(itemId, userId);
    }




}