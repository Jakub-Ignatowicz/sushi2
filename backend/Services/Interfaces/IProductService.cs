using SushiZume.Models;

namespace SushiZume.Services.Interfaces;

public interface IProductService
{
    Task<List<Product>> GetAllProductsAsync();
    Task<Product?> GetProductByIdAsync(string id);
    Task<int> GetProductCountAsync();
    Task AddProductAsync(Product product);
    void UpdateProduct(Product product);
    void DeleteProduct(Product product);
    Task SaveChangesAsync();
    
    
}