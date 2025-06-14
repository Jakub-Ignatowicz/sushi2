using Microsoft.EntityFrameworkCore;

namespace SushiZume.Repositories;

using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

public class ProductRepository(SushiContext context) : Repository<Product>(context), IProductRepository
{
    public async Task<Product?> GetProductByIdAsync(string id)
    {
        return await _context.Products.FindAsync(id);
    }

    public async Task<List<Product>> GetAllProductsAsync()
    {
        return await _context.Products
            .Include(p => p.ProductItems)
            .ToListAsync();
    }

    public async Task<int> GetProductCountAsync()
    {
        return await _context.Products.CountAsync();
    }
}