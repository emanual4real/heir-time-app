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
    readonly IConfiguration _configuration;
    readonly IItemService _itemService;
    readonly IProjectService _projectService;
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

    // GET api/project
    /// <summary>
    /// Get the user's projects
    /// </summary>
    /// <returns>List of Projects</returns>
    [HttpGet]
    public async Task<ActionResult<List<Project>>> GetUserProjects()
    {
        var user = await GetUser();

        return await _projectService.GetProjectsByUser(user);
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
        return await _projectService.GetProjectById(projectId);
    }

    // GET api/project/{projectId}/items
    /// <summary>
    /// Get all items for a project
    /// </summary>
    /// <param name="projectId"></param>
    /// <returns>List of Items</returns>
    [HttpGet("{projectId}/items")]
    public async Task<ActionResult<List<Item>>> GetItemsByProject(string projectId)
    {
        return await _projectService.GetItemsByProject(projectId);
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

            return newProject;
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

            return deletedProjectId;
        }

        return BadRequest("Unable to delete project");
    }

    // POST api/project/{projectId}/item
    /// <summary>
    /// Create an item in a project
    /// </summary>
    /// <param name="projectId"></param>
    /// <param name="item"></param>
    /// <returns>Item</returns>
    [HttpPost("{projectId}/item")]
    public async Task<ActionResult<Item?>> CreateItem(string projectId, [FromBody] Item item)
    {
        var user = await GetUser();

        return await _projectService.AddItemToProject(projectId, item, user);
    }

    // DELETE api/project/{projectId}/item/{itemId}
    /// <summary>
    /// Delete an item in project
    /// </summary>
    /// <param name="projectId"></param>
    /// <param name="itemId"></param>
    /// <returns>ItemId</returns>
    [HttpDelete("{projectId}/item/{itemId}")]
    public async Task<ActionResult<int?>> DeleteItem(string projectId, int itemId)
    {
        var user = await GetUser();

        return await _projectService.RemoveItemFromProject(projectId, itemId, user);
    }

    // PUT api/project/{projectId}/item
    /// <summary>
    /// Update an item in project
    /// </summary>
    /// <param name="projectId"></param>
    /// <param name="item"></param>
    /// <returns>Item</returns>
    [HttpPut("{projectId}/item")]
    public Task<ActionResult<Item?>> UpdateItem(string projectId, [FromBody] Item item)
    {
        throw new NotImplementedException();
    }
}