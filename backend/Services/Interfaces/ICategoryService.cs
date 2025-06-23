using SushiZume.Models;

namespace SushiZume.Services.Interfaces;

public interface ICategoryService
{
    Task<List<Category>> GetAllAsync();
    Task<List<Category>> GetAllWithProductsAsync();
    Task OrderCategoriesAsync(List<string> categoryIds);
}