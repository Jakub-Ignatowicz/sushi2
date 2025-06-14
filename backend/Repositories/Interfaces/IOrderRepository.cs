using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

public interface IOrderRepository : IRepository<Order>
{
    Task<List<Order>> GetAllNewAsync();
    Task<List<Order>> GetWithPaginationAsync(int skip, int pageSize);
    Task<bool> MarkAsDoneAsync(Guid id);
}