using heir_time_api.Models;

namespace heir_time_api.Services.Items;

public interface IItemService
{
    public Task<Item?> GetItem(string projectId, int itemId);
    public Task<List<Item>> GetItemsByProject(string projectId);
    public Task<int?> DeleteItem(string projectId, int itemId, Models.User user);
    public Task<string?> DeleteAllItems(string projectId, Models.User user);
    public Task<Item?> AddItem(string projectId, Item item, Models.User user, IFormFile? file);
    public Task<Item?> UpdateItem(string projectId, Item item, Models.User user, IFormFile? file);
}