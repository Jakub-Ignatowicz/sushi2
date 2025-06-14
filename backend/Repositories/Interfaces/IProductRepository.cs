using SushiZume.Models;

namespace SushiZume.Repositories.Interfaces;

public interface IProductRepository : IRepository<Product>
{
    Task<Product?> GetProductByIdAsync(string name);
    Task<List<Product>> GetAllProductsAsync();
    Task<int> GetProductCountAsync();
}