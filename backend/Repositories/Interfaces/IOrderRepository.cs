using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

public interface IOrderRepository : IRepository<Order>
{
    Task<List<Order>> GetAllNewAsync(CancellationToken cancellationToken = default);
    Task<List<Order>> GetAllInProgressAsync(CancellationToken cancellationToken = default);
    Task<List<Order>> GetWithPaginationAsync(int skip, int pageSize, CancellationToken cancellationToken = default);
    Task<List<Order>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
}