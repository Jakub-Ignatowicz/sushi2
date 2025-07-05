using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Models;

namespace SushiZume.Repositories.Interfaces;

public class UserRepository(SushiContext context) : Repository<User>(context), IUserRepository
{
    public Task<User?> GetByRefreshTokenAsync(string refreshToken, CancellationToken cancellationToken) =>
        DefaultQuery.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken, cancellationToken);
}