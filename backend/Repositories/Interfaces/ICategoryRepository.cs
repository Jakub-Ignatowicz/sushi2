using SushiZume.Models;

namespace SushiZume.Repositories.Interfaces;

public interface ICategoryRepository : IRepository<Category>
{
    Task<Category?> GetCategoryByIdAsync(Guid id);
}