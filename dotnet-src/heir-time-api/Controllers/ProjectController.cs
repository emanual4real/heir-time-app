using heir_time_api.Models;
using heir_time_api.Repositories.Items;
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
    readonly IConfiguration _configuration;
    readonly IProjectService _projectService;
    readonly IItemService _itemService;
    readonly IUserService _userService;

    public ProjectController(IConfiguration configuration,
    IItemService itemService,
    IProjectService projectService,
    IUserService userService)
    {
        _configuration = configuration;
        _itemService = itemService;
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

    [HttpGet]
    public async Task<ActionResult<Project?>> GetProject(string projectId)
    {
        return await _projectService.GetProjectById(projectId);
    }

    [HttpPost]
    public async Task<ActionResult<Project?>> CreateProject([FromBody] Project project)
    {
        var user = await GetUser();

        // create new project
        var newProject = await _projectService.CreateProject(project, user);

        if (newProject != null)
        {
            // save project to user
            user.OwnedProjects.Add(newProject.Id);
            await _userService.UpdateUser(user);

            return newProject;
        }

        return BadRequest("Unable to create project");
    }

    [HttpDelete]
    public async Task<ActionResult<string?>> DeleteProject(string projectId)
    {
        var user = await GetUser();

        return await _projectService.DeleteProject(projectId, user);
    }
}