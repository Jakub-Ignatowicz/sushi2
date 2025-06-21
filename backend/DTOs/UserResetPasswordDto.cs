namespace SushiZume.DTOs;

public record UserResetPasswordDto(
    string Password,
    string ConfirmPassword
);