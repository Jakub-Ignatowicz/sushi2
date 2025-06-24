namespace SushiZume.DTOs;

public record RefreshTokenPostDto(
    string RefreshToken,
    string UserAgent,
    string? IpAddress,
    Guid UserId
);