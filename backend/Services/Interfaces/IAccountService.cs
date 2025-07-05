using Microsoft.AspNetCore.Identity.Data;
using LoginRequest = SushiZume.DTOs.LoginRequest;

namespace SushiZume.Services.Interfaces;

public interface IAccountService
{
    Task LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);
    Task RefreshTokenAsync(string? refreshToken, CancellationToken cancellationToken = default);
}