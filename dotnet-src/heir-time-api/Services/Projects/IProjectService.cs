
using heir_time_api.Models;

namespace heir_time_api.Services.Projects;

public interface IProjectService
{
    Task<Project?> GetProjectById(string projectId);
    Task<List<Project>> GetProjectsByUser(Models.User user);
    Task<Project> CreateProject(Project project, Models.User user);
    Task<Project?> UpdateProject(Project project, Models.User user);
    Task<string?> DeleteProject(string projectId, Models.User user);
    // Task<Item?> AddItemToProject(string projectId, Item item, Models.User user);
    // Task<int?> RemoveItemFromProject(string projectId, int itemId, Models.User user);
    // Task<Item?> UpdateItemInProject(string projectId, Item item, Models.User user);

}