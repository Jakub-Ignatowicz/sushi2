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

    public async Task MarkAsRevokedAsync(Guid tokenId, CancellationToken cancellationToken)
    {
        await context.RefreshTokens
            .Where(rt => rt.Id == tokenId)
            .ExecuteUpdateAsync(u =>
                    u.SetProperty(rt => rt.IsRevoked, true),
                cancellationToken
            );
    }

    public async Task<RefreshToken> TryGetByIdAsync(Guid tokenId, CancellationToken cancellationToken)
    {
        var refreshToken = await refreshTokenRepo.GetByIdAsync(tokenId, cancellationToken);
        if (refreshToken == null)
            throw new KeyNotFoundException("Refresh token not found.");
        return refreshToken;
    }

    public async Task<RefreshToken> TryGetByTokenAsync(string token, CancellationToken cancellationToken)
    {
        var refreshToken = await refreshTokenRepo.GetByTokenAsync(token, cancellationToken);
        if (refreshToken == null)
            throw new KeyNotFoundException("Refresh token not found.");
        return refreshToken;
    }

    public async Task ReplaceAsync(Guid tokenId, Guid newTokenId, CancellationToken cancellationToken)
    {
        await context.RefreshTokens
            .Where(rt => rt.Id == tokenId)
            .ExecuteUpdateAsync(u =>
                u
                    .SetProperty(rt => rt.ReplacedByTokenId, newTokenId)
                    .SetProperty(rt => rt.IsRevoked, true)
            );
    }

    public async Task<Guid> CreateAndReplaceAsync(RefreshTokenPostDto dto, Guid oldTokenId,
        CancellationToken cancellationToken)
    {
        var refreshTokenId = await CreateAsync(dto, cancellationToken);
        await ReplaceAsync(oldTokenId, refreshTokenId, cancellationToken);
        return refreshTokenId;
    }

    public async Task<Guid> CreateAsync(RefreshTokenPostDto dto, CancellationToken cancellationToken)
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
        await context.SaveChangesAsync(cancellationToken);

        return newToken.Id;
    }

    public async Task RevokeAllActiveTokensAsync(Guid userId, CancellationToken cancellationToken)
    {
        await context.RefreshTokens
            .Where(rt => rt.UserId == userId && rt.IsActive)
            .ExecuteUpdateAsync(u =>
                    u.SetProperty(rt => rt.IsRevoked, true),
                cancellationToken
            );
    }
}