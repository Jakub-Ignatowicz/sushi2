using SushiZume.Models;

namespace SushiZume.Services.Interfaces;

public interface ITokenService
{
    (string jwtToken, DateTime expiresAt) GenerateAccessToken(User user);
    string GenerateRefreshToken();
    void WriteAuthTokenAsHttpOnlyCookie(string cookieName, string token, DateTime expiration);
}