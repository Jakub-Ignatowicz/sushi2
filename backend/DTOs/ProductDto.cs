using SushiZume.Models;

namespace SushiZume.DTOs;

public record ProductDto(
    Guid Id,
    string Name,
    string ImagePath,
    string AmountUnit,
    decimal Price,
    double Amount,
    List<CategoryDto> Categories,
    List<ProductItemDto> Items
);