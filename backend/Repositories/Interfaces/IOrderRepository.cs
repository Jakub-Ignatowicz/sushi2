using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

public interface IOrderRepository : IRepository<Order>
{
    Task<List<Order>> GetAllNewAsync();
    Task<List<Order>> GetAllInProgressAsync();
    Task<List<Order>> GetWithPaginationAsync(int skip, int pageSize);
    Task<List<Order>> GetByUserIdAsync(Guid userId);
}