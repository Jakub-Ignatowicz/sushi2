namespace SushiZume.DTOs;

public record CategoryDto(
    Guid Id,
    string Name,
    string? Description,
    int OrderIndex
);