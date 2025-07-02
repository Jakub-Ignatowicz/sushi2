using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SushiZume.Attributes;
using SushiZume.DTOs;
using SushiZume.Extensions;
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
    IRefreshTokenService refreshTokenService,
    IMapper mapper)
    : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserPostDto dto, CancellationToken cancellationToken)
    {
        await validator.ValidateAndThrowAsync(dto, cancellationToken);

        var id = await userService.AddAsync(dto, cancellationToken);
        return Ok(id);
    }

    private async Task<(string, Guid)> IssueTokens(User user, string? ipAddress, string? userAgent,
        CancellationToken cancellationToken)
    {
        var payload = jwtService.GeneratePayload(user);

        var refreshTokenPostDto = new RefreshTokenPostDto(
            payload.RefreshToken,
            userAgent ?? "",
            ipAddress ?? "",
            user.Id
        );

        var tokenId = await refreshTokenService.CreateAsync(refreshTokenPostDto, cancellationToken);
        var createdToken = await refreshTokenService.TryGetByIdAsync(tokenId, cancellationToken);

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
    public async Task<IActionResult> Login([FromBody] UserLoginDto dto, CancellationToken cancellationToken)
    {
        var user = await userService.TryAuthenticateAsync(dto.Email, dto.Password, cancellationToken);

        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        var userAgent = Request.Headers.UserAgent.ToString();

        var (token, _) = await IssueTokens(
            user,
            ipAddress,
            userAgent,
            cancellationToken
        );


        return Ok(new { token });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout(CancellationToken cancellationToken)
    {
        var refreshToken = Request.Cookies["refreshToken"];
        if (string.IsNullOrEmpty(refreshToken))
            return NoContent();

        var storedToken = await refreshTokenService.TryGetByTokenAsync(refreshToken, cancellationToken);
        if (!storedToken.IsExpired)
            return NoContent();

        await refreshTokenService.MarkAsRevokedAsync(storedToken.Id, cancellationToken);

        return NoContent();
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken(CancellationToken cancellationToken)
    {
        var refreshToken = Request.Cookies["refreshToken"];
        if (string.IsNullOrEmpty(refreshToken))
            return Unauthorized("No refresh token provided.");

        var storedToken = await refreshTokenService.TryGetByTokenAsync(refreshToken, cancellationToken);
        if (!storedToken.IsActive)
            return Unauthorized("Refresh token is not active or has been revoked.");

        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        var userAgent = Request.Headers.UserAgent.ToString();

        var (token, createdTokenId) = await IssueTokens(
            storedToken.User,
            ipAddress,
            userAgent,
            cancellationToken
        );

        await refreshTokenService.ReplaceAsync(storedToken.Id, createdTokenId, cancellationToken);

        return Ok(new { token });
    }

    [HttpPost("reset-password/request")]
    public async Task<IActionResult> RequestPasswordReset([FromBody] UserResetPasswordRequestDto dto,
        CancellationToken cancellationToken)
    {
        await userService.GeneratePasswordResetToken(dto.Email, cancellationToken);
        return NoContent();
    }

    [HttpPost("reset-password/{tokenId:guid}")]
    public async Task<IActionResult> ResetPassword(Guid tokenId, [FromBody] UserResetPasswordDto dto,
        CancellationToken cancellationToken)
    {
        await resetPasswordValidator.ValidateAndThrowAsync(dto, cancellationToken);

        await userService.ResetPasswordAsync(tokenId, dto, cancellationToken);
        return NoContent();
    }

    [Authorize]
    [SameUserOnly]
    [HttpPost("change-password/{userId:guid}")]
    public async Task<IActionResult> ChangePassword(Guid userId, [FromBody] UserChangePasswordDto dto,
        CancellationToken cancellationToken)
    {
        await changePasswordValidator.ValidateAndThrowAsync(dto, cancellationToken);

        await userService.ChangePasswordAsync(userId, dto, cancellationToken);
        return NoContent();
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser(CancellationToken cancellationToken)
    {
        var userId = User.RequireUserId();

        var user = await userService.TryGetByIdAsync(userId, cancellationToken);
        return Ok(mapper.Map<UserDto>(user));
    }
}