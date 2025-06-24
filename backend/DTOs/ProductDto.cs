using SushiZume.Models;

namespace SushiZume.DTOs;

public record ProductDto(
    Guid Id,
    string Name,
    string? ImagePath,
    string? AmountUnit,
    bool IsFeatured,
    bool IsAvailable,
    bool IsVisible,
    decimal Price,
    double? Amount,
    string? Description,
    List<CategoryDto> Categories,
    List<ProductItemDto> Items
);