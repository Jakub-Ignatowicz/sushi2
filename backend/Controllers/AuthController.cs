using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SushiZume.Attributes;
using SushiZume.DTOs;
using SushiZume.Models;
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

    private async Task<(string, Guid)> IssueTokens(User user, string? ipAddress, string? userAgent)
    {
        var payload = jwtService.GeneratePayload(user);

        var refreshTokenPostDto = new RefreshTokenPostDto(
            payload.RefreshToken,
            userAgent ?? "",
            ipAddress ?? "",
            user.Id
        );

        var tokenId = await refreshTokenService.CreateAsync(refreshTokenPostDto);
        var createdToken = await refreshTokenService.TryGetByIdAsync(tokenId);

        Response.Cookies.Append("refreshToken", createdToken.Token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = createdToken.ExpiryDate
        });

        return (payload.AccessToken, tokenId);
    }

    [HttpPost("login")]
    public async Task<ActionResult<TokenDto>> Login([FromBody] UserLoginDto dto)
    {
        var user = await userService.TryAuthenticate(dto.Email, dto.Password);

        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        var userAgent = Request.Headers.UserAgent.ToString();

        var token = await IssueTokens(
            user,
            ipAddress,
            userAgent
        );

        return Ok(new { token });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var refreshToken = Request.Cookies["refreshToken"];
        if (string.IsNullOrEmpty(refreshToken))
            return NoContent();

        var storedToken = await refreshTokenService.TryGetByTokenAsync(refreshToken);
        if (!storedToken.IsExpired)
            return NoContent();

        await refreshTokenService.MarkAsRevokedAsync(storedToken.Id);

        return NoContent();
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"];
        if (string.IsNullOrEmpty(refreshToken))
            return Unauthorized("No refresh token provided.");

        var storedToken = await refreshTokenService.TryGetByTokenAsync(refreshToken);
        if (!storedToken.IsActive)
            return Unauthorized("Refresh token is not active or has been revoked.");

        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        var userAgent = Request.Headers.UserAgent.ToString();

        var (token, createdTokenId) = await IssueTokens(
            storedToken.User,
            ipAddress,
            userAgent
        );

        await refreshTokenService.ReplaceAsync(storedToken.Id, createdTokenId);

        return Ok(new { token });
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