
using heir_time_api.Models;
using MongoDB.Driver;

namespace heir_time_api.Repositories.Users;

public class UserRepository : IUserRepository
{
    readonly string databaseName = "heir-time";
    readonly string collectionName = "users";
    readonly IMongoCollection<User> _collection;

    public UserRepository(IMongoClient client)
    {
        _collection = client.GetDatabase(databaseName).GetCollection<User>(collectionName);
    }

    // TODO: Figure out how to put this in a decorator
    private User StripPassword(User user)
    {
        user.Password = null;

        return user;
    }

    private List<User> StripPassword(List<User> users)
    {
        users.ForEach(u => u.Password = null);

        return users;
    }

    public async Task<User?> CreateUser(User user)
    {
        var existingUser = await _collection.Find(x => x.EmailAddress == user.EmailAddress).FirstOrDefaultAsync();

        if (existingUser != null)
        {
            return null;
        }

        await _collection.InsertOneAsync(user);
        var newUser = await _collection.Find(x => x.EmailAddress == user.EmailAddress).FirstOrDefaultAsync();

        return StripPassword(newUser);

    }

    public async Task<User> GetUserById(string userId)
    {
        var user = await _collection.Find(x => x.Id == userId).FirstOrDefaultAsync();

        return StripPassword(user);
    }

    public async Task<User> GetUserByEmail(string email)
    {
        var user = await _collection.Find(x => x.EmailAddress == email).FirstOrDefaultAsync();

        return StripPassword(user);
    }

    public async Task<List<User>> GetAllUsers()
    {
        var users = await _collection.Find(x => true).ToListAsync();

        return StripPassword(users);
    }

    public async Task<User> GetUserByEmailAndPassword(string email, string password)
    {
        var user = await _collection.Find(x => x.EmailAddress == email).FirstOrDefaultAsync();

        bool verified = BC.Verify(password, user.Password);

        if (verified)
        {
            return StripPassword(user);
        }

        return null;


    }

    public async Task<User?> UpdateUser(User user)
    {
        var oldUser = await _collection.Find(x => x.Id == user.Id).FirstOrDefaultAsync();

        // Don't update password
        user.Password = oldUser.Password;
        await _collection.ReplaceOneAsync(x => x.Id == user.Id, user);

        var updatedUser = await _collection.Find(x => x.Id == user.Id).FirstOrDefaultAsync();

        return StripPassword(updatedUser);

    }

    public Task<string?> DeleteUser(string userId)
    {
        throw new NotImplementedException();
    }
}