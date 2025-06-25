using Microsoft.EntityFrameworkCore;
using SushiZume.Data;

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
    }
}