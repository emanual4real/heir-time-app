
using heir_time_api.Models;

namespace heir_time_api.Repositories.Users;

public interface IUserRepository
{
    Task<User> GetUserById(string userId);
    Task<User?> CreateUser(User user);
    Task<User?> UpdateUser(User user);
    Task<string?> DeleteUser(string userId);
}