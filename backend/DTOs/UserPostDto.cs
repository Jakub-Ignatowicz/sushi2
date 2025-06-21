using SushiZume.Enums;
using SushiZume.Models;

namespace SushiZume.DTOs;

public record UserPostDto_User(
    string Email,
    string Password,
    string FirstName,
    string LastName,
    string PhoneNumber
);

public record UserPostDto_Guest(
    string PhoneNumber,
    string Email
);

public record UserPostDto(
    UserPostDto_Guest? Guest,
    UserPostDto_User? User
);