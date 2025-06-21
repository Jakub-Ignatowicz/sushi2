namespace SushiZume.DTOs;

public record ChangePasswordDto(
    string OldPassword,
    string NewPassword,
    string ConfirmNewPassword
);