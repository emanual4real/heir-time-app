using heir_time_api.Repositories.Items;
using heir_time_api.Services.S3;

namespace heir_time_api.Services.Item;

public class ItemService : IItemService
{
    private readonly IItemRepository _itemRepository;
    private readonly IS3Service _s3Service;

    public ItemService(IItemRepository itemRepository, IS3Service s3Service)
    {
        _itemRepository = itemRepository;
        _s3Service = s3Service;
    }

    public Task<Models.Item> GetItem(string itemId)
    {
        throw new NotImplementedException();
    }

    public async Task<List<Models.Item>> GetAllItems()
    {
        var items = await _itemRepository.GetItems();

        // TODO: was doing something here can't remember
        // var listOfUsers = items.ToList().FindAll(x => x.Bids != null).SelectMany(y => y.Bids).Select(z => z.User);

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

    public async Task<string?> DeleteItem(string itemId, string userId)
    {
        var item = await _itemRepository.GetItemById(itemId);

        if (item != null && item.FileKeys != null)
        {
            // TODO: Delete bucket parameter from
            await _s3Service.DeleteFiles(userId, item.FileKeys);
        }

        return await _itemRepository.DeleteItem(itemId);
    }


}