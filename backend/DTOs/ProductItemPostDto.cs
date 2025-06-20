using SushiZume.Models;

namespace SushiZume.DTOs;

public record ProductItemPostDto(
    string Description,
    int Number,
    string NumberSuffix
);