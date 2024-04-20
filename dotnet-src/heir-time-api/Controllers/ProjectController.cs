using heir_time_api.Models;
using heir_time_api.Services.Items;
using heir_time_api.Services.Projects;
using heir_time_api.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace heir_time_api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
    readonly IProjectService _projectService;
    readonly IUserService _userService;

    public ProjectController(
    IProjectService projectService,
    IUserService userService)
    {

        _projectService = projectService;
        _userService = userService;
    }

    private async Task<User> GetUser()
    {
        var userId = ControllerHelpers.GetClaim(HttpContext.User, "UserId");

        if (userId != null)
        {
            return await _userService.GetUserById(userId);
        }
        return null;
    }

    // GET api/project
    /// <summary>
    /// Get the user's projects
    /// </summary>
    /// <returns>List of Projects</returns>
    [HttpGet]
    public async Task<ActionResult<List<Project>>> GetUserProjects()
    {
        var user = await GetUser();

        var projects = await _projectService.GetProjectsByUser(user);

        return Ok(projects);
    }

    // GET api/project/{projectId}
    /// <summary>
    /// Get a specific project
    /// </summary>
    /// <param name="projectId"></param>
    /// <returns>Project</returns>
    [HttpGet("{projectId}")]
    public async Task<ActionResult<Project?>> GetProjectById(string projectId)
    {
        var project = await _projectService.GetProjectById(projectId);

        return Ok(project);
    }

    // POST api/project
    /// <summary>
    /// Create a new project
    /// </summary>
    /// <param name="project"></param>
    /// <returns>Project</returns>
    [HttpPost]
    public async Task<ActionResult<Project?>> CreateProject([FromBody] Project project)
    {
        var user = await GetUser();

        // create new project
        var newProject = await _projectService.CreateProject(project, user);

        if (newProject != null)
        {
            await _userService.AddOwnedProject(user, newProject.Id);

            return Ok(newProject);
        }

        return BadRequest("Unable to create project");
    }

    // DELETE api/project/{projectId}
    /// <summary>
    /// Delete a project
    /// </summary>
    /// <param name="projectId"></param>
    /// <returns>ProjectId</returns>
    [HttpDelete("{projectId}")]
    public async Task<ActionResult<string?>> DeleteProject(string projectId)
    {
        var user = await GetUser();

        var deletedProjectId = await _projectService.DeleteProject(projectId, user);

        if (deletedProjectId != null)
        {
            await _userService.RemoveOwnedProject(user, deletedProjectId);

            return Ok(deletedProjectId);
        }

        return BadRequest("Unable to delete project");
    }






}