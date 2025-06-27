using SushiZume.Models;

namespace SushiZume.Repositories.Interfaces;

public interface IProductRepository : IRepository<Product>
{
    Task<List<Product>> GetAllAvailableAsync();
    Task<List<Product>> GetRangeAsync(List<Guid> productIds);
}
