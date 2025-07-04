using SushiZume.Enums;

namespace SushiZume.DTOs;

public record OrderDto_OrderProductDto(
    int Quantity,
    ProductDto Product
);

public record OrderDto(
    Guid Id,
    int PeopleCount,
    string Email,
    string PhoneNumber,
    string Notes,
    decimal TotalCost,
    OrderPaymentMethod PaymentMethod,
    OrderStatus Status,
    DateTime CreatedAt,
    AddressDto Address,
    List<OrderDto_OrderProductDto> OrderProducts
);