using SushiZume.DTOs;

namespace SushiZume.Services.Interfaces;

using SushiZume.Models;

public interface IOrderService
{
    Task<List<Order>> GetOrdersAsync(int page, int pageSize);
    Task<Order?> GetOrderByIdAsync(string id);
    Task<Order> CreateOrderAsync(OrderPostDto dto);
    Task<bool> MarkAsDoneAsync(string id);
    Task<bool> MarkAsNotNewAsync(string id);
    Task<int> GetOrderCountAsync();
}