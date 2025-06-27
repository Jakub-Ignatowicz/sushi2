using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Services.Interfaces;

public interface IProductService
{
    Task<List<Product>> GetAllAsync();
    Task<List<Product>> GetAllAvailableAsync();
    Task<List<Product>> GetRangeAsync(List<Guid> productIds);
    Task<Product> GetByIdAsync(Guid id);
    Task<Product> AddAsync(ProductPostDto dto);

    Task<Product> UpdateAsync(Guid productId, ProductUpdateDto dto);
    Task<bool> AddCategoriesAsync(Guid productId, List<Guid> categoryIds);
    Task<bool> RemoveCategoriesAsync(Guid productId, List<Guid> categoryIds);
    Task<bool> AddItemsAsync(Guid productId, List<ProductItemPostDto> dtos);
    Task<bool> RemoveItemsAsync(Guid productId, List<Guid> itemIds);
    Task<Product> SetAvailableAsync(Guid productId, bool available);
    Task<Product> SetVisibleAsync(Guid productId, bool visible);
    Task SetFeaturedAsync(Guid productId, bool featured);
}
