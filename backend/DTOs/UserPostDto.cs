using SushiZume.Enums;
using SushiZume.Models;

namespace SushiZume.DTOs;

public record UserPostDto_Normal(
    string Password,
    string ConfirmPassword,
    string FirstName,
    string LastName,
    string PhoneNumber,
    string Email
);

public record UserPostDto_Guest(
    string PhoneNumber,
    string Email
);

public record UserPostDto(
    UserPostDto_Guest? Guest,
    UserPostDto_Normal? Normal
);