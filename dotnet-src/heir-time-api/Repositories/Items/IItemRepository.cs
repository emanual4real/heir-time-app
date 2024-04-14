
using heir_time_api.Models;

namespace heir_time_api.Repositories.Items;

public interface IItemRepository
{
    Task<IEnumerable<Item>> GetItems();
    Task<Item?> GetItemById(int itemId);
    Task<Item?> InsertItem(Item item);
    Task<int?> DeleteItem(int itemId);
    Task<Item?> UpdateItem(Item item);
    Task<Item> AddBid(int itemId, Bid bid);
}