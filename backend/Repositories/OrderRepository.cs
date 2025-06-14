using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories;
using Microsoft.EntityFrameworkCore;

public class OrderRepository : Repository<Order>, IOrderRepository
{
    public OrderRepository(SushiContext context) : base(context) { }

    public Task<List<Order>> GetNewOrdersAsync()
    {
        return _context.Orders.Where(o => o.IsNew).ToListAsync();
    }

    public void MarkAsNotNew(Order order)
    {
        _context.Orders.Update(order);
    }
}

