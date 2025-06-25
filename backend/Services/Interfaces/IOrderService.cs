using SushiZume.DTOs;
using SushiZume.Enums;

namespace SushiZume.Services.Interfaces;

using SushiZume.Models;

public interface IOrderService
{
    Task<List<Order>> GetWithPaginationAsync(int page, int pageSize);
    Task<Order> GetByIdAsync(Guid id);
    Task<Order> AddAsync(OrderPostDto dto);
    Task<bool> ChangeStatusAsync(Guid id, OrderStatus status);
    Task<int> GetCountAsync();
}