using SushiZume.Enums;
using SushiZume.Models;

namespace SushiZume.DTOs;

public record OrderPostWithAddressDto(
    int PeopleCount,
    string Notes,
    OrderPaymentMethod PaymentMethod,
    Guid UserId,
    AddressPostDto Address,
    List<OrderProductPostDto> OrderProducts);
