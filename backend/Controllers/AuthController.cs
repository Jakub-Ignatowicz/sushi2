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
    IValidator<UserResetPasswordDto> resetPasswordValidator,
    IRefreshTokenService refreshTokenService)
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
    public async Task<ActionResult<TokenDto>> Login([FromBody] UserLoginDto dto)
    {
        var user = await userService.TryAuthenticate(dto.Email, dto.Password);

        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        var userAgent = Request.Headers.UserAgent.ToString();

        var payload = jwtService.GeneratePayload(user);

        var refreshTokenPostDto = new RefreshTokenPostDto(
            payload.RefreshToken,
            userAgent,
            ipAddress,
            user.Id
        );

        await refreshTokenService.CreateAsync(refreshTokenPostDto);

        return Ok(payload);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] TokenDto dto)
    {
        var refreshToken = await refreshTokenService.TryGetByTokenAsync(dto.RefreshToken);

        if (!refreshToken.IsActive)
            return Unauthorized("Refresh token is not active or has been revoked.");

        var user = await userService.TryGetByIdAsync(refreshToken.UserId);

        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        var userAgent = Request.Headers.UserAgent.ToString();
        var newPayload = jwtService.GeneratePayload(user);

        var refreshTokenPostDto = new RefreshTokenPostDto(
            newPayload.RefreshToken,
            userAgent,
            ipAddress,
            user.Id
        );

        await refreshTokenService.CreateAndReplaceAsync(refreshTokenPostDto, refreshToken.Id);
        return Ok(newPayload);
    }

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