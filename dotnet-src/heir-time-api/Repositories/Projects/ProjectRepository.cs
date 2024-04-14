using heir_time_api.Models;
using MongoDB.Driver;

namespace heir_time_api.Repositories.Projects;

public class ProjectRepository : IProjectRepository
{
    readonly string databaseName = "heir-time";
    readonly string collectionName = "projects";
    readonly IMongoCollection<Project> _collection;

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

    public ProjectRepository(IMongoClient client)
    {
        _collection = client.GetDatabase(databaseName).GetCollection<Project>(collectionName);
    }

    public async Task<Project> GetProjectById(string projectId)
    {
        return await _collection.Find(x => x.Id == projectId).FirstOrDefaultAsync();
    }

    public async Task<List<Project>> GetProjects(List<string> projectIds)
    {
        var projects = await _collection.Find(x => projectIds.Contains(x.Id)).ToListAsync();

        if (projects == null)
        {
            return new List<Project>();
        }

        return projects;
    }

    public async Task<Project> CreateProject(Project project)
    {
        await _collection.InsertOneAsync(project);

        return await _collection.Find(x => x.Id == project.Id).FirstOrDefaultAsync();
    }

    public async Task<string> DeleteProject(string projectId)
    {
        await _collection.DeleteOneAsync(a => a.Id == projectId);

        return projectId;
    }

    public async Task<Project> UpdateProject(Project project)
    {
        await _collection.ReplaceOneAsync(x => x.Id == project.Id, project);

        return await _collection.Find(x => x.Id == project.Id).FirstOrDefaultAsync();
    }

    public async Task<List<Item>> GetItems(string projectId)
    {
        var project = await _collection.Find(x => x.Id == projectId).FirstOrDefaultAsync();

        if (project != null)
        {
            return project.Items;
        }

        return [];
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
}