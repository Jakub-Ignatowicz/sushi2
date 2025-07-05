using SushiZume.Models;

namespace SushiZume.Repositories.Interfaces;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByRefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default);
}