using AutoMapper;
using SushiZume.Data;
using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

public class ProductService(
    IProductRepository productRepo,
    IMapper mapper,
    ICategoryRepository categoryRepo,
    IProductItemRepository productItemRepo,
    SushiContext context)
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

    public async Task<List<Product>> GetAllAvailableAsync()
    {
        return await productRepo.GetAllAvailableAsync();
    }


    public async Task<Product> AddAsync(ProductPostDto dto)
    {
        var product = mapper.Map<Product>(dto);

        await productRepo.AddAsync(product);
        await productRepo.SaveChangesAsync();

        return product;
    }

    public async Task<Product> UpdateAsync(Guid productId, ProductUpdateDto dto)
    {
        var product = await GetByIdAsync(productId);
        product = dto.ToProduct(product, mapper);

        await productRepo.SaveChangesAsync();
        return product;
    }

    public async Task<bool> AddCategoriesAsync(Guid productId, List<Guid> categoryIds)
    {
        var productCategories = categoryIds
            .Select(id => new ProductCategory
            {
                ProductId = productId,
                CategoryId = id,
            }).ToList();

        context.ProductCategories.AddRange(productCategories);

        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RemoveCategoriesAsync(Guid productId, List<Guid> categoryIds)
    {
        var productCategories = context.ProductCategories
            .Where(pc => pc.ProductId == productId && categoryIds.Contains(pc.CategoryId))
            .ToList();
        context.ProductCategories.RemoveRange(productCategories);

        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> AddItemsAsync(Guid productId, List<ProductItemPostDto> dtos)
    {
        var productItems = mapper.Map<List<ProductItem>>(dtos);
        foreach (var item in productItems)
            item.ProductId = productId;
        context.ProductItems.AddRange(productItems);

        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RemoveItemsAsync(Guid productId, List<Guid> itemIds)
    {
        var productItems = context.ProductItems
            .Where(i => i.ProductId == productId && itemIds.Contains(i.Id))
            .ToList();
        context.ProductItems.RemoveRange(productItems);

        await context.SaveChangesAsync();
        return true;
    }

    public async Task<Product> SetAvailableAsync(Guid productId, bool available)
    {
        var product = await GetByIdAsync(productId);
        product.IsAvailable = available;

        context.Products.Update(product);
        await context.SaveChangesAsync();
        return product;
    }

    public async Task<Product> SetVisibleAsync(Guid productId, bool visible)
    {
        var product = await GetByIdAsync(productId);
        product.IsVisible = visible;

        await context.SaveChangesAsync();
        return product;
    }
}