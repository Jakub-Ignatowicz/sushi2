using SushiZume.Models;

namespace SushiZume.DTOs;

public record ProductDto(
    Guid Id,
    string Name,
    string? ImageUrl,
    string? AmountUnit,
    bool IsFeatured,
    bool IsAvailable,
    bool IsVisible,
    decimal Price,
    double? Amount,
    string? Description,
    CategoryDto Category,
    List<ProductItemDto> Items
);
