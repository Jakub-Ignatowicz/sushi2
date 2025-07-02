using SushiZume.DTOs;
using SushiZume.Enums;

namespace SushiZume.Services.Interfaces;

using SushiZume.Models;

public interface IOrderService
{
    Task<List<Order>> GetWithPaginationAsync(int page, int pageSize, CancellationToken cancellationToken = default);
    Task<Order> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Order> AddAsync(OrderPostDto dto, CancellationToken cancellationToken = default);
    Task<bool> ChangeStatusAsync(Guid id, OrderStatus status, CancellationToken cancellationToken = default);
    Task<int> GetCountAsync(CancellationToken cancellationToken = default);
}