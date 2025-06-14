using SushiZume.Models;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

public class ProductService : IProductService
{
    public Task<List<Product>> GetAllProductsAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Product?> GetProductByIdAsync(string id)
    {
        throw new NotImplementedException();
    }

    public Task<int> GetProductCountAsync()
    {
        throw new NotImplementedException();
    }

    public Task AddProductAsync(Product product)
    {
        throw new NotImplementedException();
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