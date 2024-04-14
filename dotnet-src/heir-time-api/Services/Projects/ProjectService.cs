using heir_time_api.Models;
using heir_time_api.Repositories.Projects;

namespace heir_time_api.Services.Projects;

public class ProjectService : IProjectService
{

    private readonly IProjectRepository _projectRepository;

    public ProjectService(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }


    public async Task<Project> CreateProject(Project project, Models.User user)
    {
        var existingProject = await _projectRepository.GetProjectById(project.Id);

        if (existingProject != null)
        {
            throw new Exception("Project already exists");
        }
        var newProject = new Project
        {
            ProjectName = project.ProjectName,
            Owner = user.Id,
            Admins = project.Admins,
            Users = project.Users,
            Items = []
        };

        return await _projectRepository.CreateProject(newProject);

    }

    public async Task<string?> DeleteProject(string projectId, Models.User user)
    {
        var project = await _projectRepository.GetProjectById(projectId) ?? throw new Exception("Project does not exist");

        // Must be owner to delete project
        if (project.Owner == user.Id)
        {
            return await _projectRepository.DeleteProject(projectId);
        }
        else
        {
            throw new Exception("Unauthorized");
        }
    }

    public async Task<Project?> GetProjectById(string projectId)
    {
        return await _projectRepository.GetProjectById(projectId);
    }

    public async Task<List<Project>> GetProjectsByUser(Models.User user)
    {
        List<string> projectList = [.. user.Projects, .. user.OwnedProjects];


        if (projectList.Count > 0)
        {
            return await _projectRepository.GetProjects(projectList);
        }

        return new List<Project>();
    }

    public async Task<Project?> UpdateProject(Project project, Models.User user)
    {
        // Must be owner to edit project
        if (project.Owner == user.Id)
        {
            return await _projectRepository.UpdateProject(project);
        }
        else
        {
            throw new Exception("Unauthorized");
        }
    }

    public async Task<List<Item>> GetItemsByProject(string projectId)
    {
        return await _projectRepository.GetItems(projectId);
    }

    public async Task<Item?> AddItemToProject(string projectId, Item item, Models.User user)
    {
        var project = await _projectRepository.GetProjectById(projectId);
        // Must be owner to edit project
        if (project.Owner == user.Id)
        {
            return await _projectRepository.CreateItem(projectId, item);
        }
        else
        {
            throw new Exception("Unauthorized");
        }
    }

    public async Task<int?> RemoveItemFromProject(string projectId, int itemId, Models.User user)
    {
        var project = await _projectRepository.GetProjectById(projectId);
        // Must be owner to edit project
        if (project.Owner == user.Id)
        {
            return await _projectRepository.DeleteItem(projectId, itemId);
        }
        else
        {
            throw new Exception("Unauthorized");
        }
    }
}