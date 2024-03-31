using System.Net;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace heir_time_api;

public class Cookie
{
    protected Cookie() { }
    private static Task UnAuthorizedResponse(RedirectContext<CookieAuthenticationOptions> context)
    {
        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
        return Task.CompletedTask;
    }

    public static void AddCookie(IServiceCollection services, string cookieDomain)
    {
        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
        {
            options.Cookie.SameSite = SameSiteMode.None;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            options.Cookie.Name = "Heir-Time";
            options.Cookie.Path = "/";
            // TODO: localhost doesn't work in postman
            // options.Cookie.Domain = "127.0.0.1";
            // options.Cookie.Domain = ".localhost";
            options.Cookie.Domain = cookieDomain;
            options.ExpireTimeSpan = TimeSpan.FromHours(1);
            options.SlidingExpiration = true;
            options.Events.OnRedirectToAccessDenied = UnAuthorizedResponse;
            options.Events.OnRedirectToLogin = UnAuthorizedResponse;
        });
    }
}