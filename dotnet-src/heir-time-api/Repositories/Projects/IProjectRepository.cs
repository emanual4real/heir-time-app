
using heir_time_api.Models;

namespace heir_time_api.Repositories.Projects;

public interface IProjectRepository
{
    Task<Project> GetProjectById(string projectId);
    Task<List<Project>> GetProjects(List<string> projectIds);
    Task<Project> CreateProject(Project project);
    Task<Project> UpdateProject(Project project);
    Task<string> DeleteProject(string projectId);
    Task<List<Item>> GetItems(string projectId);
    Task<int?> DeleteItem(string projectId, int itemId);
    Task<Item?> CreateItem(string projectId, Item item);
    Task<Item?> UpdateItem(string projectId, Item item);
}