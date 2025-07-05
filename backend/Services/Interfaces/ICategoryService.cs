using SushiZume.Models;

namespace SushiZume.Services.Interfaces;

public interface ICategoryService
{
    Task<List<Category>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<List<Category>> GetAllWithProductsAsync(CancellationToken cancellationToken = default);
    Task<Category> GetByIdAsync(Guid categoryId, CancellationToken cancellationToken = default);
    Task OrderCategoriesAsync(List<string> categoryIds, CancellationToken cancellationToken = default);
    Task ChangeNameAsync(Guid categoryId, string name, CancellationToken cancellationToken = default);
    Task<Guid> CreateAsync(CategoryPostDto dto, CancellationToken cancellationToken = default);
    Task UpdateAsync(Guid categoryId, CategoryPostDto dto, CancellationToken cancellationToken = default);
    Task RemoveAsync(Guid categoryId, CancellationToken cancellationToken = default);
}