namespace heir_time_api.Services.Bid;

public interface IBidService
{
    public Task<Models.Item?> AddBid(int itemId, Models.Bid bid);

    public Task<Models.Item?> SetWinner(int itemId, string userId);
}