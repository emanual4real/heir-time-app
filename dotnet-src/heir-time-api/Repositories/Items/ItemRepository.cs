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
        await _collection.DeleteOneAsync(id);

        return id;
    }

    public async Task<Item?> UpdateItem(Item item)
    {
        var filter = Builders<Item>.Filter.Eq("_id", item.Id);
        await _collection.ReplaceOneAsync(filter, item);

        return await _collection.Find(x => x.Id == item.Id).FirstOrDefaultAsync();
    }

    public void Dispose()
    {
        throw new NotImplementedException();
    }
}