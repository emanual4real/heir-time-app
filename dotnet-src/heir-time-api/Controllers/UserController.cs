
using heir_time_api.Models;
using heir_time_api.Repositories.Users;
using heir_time_api.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace heir_time_api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class UserController : ControllerBase
{

    readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{email}")]
    public async Task<User> GetUser(string email)
    {
        Console.WriteLine(email);
        return await _userService.GetUser(email);
    }

    [HttpGet]
    public async Task<List<User>> GetAllUsers()
    {
        return await _userService.GetAllUsers();
    }


    [AllowAnonymous]
    [Route("authenticate")]
    [HttpPost]
    public async Task<ActionResult> Login([FromBody] User user)
    {
        var token = await _userService.Authenticate(user.EmailAddress, user.Password);

        if (token == null)
        {
            return Unauthorized();
        }

        return Ok(new { token, user });
    }

    // [HttpGet("{userId}")]
    // public async Task<User> GetUserById(string userId)
    // {
    //     return await _repository.GetUserById(userId);
    // }

    // [HttpPost]
    // public async Task<User?> CreateUser([FromBody] User user)
    // {
    //     var newUser = await _repository.CreateUser(user);

    //     if (newUser == null)
    //     {
    //         throw new Exception("User already exists");
    //     }

    //     return newUser;
    // }

    // [HttpPut]
    // public async Task<User?> UpdateUser([FromBody] User user)
    // {
    //     return await _repository.UpdateUser(user);
    // }
}