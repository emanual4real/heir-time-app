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
        // TODO: check for duplicate project names
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
        var project = await _projectRepository.GetProjectById(projectId);

        // Must be owner to delete project
        if (project != null && project.Owner == user.Id)
        {
            return await _projectRepository.DeleteProject(projectId);
        }
        else
        {
            return null;
        }
    }

    public async Task<Project?> GetProjectById(string projectId)
    {
        return await _projectRepository.GetProjectById(projectId);
    }

    public async Task<List<Project>> GetProjectsByUser(Models.User user)
    {
        var projectIds = new List<string>().Concat(user.Projects).Concat(user.OwnedProjects).ToList();

        if (projectIds.Count > 0)
        {
            return await _projectRepository.GetProjects(projectIds);
        }

        return new List<Project>();
    }

    public async Task<Project?> UpdateProject(Project project, Models.User user)
    {
        var projectId = project.Id;

        // no projectId
        if (project.Id == null)
        {
            return null;
        }

        var currentProject = await _projectRepository.GetProjectById(projectId);

        // Must be owner to edit project
        if (currentProject != null && project.Owner == user.Id)
        {
            return await _projectRepository.UpdateProject(project);
        }
        else
        {
            return null;
        }
    }
}