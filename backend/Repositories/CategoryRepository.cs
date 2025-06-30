using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

namespace SushiZume.Repositories;

public class CategoryRepository(SushiContext context) : Repository<Category>(context), ICategoryRepository
{
    public Task<List<Category>> GetAllWithProductsAsync()
    {
        return DefaultQuery
            .Include(c => c.Products)
            .ToListAsync();
    }
}
