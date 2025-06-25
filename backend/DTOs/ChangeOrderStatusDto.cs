using System.ComponentModel.DataAnnotations;
using SushiZume.Enums;

namespace SushiZume.DTOs;

public record ChangeOrderStatusDto(
    [EnumDataType(typeof(OrderStatus))] OrderStatus Status
);