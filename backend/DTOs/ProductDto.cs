using SushiZume.Models;

namespace SushiZume.DTOs;

public record ProductDto(
    Guid Id,
    string Name,
    string? ImageName,
    string? AmountUnit,
    bool IsFeatured,
    bool IsAvailable,
    decimal Price,
    double? Amount,
    string? Description,
    CategoryDto Category,
    List<ProductItemDto> Items
);