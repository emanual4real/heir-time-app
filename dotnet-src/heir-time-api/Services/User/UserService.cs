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

    public async Task<Models.User?> CreateUser(Models.User user)
    {
        string passwordHash = BC.HashPassword(user.Password);
        user.Password = passwordHash;
        var newUser = await _userRepository.CreateUser(user);

        return newUser;
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
}