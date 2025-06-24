namespace SushiZume.DTOs;

public record OrderProductDto(
    int Quantity,
    OrderDto Order,
    ProductDto Product
);