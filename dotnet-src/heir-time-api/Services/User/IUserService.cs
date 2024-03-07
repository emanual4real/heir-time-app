namespace heir_time_api.Services.User;

public interface IUserService
{

    public Task<Models.User> CreateUser(Models.User user);

    public Task<string> Authenticate(string email, string password);

    public Task<Models.User> GetUser(string email);

    public Task<List<Models.User>> GetAllUsers();

}