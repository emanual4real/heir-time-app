
using heir_time_api.Models;

namespace heir_time_api.Repositories.Users;

public interface IUserRepository
{
    public Task<User> GetUserById(string userId);
    public Task<List<User>> GetAllUsers();
    public Task<User> GetUserByEmail(string email);
    public Task<User> GetUserByEmailAndPassword(string email, string password);
    public Task<User?> CreateUser(User user);
    public Task<User?> UpdateUser(User user);
    public Task<string?> DeleteUser(string userId);
}