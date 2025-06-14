namespace SushiZume.DTOs;

public record ProductDto(
    Guid Id,
    string Name,
    decimal Price,
    bool IsAvailable,
    bool IsVisible,
    string ImagePath,
    double Amount,
    string AmountUnit,
    List<ProductItemDto> ProductItems
);