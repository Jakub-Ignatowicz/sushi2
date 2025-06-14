using AutoMapper;
using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

public class ProductService(IProductRepository productRepo, IMapper mapper) : IProductService
{
    public async Task<List<Product>> GetAllProductsAsync()
    {
        return await productRepo.GetAllProductsAsync();
    }

    public Task<Product> GetProductByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<int> GetProductCountAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<Product> AddProductAsync(ProductPostDto dto)
    {
        var product = mapper.Map<Product>(dto);

        if (product.Categories.Count == 0)
            throw new ArgumentException("Produkt musi mieć co najmniej jedną kategorię.");

        await productRepo.AddAsync(product);
        await productRepo.SaveChangesAsync();
        return product;
    }

    public void UpdateProduct(Product product)
    {
        throw new NotImplementedException();
    }

    public void DeleteProduct(Product product)
    {
        throw new NotImplementedException();
    }

    public Task SaveChangesAsync()
    {
        throw new NotImplementedException();
    }
}