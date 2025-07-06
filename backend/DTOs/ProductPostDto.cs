using SushiZume.Models;

namespace SushiZume.DTOs;

public record ProductPostDto(
    string Name,
    decimal Price,
    string? ImageName,
    string? Description,
    double? Amount,
    string? AmountUnit,
    Guid CategoryId,
    List<ProductItemPostDto> Items
);