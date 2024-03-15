
using heir_time_api.Enums;
using heir_time_api.Repositories.Items;
using heir_time_api.Repositories.Users;

namespace heir_time_api.Services.Bid;

public class BidService : IBidService
{
    private readonly IItemRepository _itemRepository;
    private readonly IUserRepository _userRepository;

    public BidService(IItemRepository itemRepository, IUserRepository userRepository)
    {
        _itemRepository = itemRepository;
        _userRepository = userRepository;
    }

    public async Task<Models.Item?> AddBid(string itemId, Models.Bid bid)
    {

        return await _itemRepository.AddBid(itemId, bid);
    }

    public async Task<Models.Item?> SetWinner(string itemId, string userId)
    {
        // TODO: find out who the current user is and make sure they own the project or are admin for now
        var user = await _userRepository.GetUserById(userId);

        // check user exists
        if (user == null)
        {
            return null;
        }

        var item = await _itemRepository.GetItemById(itemId);

        // check item exists
        if (item == null)
        {
            return null;
        }

        item.Recipient = userId;
        item.ItemStatus = Status.Decided;

        await _itemRepository.UpdateItem(item);

        return item;
    }
}