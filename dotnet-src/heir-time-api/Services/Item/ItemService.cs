using heir_time_api.Repositories.Items;
using heir_time_api.Repositories.Users;

namespace heir_time_api.Services.Item;

public class ItemService : IItemService
{
    private readonly IItemRepository _itemRepository;

    public ItemService(IItemRepository itemRepository, IUserRepository userRepository)
    {
        _itemRepository = itemRepository;
    }

    public Task<Models.Item> GetItem(string itemId)
    {
        throw new NotImplementedException();
    }

    public async Task<List<Models.Item>> GetAllItems()
    {
        var items = await _itemRepository.GetItems();

        var listOfUsers = items.ToList().FindAll(x => x.Bids != null).SelectMany(y => y.Bids).Select(z => z.User);

        return items.ToList();
    }

    public Task<Models.Item> AddItem(Models.Item item)
    {
        throw new NotImplementedException();
    }

    public Task<string> DeleteAllItems(string userId)
    {
        throw new NotImplementedException();
    }

    public async Task<string?> DeleteItem(string itemId)
    {
        return await _itemRepository.DeleteItem(itemId);
    }


}