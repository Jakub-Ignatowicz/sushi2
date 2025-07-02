using SushiZume.Models;

namespace SushiZume.Repositories.Interfaces;

public interface IProductRepository : IRepository<Product>
{
    Task<List<Product>> GetAllAvailableAsync(CancellationToken cancellationToken = default);
    Task<List<Product>> GetRangeAsync(List<Guid> productIds, CancellationToken cancellationToken = default);
}