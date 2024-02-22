using heir_time_api.Models;
using heir_time_api.Repositories.Items;
using Microsoft.AspNetCore.Mvc;

namespace heir_time_api.Controllers;

[Route("api/[controller]")]
public class ItemController : ControllerBase
{
    readonly IItemRepository _repository;

    public ItemController(IItemRepository repository)
    {
        _repository = repository;
    }

    // GET api/item
    [HttpGet]
    public async Task<IEnumerable<Item>> GetItems()
    {
        return await _repository.GetItems();
    }

    // GET api/item/id
    [HttpGet("{id}")]
    public async Task<Item?> Get(string id)
    {
        return await _repository.GetItemById(id);
    }

    // POST api/item
    [HttpPost]
    public async Task<Item?> Post([FromBody] Item item)
    {
        return await _repository.InsertItem(item);
    }

    // PUT api/item
    [HttpPut]
    public async Task<Item?> Update([FromBody] Item item)
    {
        return await _repository.UpdateItem(item);
    }

    // DELETE api/item/id
    [HttpDelete("{id}")]
    public async Task<string?> Delete(string id)
    {
        return await _repository.DeleteItem(id);
    }
}