namespace heir_time_api.Services.Item;

public interface IItemService
{
    public Task<Models.Item> GetItem(string itemId);

    public Task<List<Models.Item>> GetAllItems();

    public Task<string?> DeleteItem(string itemId, string userId);

    public Task<string> DeleteAllItems(string userId);

    public Task<Models.Item> AddItem(Models.Item item);

}