using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

namespace SushiZume.Repositories;

public class CategoryRepository(SushiContext sushiContext) : ICategoryRepository
{
    public Task<List<Category>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Category?> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task AddAsync(Category entity)
    {
        throw new NotImplementedException();
    }

    public void Update(Category entity)
    {
        throw new NotImplementedException();
    }

    public void Delete(Category entity)
    {
        throw new NotImplementedException();
    }

    public Task SaveChangesAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<Category?> GetCategoryByIdAsync(Guid id)
    {
        return await sushiContext.Categories.FindAsync(id);
    }
}