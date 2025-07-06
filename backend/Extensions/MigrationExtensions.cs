using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Models;

namespace SushiZume.Extensions;

public static class MigrationExtensions
{
    public async static void ApplyMigrations(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        await using var dbContext = scope.ServiceProvider.GetRequiredService<SushiContext>();

        await dbContext.Database.MigrateAsync();

        var context = scope.ServiceProvider.GetRequiredService<SushiContext>();
        await DataInitializer.SeedAsync(context);

        using var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
        var user = await userManager.FindByNameAsync("admin");
        if (user is null)
        {
            user = new User { UserName = "admin" };
            await userManager.CreateAsync(user, "Admin123!");
        }
    }
}
