using SushiZume.DTOs;

namespace SushiZume.Services.Interfaces;

using SushiZume.Models;

public interface IOrderService
{
    Task<List<Order>> GetWithPaginationAsync(int page, int pageSize);
    Task<Order> GetByIdAsync(Guid id);
    Task<Order> AddAsync(OrderPostDto dto);
    Task<bool> MarkAsDoneAsync(Guid id);
    Task<bool> MarkAsSeenAsync(Guid id);
    Task<int> GetCountAsync();
    Task<bool> MarkAsResolvedAsync(Guid orderId);
}