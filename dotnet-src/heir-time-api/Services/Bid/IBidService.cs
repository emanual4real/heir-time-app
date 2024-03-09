using heir_time_api.Models;

namespace heir_time_api.Services.Bid;

public interface IBidService
{
    public Task<Item?> AddBid(string itemId, Models.Bid bid);

    public Task<Item?> SetWinner(string itemId, string userId);
}