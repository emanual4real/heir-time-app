namespace heir_time_api.Services.Items;

public interface IItemService
{
    public Task<Models.Item> GetItem(int itemId);

    public Task<List<Models.Item>> GetAllItems();

    public Task<int?> DeleteItem(int itemId, string userId);

    public Task<string> DeleteAllItems(string userId);

    public Task<Models.Item> AddItem(Models.Item item);

}