using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

namespace SushiZume.Repositories;

public class CategoryRepository(SushiContext context) : Repository<Category>(context), ICategoryRepository
{
    public Task<List<Category>> GetAllWithProductsAsync(CancellationToken cancellationToken)
    {
        return DefaultQuery
            .Include(c => c.Products)
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetMaxIndexOrderValueAsync(CancellationToken cancellationToken)
    {
        return await DefaultQuery.MaxAsync(c => (int?)c.OrderIndex, cancellationToken) ?? 0;
    }
}