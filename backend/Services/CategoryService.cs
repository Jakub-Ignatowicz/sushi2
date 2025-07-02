using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

public class CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
    : ICategoryService
{
    public Task<List<Category>> GetAllAsync(CancellationToken cancellationToken)
    {
        return categoryRepository.GetAllAsync(cancellationToken);
    }

    public Task<List<Category>> GetAllWithProductsAsync(CancellationToken cancellationToken)
    {
        return categoryRepository.GetAllWithProductsAsync(cancellationToken);
    }

    public async Task<Category> GetByIdAsync(Guid categoryId, CancellationToken cancellationToken)
    {
        var category = await categoryRepository.GetByIdAsync(categoryId, cancellationToken);
        if (category == null)
            throw new KeyNotFoundException($"Category with ID {categoryId} not found.");
        return category;
    }

    public async Task OrderCategoriesAsync(List<string> categoryIds, CancellationToken cancellationToken)
    {
        var categories = await GetAllAsync(cancellationToken);
        if (categoryIds.Count != categories.Count)
            throw new ArgumentException("The number of category IDs must match the total number of categories.");

        foreach (var category in categories)
        {
            var index = categoryIds.IndexOf(category.Id.ToString());
            if (index == -1)
                throw new ArgumentException($"Category ID {category.Id} not found in the provided list.");
            category.OrderIndex = index;
            categoryRepository.Update(category);
        }

        await categoryRepository.SaveChangesAsync(cancellationToken);
    }

    public async Task ChangeNameAsync(Guid categoryId, string name, CancellationToken cancellationToken)
    {
        var category = await categoryRepository.GetByIdAsync(categoryId, cancellationToken);
        if (category == null)
            throw new KeyNotFoundException($"Category with ID {categoryId} not found.");
        category.Name = name;

        categoryRepository.Update(category);
        await categoryRepository.SaveChangesAsync(cancellationToken);
    }

    public async Task<Guid> CreateAsync(CategoryPostDto dto, CancellationToken cancellationToken)
    {
        var category = mapper.Map<Category>(dto);
        var maxOrderIndex = await categoryRepository.GetMaxIndexOrderValueAsync(cancellationToken);
        category.OrderIndex = maxOrderIndex + 1;

        await categoryRepository.AddAsync(category, cancellationToken);
        await categoryRepository.SaveChangesAsync(cancellationToken);
        return category.Id;
    }

    public async Task UpdateAsync(Guid categoryId, CategoryPostDto dto, CancellationToken cancellationToken)
    {
        var category = await GetByIdAsync(categoryId, cancellationToken);

        category.Name = dto.Name;
        if (!string.IsNullOrWhiteSpace(dto.Description))
        {
            category.Description = dto.Description;
        }

        categoryRepository.Update(category);
        await categoryRepository.SaveChangesAsync(cancellationToken);
    }
}