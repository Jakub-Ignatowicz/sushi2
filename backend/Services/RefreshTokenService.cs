using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

public class RefreshTokenService(
    SushiContext context,
    IJwtService jwtService,
    IConfiguration config,
    IRefreshTokenRepository refreshTokenRepo)
    : IRefreshTokenService
{
    private readonly int _refreshExpiryDays = int.Parse(config["Jwt:RefreshExpiryDays"]!);

    public async Task MarkAsRevokedAsync(Guid tokenId)
    {
        await context.RefreshTokens
            .Where(rt => rt.Id == tokenId)
            .ExecuteUpdateAsync(u =>
                u.SetProperty(rt => rt.IsRevoked, true)
            );
    }

    public async Task<RefreshToken> TryGetByIdAsync(Guid tokenId)
    {
        var refreshToken = await refreshTokenRepo.GetByIdAsync(tokenId);
        if (refreshToken == null)
            throw new KeyNotFoundException("Refresh token not found.");
        return refreshToken;
    }

    public async Task<RefreshToken> TryGetByTokenAsync(string token)
    {
        var refreshToken = await refreshTokenRepo.GetByTokenAsync(token);
        if (refreshToken == null)
            throw new KeyNotFoundException("Refresh token not found.");
        return refreshToken;
    }

    public async Task ReplaceAsync(Guid tokenId, Guid newTokenId)
    {
        await context.RefreshTokens
            .Where(rt => rt.Id == tokenId)
            .ExecuteUpdateAsync(u =>
                u
                    .SetProperty(rt => rt.ReplacedByTokenId, newTokenId)
                    .SetProperty(rt => rt.IsRevoked, true)
            );
    }

    public async Task<Guid> CreateAndReplaceAsync(RefreshTokenPostDto dto, Guid oldTokenId)
    {
        var refreshTokenId = await CreateAsync(dto);
        await ReplaceAsync(oldTokenId, refreshTokenId);
        return refreshTokenId;
    }

    public async Task<Guid> CreateAsync(RefreshTokenPostDto dto)
    {
        var newToken = new RefreshToken
        {
            ExpiryDate = DateTime.UtcNow.AddDays(_refreshExpiryDays),
            Token = dto.RefreshToken,
            UserId = dto.UserId,
            UserAgent = dto.UserAgent,
            IpAddress = dto.IpAddress,
        };

        context.RefreshTokens.Add(newToken);
        await context.SaveChangesAsync();

        return newToken.Id;
    }

    public async Task RevokeAllActiveTokensAsync(Guid userId)
    {
        await context.RefreshTokens
            .Where(rt => rt.UserId == userId && rt.IsActive)
            .ExecuteUpdateAsync(u =>
                u.SetProperty(rt => rt.IsRevoked, true)
            );
    }
}