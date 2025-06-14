namespace SushiZume.DTOs;

public record ProductItemDto(
    string Id,
    string Description,
    int Number,
    string NumberSuffix
);