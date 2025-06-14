using SushiZume.Models;

public interface IOrderService
{
    Task<List<Order>> GetAllOrdersAsync();
    Task<Order?> GetOrderByIdAsync(string id);
    Task CreateOrderAsync(Order order);
    Task<bool> MarkAsDoneAsync(string id);
    Task<bool> MarkAsNotNewAsync(string id);
}

