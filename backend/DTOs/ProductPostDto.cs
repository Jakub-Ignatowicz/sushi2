using SushiZume.Models;

namespace SushiZume.DTOs;

public record ProductPostDto(
    string Name,
    decimal Price,
    string ImageName,
    double Amount,
    string AmountUnit,
    List<Guid> CategoryIds,
    List<ProductItemPostDto> ProductItems
);