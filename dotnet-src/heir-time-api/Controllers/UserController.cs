
using heir_time_api.Models;
using heir_time_api.Repositories.Users;
using Microsoft.AspNetCore.Mvc;

namespace heir_time_api.Controllers;

[Route("api/[controller]")]
public class UserController : ControllerBase
{

    readonly IUserRepository _repository;

    public UserController(IUserRepository repository)
    {
        _repository = repository;
    }

    [HttpGet("{userId}")]
    public async Task<User> GetUserById(string userId)
    {
        return await _repository.GetUserById(userId);
    }

    [HttpPost]
    public async Task<User?> CreateUser([FromBody] User user)
    {
        var newUser = await _repository.CreateUser(user);

        if (newUser == null)
        {
            throw new Exception("User already exists");
        }

        return newUser;
    }

    [HttpPut]
    public async Task<User?> UpdateUser([FromBody] User user)
    {
        return await _repository.UpdateUser(user);
    }
}