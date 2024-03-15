namespace heir_time_api.Services.Bid;

public interface IBidService
{
    public Task<Models.Item?> AddBid(string itemId, Models.Bid bid);

    public Task<Models.Item?> SetWinner(string itemId, string userId);
}