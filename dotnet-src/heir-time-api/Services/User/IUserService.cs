using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace heir_time_api.Services.User;

public interface IUserService
{

    public Task<Models.User?> CreateUser(Models.User user);

    public Task<Models.User?> UpdateUser(Models.User user);

    public Task<string> UpdatePassword(string newPassword);

    public Task<(ClaimsIdentity?, AuthenticationProperties?, Models.User?)> Authenticate(string email, string password);

    public Task<Models.User> GetUser(string email);

    public Task<Models.User> GetUserById(string userId);

    public Task<List<Models.User>> GetAllUsers();

}