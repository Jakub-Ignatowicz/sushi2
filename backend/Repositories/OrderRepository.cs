using SushiZume.Enums;

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
            .ThenInclude(p => p.Category)
            .Include(o => o.OrderProducts)
            .ThenInclude(op => op.Product)
            .ThenInclude(p => p.Items)
            .Include(p => p.Address)
            .OrderByDescending(o => o.CreatedAt);

    public Task<List<Order>> GetAllNewAsync(CancellationToken cancellationToken)
    {
        return DefaultQuery
            .Where(o => o.Status == OrderStatus.Pending)
            .ToListAsync(cancellationToken);
    }

    public Task<List<Order>> GetAllInProgressAsync(CancellationToken cancellationToken)
    {
        return DefaultQuery
            .Where(o => o.Status == OrderStatus.Preparing)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<Order>> GetWithPaginationAsync(int skip, int pageSize, CancellationToken cancellationToken)
    {
        return await DefaultQuery
            .OrderByDescending(o => o.CreatedAt)
            .Skip(skip)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
    }
}