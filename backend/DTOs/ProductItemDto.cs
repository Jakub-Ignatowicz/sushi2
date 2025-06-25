namespace SushiZume.DTOs;

public record ProductItemDto(
    Guid Id,
    string Description,
    int Quantity
);