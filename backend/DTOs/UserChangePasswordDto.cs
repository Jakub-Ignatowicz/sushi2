namespace SushiZume.DTOs;

public record UserChangePasswordDto(
    string OldPassword,
    string NewPassword,
    string ConfirmNewPassword
);