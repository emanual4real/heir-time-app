
using System.Security.Claims;

namespace heir_time_api.Controllers;

public static class ControllerHelpers
{

    public static bool IsAdmin(ClaimsPrincipal currentUser)
    {
        if (currentUser.HasClaim(x => x.Type == "Admin"))
        {
            var value = currentUser.Claims.FirstOrDefault(x => x.Type == "Admin")?.Value;

            return bool.TrueString == value;
        }
        return false;
    }

    public static string? GetClaim(ClaimsPrincipal currentUser, string claimName)
    {
        if (currentUser.HasClaim(x => x.Type == claimName))
        {
            var value = currentUser.Claims.FirstOrDefault(x => x.Type == claimName)?.Value;

            return value;
        }

        return null;
    }

    public static List<string> GetClaims(ClaimsPrincipal currentUser)
    {
        return currentUser.Claims.Select(x => x.Value).ToList();
    }
}