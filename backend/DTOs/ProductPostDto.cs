using SushiZume.Models;

namespace SushiZume.DTOs;

public record ProductPostDto(
    string Name,
    decimal Price,
    string ImagePath,
    double Amount,
    string AmountUnit,
    List<Guid> CategoryIds,
    List<ProductItemPostDto> ProductItems
);