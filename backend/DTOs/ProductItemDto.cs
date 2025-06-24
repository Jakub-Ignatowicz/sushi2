namespace SushiZume.DTOs;

public record ProductItemDto(
    Guid Id,
    string Description,
    int Number,
    string NumberSuffix
);