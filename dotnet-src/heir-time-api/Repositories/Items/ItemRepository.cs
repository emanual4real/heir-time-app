using heir_time_api.Models;
using MongoDB.Driver;

namespace heir_time_api.Repositories.Items;

public class ItemRepository : IItemRepository
{
    readonly string databaseName = "heir-time";
    readonly string collectionName = "items";
    readonly IMongoCollection<Item> _collection;



    public ItemRepository(IMongoClient client)
    {
        _collection = client.GetDatabase(databaseName).GetCollection<Item>(collectionName);
    }

    public async Task<IEnumerable<Item>> GetItems()
    {
        return await _collection.Find(x => true).ToListAsync();
    }

    public async Task<Item?> GetItemById(string itemId)
    {
        return await _collection.Find(x => x.Id == itemId).FirstOrDefaultAsync();
    }

    public async Task<Item?> InsertItem(Item item)
    {
        await _collection.InsertOneAsync(item);

        return await _collection.Find(x => x.Id == item.Id).FirstOrDefaultAsync();

    }

    public async Task<string?> DeleteItem(string itemId)
    {
        await _collection.DeleteOneAsync(a => a.Id == itemId);

        return itemId;
    }

    public async Task<Item?> UpdateItem(Item item)
    {
        await _collection.ReplaceOneAsync(x => x.Id == item.Id, item);

        return await _collection.Find(x => x.Id == item.Id).FirstOrDefaultAsync();
    }

    public async Task<Item> AddBid(string itemId, Bid bid)
    {
        var item = await _collection.Find(x => x.Id == itemId).FirstOrDefaultAsync();

        if (item == null)
        {
            return null;
        }

        if (item.Bids == null)
        {
            item.Bids = new List<Bid>();
        }

        bool bidExists = item.Bids.Exists(x => x.User == bid.User);

        if (bidExists)
        {
            item.Bids.RemoveAll(x => x.User == bid.User);
        }

        item.Bids.Add(bid);

        await _collection.ReplaceOneAsync(x => x.Id == itemId, item);

        return item;
    }
}