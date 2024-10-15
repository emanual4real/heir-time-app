
using System.Security.Claims;
using heir_time_api.Models;
using heir_time_api.Services.User;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
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

    [Route("me")]
    [HttpGet]
    public async Task<ActionResult<User>> GetMe()
    {
        var userId = ControllerHelpers.GetClaim(HttpContext.User, "UserId");

        if (userId == null)
        {
            return Unauthorized();
        }

        return await _userService.GetUserById(userId);
    }

    [HttpGet("{email}")]
    public async Task<User> GetUser(string email)
    {
        return await _userService.GetUser(email);
    }

    [HttpGet]
    public async Task<List<User>> GetAllUsers()
    {
        return await _userService.GetAllUsers();
    }


    [AllowAnonymous]
    [Route("login")]
    [HttpPost]
    public async Task<ActionResult> Login([FromBody] Login login)
    {
        var (claimsIdentity, authProperties, user) = await _userService.Authenticate(login.EmailAddress, login.Password);

        if (user == null)
        {
            return Unauthorized();
        }

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);


        return Ok(user);
    }

    [HttpGet]
    [Route("logout")]
    public async Task<ActionResult> Logout()
    {
        try
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500);
        }
    }


    [AllowAnonymous]
    [HttpPost]
    [Route("register")]
    public async Task<User?> CreateUser([FromBody] User user)
    {
        var newUser = await _userService.CreateUser(user);

        if (newUser == null)
        {
            throw new Exception("User already exists");
        }

        return newUser;
    }

    // [HttpPut]
    // public async Task<User?> UpdateUser([FromBody] User user)
    // {
    //     return await _repository.UpdateUser(user);
    // }
}