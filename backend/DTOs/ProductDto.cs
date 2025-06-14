using SushiZume.Models;

namespace SushiZume.DTOs;

public record ProductDto(
    Guid Id,
    string Name,
    decimal Price,
    string ImagePath,
    double Amount,
    string AmountUnit,
    List<CategoryDto> Categories,
    List<ProductItemDto> Items
);