
using heir_time_api.Models;
using MongoDB.Bson;
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
    public async Task<User?> CreateUser(User user)
    {
        var existingUser = await _collection.Find(x => x.EmailAddress == user.EmailAddress).FirstOrDefaultAsync();

        if (existingUser != null)
        {
            return null;
        }

        await _collection.InsertOneAsync(user);
        return await _collection.Find(x => x.EmailAddress == user.EmailAddress).FirstOrDefaultAsync();

    }

    public Task<User> GetUserById(string userId)
    {
        return _collection.Find(x => x.Id == userId).FirstOrDefaultAsync();
    }

    public async Task<User?> UpdateUser(User user)
    {
        await _collection.ReplaceOneAsync(x => x.Id == user.Id, user);

        return await _collection.Find(x => x.Id == user.Id).FirstOrDefaultAsync();

    }

    public Task<string?> DeleteUser(string userId)
    {
        throw new NotImplementedException();
    }
}