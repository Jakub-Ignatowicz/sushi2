using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

public interface IOrderRepository : IRepository<Order>
{
    Task<List<Order>> GetNewOrdersAsync();
}

