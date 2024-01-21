
using heir_time_api.Models;

namespace heir_time_api.Repositories.Items;

public interface IItemRepository : IDisposable
{
    Task<IEnumerable<Item>> GetItems();
    Task<Item?> GetItemById(string itemId);
    Task<Item?> InsertItem(Item item);
    Task<string?> DeleteItem(string itemId);
    Task<Item?> UpdateItem(Item item);
}