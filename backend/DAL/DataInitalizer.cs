using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SushiZume.Enums;
using SushiZume.Models;

namespace SushiZume.Data;

public static class DataInitializer
{
    public static async Task SeedAsync(SushiContext context)
    {
        if (await context.Products.AnyAsync())
            return;

        var sql = await File.ReadAllTextAsync("DAL/import.sql");
        var sourceConnection = Environment.GetEnvironmentVariable("SOURCE_CONN");
        if (string.IsNullOrEmpty(sourceConnection))
            throw new InvalidOperationException("Source connection string is not configured.");

        sql = sql.Replace("{{SOURCE_CONN}}", sourceConnection);
        await context.Database.ExecuteSqlRawAsync(sql);

        await context.SaveChangesAsync();
    }

    public static async Task SeedAdminAsync(IServiceScope scope)
    {
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
        var user = await userManager.FindByNameAsync("admin");

        if (user is null)
        {
            user = new User { UserName = "admin" };
            var pass = Environment.GetEnvironmentVariable("ADMIN_PASSWORD");
            if (string.IsNullOrWhiteSpace(pass))
                throw new InvalidOperationException("ADMIN_PASSWORD environment variable is not set.");

            await userManager.CreateAsync(user, pass);
        }
    }
}