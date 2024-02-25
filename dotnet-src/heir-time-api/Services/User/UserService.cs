using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using heir_time_api.Repositories.Users;
using Microsoft.IdentityModel.Tokens;

namespace heir_time_api.Services.User;

public class UserService : IUserService
{

    private readonly string? key;
    private readonly IUserRepository _userRepository;

    public UserService(
        IConfiguration configuration,
        IUserRepository userRepository)
    {
        key = configuration.GetSection("JwtKey").ToString();
        _userRepository = userRepository;
    }

    public async Task<string> Authenticate(string email, string password)
    {
        var user = await _userRepository.GetUserByEmailAndPassword(email, password);

        if (user == null)
        {
            return null;
        }

        var tokenHandler = new JwtSecurityTokenHandler();

        var tokenKey = Encoding.ASCII.GetBytes(key);

        var tokenDescriptor = new SecurityTokenDescriptor()
        {

            Subject = new ClaimsIdentity(new Claim[]{
                new Claim(ClaimTypes.Email, email),
            }),

            Expires = DateTime.UtcNow.AddHours(1),

            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
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