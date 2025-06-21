using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace SushiZume.Attributes;

public class SameUserOnlyAttribute : AuthorizeAttribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;
        if (!user.Identity?.IsAuthenticated ?? true)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var routeData = context.RouteData.Values;
        if (routeData.TryGetValue("userId", out var userIdObj) &&
            Guid.TryParse(userIdObj?.ToString(), out var userIdFromRoute))
        {
            var userIdFromToken = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdFromToken == null || userIdFromToken != userIdFromRoute.ToString())
            {
                context.Result = new ForbidResult();
                return;
            }
        }
    }
}