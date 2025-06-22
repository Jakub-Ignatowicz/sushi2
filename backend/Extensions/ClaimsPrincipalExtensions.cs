using System.Security.Claims;
using SushiZume.Models;
using SushiZume.Services.Interfaces;

namespace SushiZume.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static Guid? GetUserId(this ClaimsPrincipal user)
    {
        var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (Guid.TryParse(userId, out var userGuid))
            return userGuid;
        return null;
    }

    public static Guid RequireUserId(this ClaimsPrincipal user)
    {
        var userId = user.GetUserId();
        if (userId.HasValue)
            return userId.Value;
        throw new UnauthorizedAccessException("User ID is required but not found in claims.");
    }

    public static string? GetEmail(this ClaimsPrincipal user)
    {
        return user.FindFirst(ClaimTypes.Email)?.Value;
    }
}