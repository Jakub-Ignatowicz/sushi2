using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SushiZume.Attributes;
using SushiZume.DTOs;
using SushiZume.Services.Interfaces;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(
    IValidator<UserPostDto> validator,
    IUserService userService,
    IJwtService jwtService,
    IValidator<UserChangePasswordDto> changePasswordValidator,
    IValidator<UserResetPasswordDto> resetPasswordValidator
)
    : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<Guid>> Register([FromBody] UserPostDto dto)
    {
        await validator.ValidateAndThrowAsync(dto);

        var id = await userService.AddAsync(dto);
        return Ok(id);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
    {
        var user = await userService.Authenticate(dto.Email, dto.Password);

        if (user == null)
            return Unauthorized("Invalid email or password.");

        var token = jwtService.GenerateToken(user);
        return Ok(new { token });
    }

    // [HttpPost("refresh")]
    // public IActionResult RefreshToken([FromBody] TokenRefreshDto dto)
    // {
    //     var newToken = jwtService.RefreshToken(dto.Token);
    //     if (newToken == null)
    //         return Unauthorized("Invalid or expired token.");
    //
    //     return Ok(new { token = newToken });
    // }

    [HttpPost("reset-password/request")]
    public async Task<IActionResult> RequestPasswordReset([FromBody] UserResetPasswordRequestDto dto)
    {
        await userService.GeneratePasswordResetToken(dto.Email);
        return NoContent();
    }

    [HttpPost("reset-password/{tokenId:guid}")]
    public async Task<IActionResult> ResetPassword(Guid tokenId, [FromBody] UserResetPasswordDto dto)
    {
        await resetPasswordValidator.ValidateAndThrowAsync(dto);
        
        // var token = await userService.GetPasswordResetTokenAsync(tokenId);
        // if (token == null || token.Expiration < DateTime.UtcNow)
        //     return BadRequest("Invalid or expired password reset token.");

        await userService.ResetPasswordAsync(tokenId, dto);
        return NoContent();
    }

    [Authorize]
    [SameUserOnly]
    [HttpPost("change-password/{userId:guid}")]
    public async Task<ActionResult> ChangePassword(Guid userId, [FromBody] UserChangePasswordDto dto)
    {
        await changePasswordValidator.ValidateAndThrowAsync(dto);

        await userService.ChangePasswordAsync(userId, dto);
        return NoContent();
    }
}