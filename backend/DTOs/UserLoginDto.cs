namespace SushiZume.DTOs;

public record UserLoginDto(
    string Email,
    string Password
);