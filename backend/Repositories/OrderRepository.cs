namespace SushiZume.Repositories;

using Data;
using Models;
using Microsoft.EntityFrameworkCore;

public class OrderRepository(SushiContext context) : Repository<Order>(context), IOrderRepository
{
    protected override IQueryable<Order> DefaultQuery =>
        base.DefaultQuery
            .Include(o => o.OrderProducts)
            .ThenInclude(op => op.Product)
            .ThenInclude(p => p.Items)
            .Include(p => p.Address);

    public new async Task<List<Order>> GetAllAsync()
    {
        return await DefaultQuery
            .ToListAsync();
    }

    public async Task<List<Order>> GetAllNewAsync()
    {
        return await DefaultQuery
            .Where(o => o.IsNew)
            .ToListAsync();
    }

    public async Task<List<Order>> GetWithPaginationAsync(int skip, int pageSize)
    {
        return await DefaultQuery
            .OrderByDescending(o => o.CreatedAt)
            .Skip(skip)
            .Take(pageSize)
            .ToListAsync();
    }


    public async Task<bool> MarkAsDoneAsync(Guid id)
    {
        return await context.Orders
            .Where(o => o.Id == id)
            .ExecuteUpdateAsync(o => o.SetProperty(x => x.IsDone, true)) > 0;
    }

    public async Task<bool> MarkAsNotNewAsync(Guid id)
    {
        return await context.Orders
            .Where(o => o.Id == id)
            .ExecuteUpdateAsync(o => o.SetProperty(x => x.IsNew, false)) > 0;
    }
}