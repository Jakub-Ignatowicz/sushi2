using SushiZume.Models;

namespace SushiZume.DTOs;

public record OrderPostDto(
    string Email,
    string PhoneNumber,
    int PeopleCount,
    string Notes,
    OrderPaymentMethod PaymentMethod,
    AddressPostDto Address,
    List<OrderProductPostDto> OrderProducts
);