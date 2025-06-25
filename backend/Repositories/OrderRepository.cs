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
            .ThenInclude(p => p.Categories)
            .ThenInclude(pc => pc.Category)
            .Include(o => o.OrderProducts)
            .ThenInclude(op => op.Product)
            .ThenInclude(p => p.Items)
            .Include(p => p.Address)
            .Include(o => o.User);

    public new async Task<List<Order>> GetAllAsync()
    {
        return await DefaultQuery
            .ToListAsync();
    }

    public async Task<List<Order>> GetAllNewAsync()
    {
        return await DefaultQuery
            .Where(o => o.Status == OrderStatus.Pending)
            .ToListAsync();
    }

    public async Task<List<Order>> GetAllInProgressAsync()
    {
        return await DefaultQuery
            .Where(o => o.Status == OrderStatus.Preparing)
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

    public async Task<List<Order>> GetByUserIdAsync(Guid userId)
    {
        return await DefaultQuery
            .Where(o => o.UserId == userId)
            .ToListAsync();
    }
}