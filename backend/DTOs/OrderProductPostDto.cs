namespace SushiZume.DTOs;

public record OrderProductPostDto(
    Guid ProductId,
    int Quantity
);