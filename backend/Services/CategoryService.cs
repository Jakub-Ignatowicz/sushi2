using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

public class CategoryService(ICategoryRepository categoryRepo, SushiContext context, IMapper mapper) : ICategoryService
{
    public async Task<List<Category>> GetAllAsync()
    {
        return await categoryRepo.GetAllAsync();
    }

    public async Task<List<Category>> GetAllWithProductsAsync()
    {
        return await categoryRepo.GetAllWithProductsAsync();
    }

    public async Task<Category> GetByIdAsync(Guid categoryId)
    {
        var category = await categoryRepo.GetByIdAsync(categoryId);
        if (category == null)
            throw new KeyNotFoundException($"Category with ID {categoryId} not found.");
        return category;
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

    public async Task ChangeNameAsync(Guid categoryId, string name)
    {
        var category = await categoryRepo.GetByIdAsync(categoryId);
        if (category == null)
            throw new KeyNotFoundException($"Category with ID {categoryId} not found.");

        category.Name = name;
        await context.SaveChangesAsync();
    }

    public async Task<Guid> CreateAsync(CategoryPostDto dto)
    {
        var category = mapper.Map<Category>(dto);
        await categoryRepo.AddAsync(category);
        await context.SaveChangesAsync();
        return category.Id;
    }
}
