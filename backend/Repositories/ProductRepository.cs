using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;

namespace SushiZume.Repositories;

using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

public class ProductRepository(SushiContext context) : Repository<Product>(context), IProductRepository
{
    protected override IQueryable<Product> DefaultQuery =>
        base.DefaultQuery
            .Include(p => p.Category)
            .Include(p => p.Items);

    public Task<List<Product>> GetAllAvailableAsync(CancellationToken cancellationToken)
    {
        return DefaultQuery
            .Where(p => p.IsAvailable == true)
            .ToListAsync(cancellationToken);
    }

    public Task<List<Product>> GetRangeAsync(ICollection<Guid> productIds, CancellationToken cancellationToken)
    {
        return DefaultQuery
            .Where(p => productIds.Contains(p.Id))
            .ToListAsync(cancellationToken);
    }
}