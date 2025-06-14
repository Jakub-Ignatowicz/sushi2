using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories;
using Microsoft.EntityFrameworkCore;

public class OrderRepository : Repository<Order>, IOrderRepository
{
    public OrderRepository(SushiContext context) : base(context)
    {
    }

    public Task<List<Order>> GetNewOrdersAsync()
    {
        return _context.Orders.Where(o => o.IsNew).ToListAsync();
    }

    public async Task<List<Order>> GetOrdersAsync(int skip, int pageSize)
    {
        return await _context.Orders
            .OrderByDescending(o => o.CreatedAt)
            .Skip(skip)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<int> GetOrderCountAsync()
    {
        return await _context.Orders.CountAsync();
    }

    public void MarkAsNotNew(Order order)
    {
        _context.Orders.Update(order);
    }
}