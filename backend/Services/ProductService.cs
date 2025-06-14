using AutoMapper;
using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

public class ProductService(IProductRepository productRepo, IMapper mapper, ICategoryRepository categoryRepo)
    : IProductService
{
    public async Task<Product> GetByIdAsync(Guid id)
    {
        var product = await productRepo.GetByIdAsync(id);
        if (product == null)
            throw new KeyNotFoundException($"Produkt o ID [{id}] nie został znaleziony.");
        return product;
    }

    public async Task<List<Product>> GetAllAsync()
    {
        return await productRepo.GetAllAsync();
    }


    public async Task<Product> AddAsync(ProductPostDto dto)
    {
        var categoryIds = dto.CategoryIds;

        if (categoryIds == null || categoryIds.Count == 0)
            throw new ArgumentException("Produkt musi mieć co najmniej jedną kategorię.");

        var product = mapper.Map<Product>(dto);

        foreach (var categoryId in categoryIds)
        {
            var category = await categoryRepo.GetByIdAsync(categoryId);

            if (category == null)
                throw new KeyNotFoundException($"Kategoria o ID [{categoryId}] nie została znaleziona.");

            product.Categories.Add(new ProductCategory()
            {
                ProductId = product.Id,
                CategoryId = categoryId,
            });
        }

        await productRepo.AddAsync(product);
        await productRepo.SaveChangesAsync();
        return product;
    }
}