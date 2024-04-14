using heir_time_api.Models;
using MongoDB.Driver;

namespace heir_time_api.Repositories.Items;

public class ItemRepository : IItemRepository
{
    readonly string databaseName = "heir-time";
    readonly string collectionName = "projects";
    readonly IMongoCollection<Project> _collection;

    public ItemRepository(IMongoClient client)
    {
        _collection = client.GetDatabase(databaseName).GetCollection<Project>(collectionName);
    }

    private async Task<int> GetNextId(string projectId)
    {
        var project = await _collection.Find(x => x.Id == projectId).FirstOrDefaultAsync();

        var maxId = project.Items.Select(x => x.Id).Max();

        if (maxId != null)
        {
            return (int)(maxId + 1);
        }

        return 0;
    }

    private async Task<Project> GetProjectFromProjectId(string projectId)
    {
        return await _collection.Find(x => x.Id == projectId).FirstOrDefaultAsync();
    }

    public async Task<List<Item>> GetItemsByProjectId(string projectId)
    {
        var project = await _collection.Find(x => x.Id == projectId).FirstOrDefaultAsync();

        if (project != null && project.Items != null)
        {
            return project.Items;
        }

        return [];
    }


    public async Task<Item?> GetItemById(string projectId, int itemId)
    {
        var project = await GetProjectFromProjectId(projectId);

        if (project == null || project.Items == null)
        {
            throw new Exception("Missing project or item");
        }

        return project.Items.Find(x => x.Id == itemId);

    }

    public async Task<Item?> CreateItem(string projectId, Item item)
    {
        var project = await _collection.Find(x => x.Id == projectId).FirstOrDefaultAsync();
        var existingItem = project.Items.Find(x => x.Id == item.Id);
        var nextId = await GetNextId(projectId);

        if (existingItem != null)
        {
            throw new Exception("Item already exists");
        }

        // increment Id
        item.Id = nextId;
        var newItemList = new List<Item>()
        {
            item,
        }.Concat(project.Items);

        var filter = Builders<Project>.Filter.Eq(p => p.Id, projectId);
        var update = Builders<Project>.Update.Set(i => i.Items, newItemList);

        var result = await _collection.UpdateOneAsync(filter, update);

        // nothing updated
        if (result.MatchedCount > 0)
        {
            return item;
        }

        return null;
    }

    public async Task<string> DeleteAllItems(string projectId)
    {
        var project = await _collection.Find(x => x.Id == projectId).FirstOrDefaultAsync() ?? throw new Exception("No project found");

        List<Item> newItems = new List<Item>();
        var filter = Builders<Project>.Filter.Eq(p => p.Id, projectId);
        var update = Builders<Project>.Update.Set(i => i.Items, newItems);

        var result = await _collection.UpdateOneAsync(filter, update);

        // nothing updated
        if (result.MatchedCount > 0)
        {
            return "All items deleted";
        }

        return null;
    }

    public async Task<int?> DeleteItem(string projectId, int itemId)
    {
        var project = await _collection.Find(x => x.Id == projectId).FirstOrDefaultAsync();

        // project not found / no items
        if (project == null || project.Items == null)
        {
            throw new Exception("No project/no items");
        }

        var existingItem = project.Items.Find(x => x.Id == itemId);

        // item not found
        if (existingItem == null)
        {
            throw new Exception("Item does not exist");
        }

        var newItems = project.Items.Where(x => x.Id != itemId).ToList();

        var filter = Builders<Project>.Filter.Eq(p => p.Id, projectId);
        var update = Builders<Project>.Update.Set(i => i.Items, newItems);

        var result = await _collection.UpdateOneAsync(filter, update);

        // nothing updated
        if (result.MatchedCount > 0)
        {
            return itemId;
        }

        return null;
    }

    public async Task<Item?> UpdateItem(string projectId, Item item)
    {
        var project = await _collection.Find(x => x.Id == projectId).FirstOrDefaultAsync();

        var existingItem = project.Items.Find(x => x.Id == item.Id);
        if (existingItem == null)
        {
            throw new Exception("Item does not exist");
        }

        var otherItems = project.Items.Where(x => x.Id != item.Id).ToList();
        var newItemList = new List<Item>()
        {
            item,
        }.Concat(otherItems);

        var filter = Builders<Project>.Filter.Eq(p => p.Id, projectId);
        var update = Builders<Project>.Update.Set(i => i.Items, newItemList);

        var result = await _collection.UpdateOneAsync(filter, update);

        // nothing updated
        if (result.MatchedCount > 0)
        {
            return item;
        }

        return null;
    }

    public async Task<Item?> AddBid(string projectId, int itemId, Bid bid)
    {
        var project = await GetProjectFromProjectId(projectId);
        var item = project.Items.Find(x => x.Id == itemId);

        if (item == null)
        {
            throw new Exception("Missing items");
        }

        bool bidExists = item.Bids.Exists(x => x.User == bid.User);

        if (bidExists)
        {
            item.Bids.RemoveAll(x => x.User == bid.User);
        }

        item.Bids.Add(bid);

        var newItem = await UpdateItem(projectId, item);

        return newItem;
    }
}