using SushiZume.Enums;

namespace SushiZume.DTOs;

public record UserDto(
    Guid Id,
    string? Email,
    string? PhoneNumber,
    string? FirstName,
    string? LastName,
    string? FullName,
    DateTime CreatedAt,
    UserRole Role
);