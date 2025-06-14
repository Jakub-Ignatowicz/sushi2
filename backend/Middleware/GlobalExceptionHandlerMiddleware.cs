namespace SushiZume.Middleware;

using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

public class GlobalExceptionHandlerMiddleware(RequestDelegate next)
{
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        // Default to 500 error
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        // Map specific exceptions to status codes if needed
        if (exception is ArgumentException)
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

        var errors = new List<string>();

        if (exception is System.ComponentModel.DataAnnotations.ValidationException ve)
        {
            errors.Add(ve.Message);
        }
        else if (exception is ArgumentException argEx)
        {
            errors.Add(argEx.Message);
        }
        else
        {
            errors.Add(exception.Message);
        }

        var errorResponse = new
        {
            status = "error",
            errors = errors
        };

        var result = JsonSerializer.Serialize(errorResponse);

        return context.Response.WriteAsync(result);
    }
}