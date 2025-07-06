using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Models;

namespace SushiZume.Extensions;

public static class MigrationExtensions
{
    public static async Task ApplyMigrations(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<SushiContext>();
        await context.Database.MigrateAsync();

        await DataInitializer.SeedAsync(context);
        await DataInitializer.SeedAdminAsync(scope);
    }
}