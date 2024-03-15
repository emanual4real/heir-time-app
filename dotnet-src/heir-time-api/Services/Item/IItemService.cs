namespace heir_time_api.Services.Item;

public interface IItemService
{
    public Task<Models.Item> GetItem(string itemId);

    public Task<List<Models.Item>> GetAllItems();

}