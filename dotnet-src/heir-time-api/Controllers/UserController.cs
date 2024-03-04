
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
        var token = await _userService.Authenticate(login.EmailAddress, login.Password);

        if (token == null)
        {
            return Unauthorized();
        }

        var user = await _userService.GetUser(login.EmailAddress);

        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.EmailAddress),
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

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);


        return Ok(new { token, user });
    }

    [HttpGet]
    [Route("logout")]
    public async Task<ActionResult> Logout() {
        try {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            
            return Ok();
        } catch (Exception ex) {
            return StatusCode(500);
        }
    }



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