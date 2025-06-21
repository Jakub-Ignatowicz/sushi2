using SushiZume.Models;

namespace SushiZume.Services.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
}