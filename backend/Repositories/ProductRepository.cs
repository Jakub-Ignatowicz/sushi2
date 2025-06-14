using Microsoft.EntityFrameworkCore;

namespace SushiZume.Repositories;

using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

public class ProductRepository(SushiContext context) : Repository<Product>(context), IProductRepository
{
    protected override IQueryable<Product> DefaultQuery =>
        base.DefaultQuery
            .Include(p => p.Categories)
            .ThenInclude(pc => pc.Category)
            .Include(p => p.Items);

    public new async Task<List<Product>> GetAllAsync()
    {
        return await DefaultQuery
            .ToListAsync();
    }

    public async Task<List<Product>> GetAllAvailableAsync()
    {
        return await DefaultQuery
            .Where(p => p.IsAvailable)
            .ToListAsync();
    }
}