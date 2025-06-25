using SushiZume.Enums;

namespace SushiZume.DTOs;

public record OrderDto_OrderProductDto(
    int Quantity,
    ProductDto Product
);

public record OrderDto(
    Guid Id,
    int PeopleCount,
    string Notes,
    decimal TotalPrice,
    OrderPaymentMethod PaymentMethod,
    OrderStatus Status,
    UserDto User,
    DateTime CreatedAt,
    AddressDto Address,
    List<OrderDto_OrderProductDto> OrderProducts
);