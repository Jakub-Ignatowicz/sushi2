namespace SushiZume.DTOs;

public record LoginRequest(
    string Username,
    string Password
);