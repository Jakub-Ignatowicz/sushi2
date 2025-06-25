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

        var sql = await File.ReadAllTextAsync("import.sql");
        await context.Database.ExecuteSqlRawAsync(sql);

        await context.SaveChangesAsync();
    }
}