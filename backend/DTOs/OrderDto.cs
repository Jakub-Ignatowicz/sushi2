namespace SushiZume.DTOs;

public record OrderDtoOrderProductDto(
    int Quantity,
    ProductDto Product
);

public record OrderDto(
    Guid Id,
    string Email,
    string PhoneNumber,
    AddressDto Address,
    bool IsDone,
    bool IsNew,
    string Notes,
    DateTime CreatedAt,
    List<OrderDtoOrderProductDto> OrderProducts
);