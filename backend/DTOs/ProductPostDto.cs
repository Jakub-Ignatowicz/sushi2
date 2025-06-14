namespace SushiZume.DTOs;

public record ProductPostDto(
    string Name,
    decimal Price,
    string ImagePath,
    double Amount,
    string AmountUnit,
    List<ProductItemPostDto> ProductItems
);