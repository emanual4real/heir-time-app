namespace heir_time_api.Services.Bid;

public interface IBidService
{
    public Task<Models.Item?> AddBid(string projectId, int itemId, Models.Bid bid);

    public Task<Models.Item?> SetWinner(string projectId, int itemId, string recipientId, Models.User user);
}