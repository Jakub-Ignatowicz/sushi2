using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

public class CategoryService(ICategoryRepository categoryRepo, SushiContext context) : ICategoryService
{
    public async Task<List<Category>> GetAllAsync()
    {
        return await categoryRepo.GetAllAsync();
    }

    public async Task<List<Category>> GetAllWithProductsAsync()
    {
        return await categoryRepo.GetAllWithProductsAsync();
    }

    public async Task OrderCategoriesAsync(List<string> categoryIds)
    {
        var categories = await GetAllAsync();
        if (categoryIds.Count != categories.Count)
            throw new ArgumentException("The number of category IDs must match the total number of categories.");

        foreach (var category in categories)
        {
            var index = categoryIds.IndexOf(category.Id.ToString());
            category.OrderIndex = index;
        }

        await context.SaveChangesAsync();
    }
}