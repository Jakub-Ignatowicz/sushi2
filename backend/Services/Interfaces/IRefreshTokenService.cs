using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Services.Interfaces;

public interface IRefreshTokenService
{
    Task MarkAsRevokedAsync(Guid tokenId);
    Task<RefreshToken> TryGetByTokenAsync(string token);
    Task ReplaceAsync(Guid tokenId, Guid newTokenId);
    Task<Guid> CreateAsync(RefreshTokenPostDto dto);
    Task<Guid> CreateAndReplaceAsync(RefreshTokenPostDto dto, Guid oldTokenId);
    Task RevokeAllActiveTokensAsync(Guid userId);
}