
using heir_time_api.Models;

namespace heir_time_api.Repositories.Items;

public interface IItemRepository
{
    Task<List<Item>> GetItemsByProjectId(string projectId);
    Task<Item?> GetItemById(string projectId, int itemId);
    Task<Item?> CreateItem(string projectId, Item item);
    Task<int?> DeleteItem(string projectId, int itemId);
    Task<string?> DeleteAllItems(string projectId);
    Task<Item?> UpdateItem(string projectId, Item item);
    Task<Item?> AddBid(string projectId, int itemId, Bid bid);
}