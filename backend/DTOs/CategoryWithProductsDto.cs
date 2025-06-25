namespace SushiZume.DTOs;

public record CategoryWithProductsDto_ProductDto(
    Guid Id,
    string Name,
    string? ImageUrl,
    string? AmountUnit,
    decimal Price,
    double? Amount,
    string? Description,
    List<ProductItemDto> Items
);

public record CategoryWithProductsDto(
    Guid Id,
    string Name,
    string? Description,
    int OrderIndex,
    List<CategoryWithProductsDto_ProductDto> Products
);