using heir_time_api.Models;
using MongoDB.Driver;

namespace heir_time_api.Repositories.Projects;

public class ProjectRepository : IProjectRepository
{
    readonly string databaseName = "heir-time";
    readonly string collectionName = "projects";
    readonly IMongoCollection<Project> _collection;

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
}