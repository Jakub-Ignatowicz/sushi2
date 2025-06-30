using SushiZume.Models;

namespace SushiZume.Services.Interfaces;

public interface ICategoryService
{
    Task<List<Category>> GetAllAsync();
    Task<List<Category>> GetAllWithProductsAsync();
    Task<Category> GetByIdAsync(Guid categoryId);
    Task OrderCategoriesAsync(List<string> categoryIds);
    Task ChangeNameAsync(Guid categoryId, string name);
    Task<Guid> CreateAsync(CategoryPostDto dto);
    Task UpdateAsync(Guid categoryId, CategoryPostDto dto);
}
