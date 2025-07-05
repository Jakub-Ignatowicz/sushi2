using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.Extensions.Options;
using SushiZume.Models;
using SushiZume.Options;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services.Interfaces;
using LoginRequest = SushiZume.DTOs.LoginRequest;

namespace SushiZume.Services;

public class AccountService(
    UserManager<User> userManager,
    ITokenService tokenService,
    IOptions<JwtOptions> jwtOptions,
    IUserRepository userRepository
)
    : IAccountService
{
    private readonly JwtOptions _jwtOptions = jwtOptions.Value;

    private async Task IssueTokensAsync(User user)
    {
        var (jwtToken, expiresAt) = tokenService.GenerateAccessToken(user);
        var refreshToken = tokenService.GenerateRefreshToken();

        var refreshTokenExpiresAt = DateTime.UtcNow.AddDays(_jwtOptions.RefreshExpiryDays);

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiresAtUtc = refreshTokenExpiresAt;
        await userManager.UpdateAsync(user);

        tokenService.WriteAuthTokenAsHttpOnlyCookie("ACCESS_TOKEN", jwtToken, expiresAt);
        tokenService.WriteAuthTokenAsHttpOnlyCookie("REFRESH_TOKEN", refreshToken, refreshTokenExpiresAt);
    }

    private void RevokeTokens()
    {
        tokenService.DeleteAuthTokenCookie("ACCESS_TOKEN");
        tokenService.DeleteAuthTokenCookie("REFRESH_TOKEN");
    }

    public async Task LoginAsync(LoginRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByNameAsync(request.Username);
        if (user == null || !await userManager.CheckPasswordAsync(user, request.Password))
        {
            throw new InvalidOperationException("Invalid email or password.");
        }

        await IssueTokensAsync(user);
    }

    public async Task RefreshTokenAsync(string? refreshToken, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(refreshToken))
        {
            throw new UnauthorizedAccessException("Refresh token is required.");
        }

        var user = await userRepository.GetByRefreshTokenAsync(refreshToken, cancellationToken);
        if (user == null)
        {
            RevokeTokens();
            throw new UnauthorizedAccessException("Refresh token not associated with any user.");
        }

        if (!user.RefreshTokenIsValid)
        {
            RevokeTokens();
            throw new UnauthorizedAccessException("Refresh token is invalid or expired.");
        }

        await IssueTokensAsync(user);
    }
}