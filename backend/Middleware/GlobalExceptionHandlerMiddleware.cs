using System.ComponentModel.DataAnnotations;
using System.Dynamic;

namespace SushiZume.Middleware;

using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

public class ErrorResponse
{
    public int Status { get; set; }
    public string Title { get; set; }
    public List<dynamic>? Errors { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}

public class GlobalExceptionHandlerMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlerMiddleware> logger)
{
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            logger.LogError(ex, "Validation error occurred.");

            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            context.Response.ContentType = "application/json";

            var errors = ex.ValidationResult.MemberNames.Select(field =>
                {
                    dynamic item = new ExpandoObject();
                    item.field = field;
                    item.message = ex.ValidationResult.ErrorMessage ?? ex.Message;
                    return item;
                }
            ).ToList();

            if (errors.Count == 0)
                errors.Add(new { field = "UnknownField", message = ex.Message });

            await context.Response.WriteAsJsonAsync(new ErrorResponse
            {
                Status = context.Response.StatusCode,
                Title = "One or more validation errors occurred.",
                Errors = errors
            });
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unexpected error");

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(new ErrorResponse
            {
                Status = context.Response.StatusCode,
                Title = "An unexpected error occurred.",
                Errors = new List<object> { new { message = ex.Message } }
            });
        }
    }
}