using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Services.Interfaces;

public interface IRefreshTokenService
{
    Task MarkAsRevokedAsync(Guid tokenId, CancellationToken cancellationToken = default);
    Task<RefreshToken> TryGetByIdAsync(Guid tokenId, CancellationToken cancellationToken = default);
    Task<RefreshToken> TryGetByTokenAsync(string token, CancellationToken cancellationToken = default);
    Task ReplaceAsync(Guid tokenId, Guid newTokenId, CancellationToken cancellationToken = default);
    Task<Guid> CreateAsync(RefreshTokenPostDto dto, CancellationToken cancellationToken = default);

    Task<Guid> CreateAndReplaceAsync(RefreshTokenPostDto dto, Guid oldTokenId,
        CancellationToken cancellationToken = default);

    Task RevokeAllActiveTokensAsync(Guid userId, CancellationToken cancellationToken = default);
}