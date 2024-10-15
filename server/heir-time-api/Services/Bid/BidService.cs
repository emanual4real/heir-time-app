
using heir_time_api.Enums;
using heir_time_api.Models;
using heir_time_api.Repositories.Items;
using heir_time_api.Repositories.Projects;
using heir_time_api.Repositories.Users;

namespace heir_time_api.Services.Bid;

public class BidService : IBidService
{
    private readonly IItemRepository _itemRepository;
    private readonly IProjectRepository _projectRepository;
    private readonly IUserRepository _userRepository;

    public BidService(IItemRepository itemRepository, IProjectRepository projectRepository, IUserRepository userRepository)
    {
        _itemRepository = itemRepository;
        _projectRepository = projectRepository;
        _userRepository = userRepository;
    }

    public async Task<Item?> AddBid(string projectId, int itemId, Models.Bid bid)
    {

        return await _itemRepository.AddBid(projectId, itemId, bid);
    }

    public async Task<Item?> SetWinner(string projectId, int itemId, string recipientId, Models.User user)
    {
        var project = await _projectRepository.GetProjectById(projectId);

        if (project.Owner == user.Id)
        {
            var item = project.Items.Find(x => x.Id == itemId);

            // check item exists
            if (item == null)
            {
                throw new Exception("Missing item");
            }

            item.Recipient = recipientId;
            item.ItemStatus = Status.Decided;

            await _itemRepository.UpdateItem(projectId, item);

            return item;
        }
        else
        {
            throw new Exception("Unauthorized");
        }



    }

}