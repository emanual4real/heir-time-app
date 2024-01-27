using heir_time_api.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace heir_time_api.Repositories.Items;

public class ItemRepository : IItemRepository, IDisposable
{
    readonly string databaseName = "heir-time";
    readonly string collectionName = "items";
    IMongoCollection<Item> _collection;



    public ItemRepository(IMongoClient client)
    {
        _collection = client.GetDatabase(databaseName).GetCollection<Item>(collectionName);
    }

    public async Task<IEnumerable<Item>> GetItems()
    {
        return await _collection.Find(x => true).ToListAsync();
    }

    public async Task<Item?> GetItemById(string id)
    {
        var filter = Builders<Item>.Filter.Eq("_id", id);
        return await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Item?> InsertItem(Item item)
    {
        await _collection.InsertOneAsync(item);

        return await _collection.Find(x => x.Id == item.Id).FirstOrDefaultAsync();

    }

    public async Task<string?> DeleteItem(string id)
    {
        await _collection.DeleteOneAsync(a => a.Id == id);

        return id;
    }

    public async Task<Item?> UpdateItem(Item item)
    {
        await _collection.ReplaceOneAsync(x => x.Id == item.Id, item);

        return await _collection.Find(x => x.Id == item.Id).FirstOrDefaultAsync();
    }

    public void Dispose()
    {
        throw new NotImplementedException();
    }
}