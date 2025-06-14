using SushiZume.DTOs;

namespace SushiZume.Services.Interfaces;

using SushiZume.Models;

public interface IOrderService
{
    Task<List<Order>> GetOrdersAsync(int page, int pageSize);
    Task<Order> GetOrderByIdAsync(Guid id);
    Task<Order> CreateOrderAsync(OrderPostDto dto);
    Task<bool> MarkAsDoneAsync(Guid id);
    Task<bool> MarkAsNotNewAsync(Guid id);
    Task<int> GetOrderCountAsync();
}