using System.Security.Claims;
using heir_time_api.Repositories.Users;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace heir_time_api.Services.User;

public class UserService : IUserService
{

    private readonly IUserRepository _userRepository;

    public UserService(
        IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<(ClaimsIdentity?, AuthenticationProperties?, Models.User?)> Authenticate(string email, string password)
    {
        var user = await _userRepository.GetUserByEmailAndPassword(email, password);

        if (user == null)
        {
            return (null, null, null);
        }

        var claims = new List<Claim>
        {
            new("UserId", user.Id),
            new("Admin", user.IsAdmin.ToString()),
            new(ClaimTypes.Email, user.EmailAddress),
            new("FirstName", user.FirstName),
            new("LastName", user.LastName)
        };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        var authProperties = new AuthenticationProperties
        {
            AllowRefresh = true,
            ExpiresUtc = DateTimeOffset.UtcNow.AddHours(1),
            IsPersistent = false,
            IssuedUtc = DateTimeOffset.Now,
        };

        return (claimsIdentity, authProperties, user);


    }

    public Task<Models.User> GetUser(string email)
    {
        return _userRepository.GetUserByEmail(email);
    }

    public Task<List<Models.User>> GetAllUsers()
    {
        return _userRepository.GetAllUsers();
    }

    public Task<Models.User> GetUserById(string userId)
    {
        return _userRepository.GetUserById(userId);
    }

    public async Task<Models.User?> CreateUser(Models.User user)
    {
        string passwordHash = BC.HashPassword(user.Password);
        user.Password = passwordHash;
        var newUser = await _userRepository.CreateUser(user);

        return newUser;
    }

    public async Task<Models.User?> UpdateUser(Models.User user)
    {
        user.Password = null;
        return await _userRepository.UpdateUser(user);
    }

    public Task<string> UpdatePassword(string newPassword)
    {
        throw new NotImplementedException();
    }

    public async Task<Models.User?> AddOwnedProject(Models.User user, string projectId)
    {
        var ownedProjectList = user.OwnedProjects;

        List<string> newOwnedProjectList = [.. ownedProjectList, projectId];
        user.OwnedProjects = newOwnedProjectList;

        return await _userRepository.UpdateUser(user);
    }

    public async Task<Models.User?> AddProject(Models.User user, string projectId)
    {
        var projectList = user.Projects;

        List<string> newProjectList = [.. projectList, projectId];
        user.OwnedProjects = newProjectList;

        return await _userRepository.UpdateUser(user);
    }

    public async Task<Models.User?> RemoveOwnedProject(Models.User user, string projectId)
    {
        var ownedProjectList = user.OwnedProjects.Where(p => p != projectId).ToList();

        user.OwnedProjects = ownedProjectList;

        return await _userRepository.UpdateUser(user);
    }

    public async Task<Models.User?> RemoveProject(Models.User user, string projectId)
    {
        var projectList = user.Projects.Where(p => p != projectId).ToList();

        user.Projects = projectList;

        return await _userRepository.UpdateUser(user);
    }
}