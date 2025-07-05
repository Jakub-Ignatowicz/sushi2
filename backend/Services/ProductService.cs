using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;
using SushiZume.Data;
using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

public class ProductService(
    IProductRepository productRepository,
    IMapper mapper,
    ICategoryRepository categoryRepo,
    IProductItemRepository productItemRepository,
    IValidator<Product> productValidator,
    IValidator<ProductItem> productItemValidator)
    : IProductService
{
    public async Task<Product> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetByIdAsync(id, cancellationToken);
        if (product == null)
            throw new KeyNotFoundException($"Produkt o ID [{id}] nie został znaleziony.");
        return product;
    }

    public Task<List<Product>> GetAllAsync(CancellationToken cancellationToken)
    {
        return productRepository.GetAllAsync(cancellationToken);
    }

    public Task<List<Product>> GetAllAvailableAsync(CancellationToken cancellationToken)
    {
        return productRepository.GetAllAvailableAsync(cancellationToken);
    }

    public Task<List<Product>> GetRangeAsync(ICollection<Guid> productIds, CancellationToken cancellationToken)
    {
        return productRepository.GetRangeAsync(productIds, cancellationToken);
    }

    public async Task<Product> AddAsync(ProductPostDto dto, CancellationToken cancellationToken)
    {
        var product = mapper.Map<Product>(dto);

        await productValidator.ValidateAndThrowAsync(product, cancellationToken);

        await productRepository.AddAsync(product, cancellationToken);
        await productRepository.SaveChangesAsync(cancellationToken);
        return product;
    }

    public async Task<Product> UpdateAsync(Guid productId, ProductUpdateDto dto, CancellationToken cancellationToken)
    {
        var product = await GetByIdAsync(productId, cancellationToken);

        product.Name = dto.Name ?? product.Name;
        product.ImageUrl = dto.ImageUrl ?? product.ImageUrl;
        product.AmountUnit = dto.AmountUnit ?? product.AmountUnit;
        product.Price = dto.Price ?? product.Price;
        product.Amount = dto.Amount ?? product.Amount;
        product.Description = dto.Description ?? product.Description;
        product.IsAvailable = dto.Available ?? product.IsAvailable;

        if (dto.Items != null)
        {
            product.Items.Clear();

            foreach (var item in dto.Items)
            {
                var newItem = new ProductItem
                {
                    Description = item.Description,
                    Quantity = item.Quantity,
                };

                product.Items.Add(newItem);
                productItemRepository.Add(newItem);
            }
        }

        await productValidator.ValidateAndThrowAsync(product, cancellationToken);

        productRepository.Update(product);
        await productRepository.SaveChangesAsync(cancellationToken);
        return product;
    }

    public async Task<bool> AddItemsAsync(Guid productId, List<ProductItemPostDto> dtos,
        CancellationToken cancellationToken)
    {
        var product = await GetByIdAsync(productId, cancellationToken);
        var productItems = mapper.Map<List<ProductItem>>(dtos);

        foreach (var item in productItems)
        {
            if (item.ProductId != productId)
                item.ProductId = productId;

            await productItemValidator.ValidateAndThrowAsync(item, cancellationToken);
            product.Items.Add(item);
            productItemRepository.Add(item);
        }

        await productRepository.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> RemoveItemsAsync(Guid productId, List<Guid> itemIds, CancellationToken cancellationToken)
    {
        var product = await GetByIdAsync(productId, cancellationToken);

        foreach (var removeItemId in itemIds)
        {
            var item = product.Items.FirstOrDefault(i => i.Id == removeItemId);
            if (item != null)
                product.Items.Remove(item);
        }

        productRepository.Update(product);
        await productRepository.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task SetAvailableAsync(Guid productId, bool available, CancellationToken cancellationToken)
    {
        var product = await GetByIdAsync(productId, cancellationToken);
        product.IsAvailable = available;

        productRepository.Update(product);
        await productRepository.SaveChangesAsync(cancellationToken);
    }

    public async Task SetFeaturedAsync(Guid productId, bool featured, CancellationToken cancellationToken)
    {
        var product = await GetByIdAsync(productId, cancellationToken);
        product.IsFeatured = featured;

        productRepository.Update(product);
        await productRepository.SaveChangesAsync(cancellationToken);
    }
}