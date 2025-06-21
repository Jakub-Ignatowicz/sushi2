using System.Security.Claims;

namespace SushiZume.Middleware;

public class UserIdAuthorizationMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        // Only apply to matching routes
        var path = context.Request.Path.ToString();
        if (context.User.Identity?.IsAuthenticated == true &&
            path.StartsWith("/yourcontroller/", StringComparison.OrdinalIgnoreCase))
        {
            if (context.Request.RouteValues.TryGetValue("userId", out var userIdObj) &&
                Guid.TryParse(userIdObj?.ToString(), out var userIdFromRoute))
            {
                var userIdFromToken = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userIdFromToken != userIdFromRoute.ToString())
                {
                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    await context.Response.WriteAsync("Forbidden: You can only access your own data.");
                    return;
                }
            }
        }

        await next(context);
    }
}