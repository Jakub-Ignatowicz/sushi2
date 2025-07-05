using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Services.Interfaces;

public interface IProductService
{
    Task<List<Product>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<List<Product>> GetAllAvailableAsync(CancellationToken cancellationToken = default);
    Task<List<Product>> GetRangeAsync(ICollection<Guid> productIds, CancellationToken cancellationToken = default);
    Task<Product> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Product> AddAsync(ProductPostDto dto, CancellationToken cancellationToken = default);
    Task RemoveAsync(Guid productId, CancellationToken cancellationToken = default);

    Task<Product> UpdateAsync(Guid productId, ProductUpdateDto dto, CancellationToken cancellationToken = default);

    Task<bool> AddItemsAsync(Guid productId, List<ProductItemPostDto> dtos,
        CancellationToken cancellationToken = default);

    Task<bool> RemoveItemsAsync(Guid productId, List<Guid> itemIds, CancellationToken cancellationToken = default);
    Task SetAvailableAsync(Guid productId, bool available, CancellationToken cancellationToken = default);
    Task SetFeaturedAsync(Guid productId, bool featured, CancellationToken cancellationToken = default);
}