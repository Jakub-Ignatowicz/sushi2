using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

namespace SushiZume.Repositories;

public class RefreshTokenRepository(SushiContext context) : Repository<RefreshToken>(context), IRefreshTokenRepository
{
    public Task<RefreshToken?> GetByTokenAsync(string token)
    {
        return DefaultQuery
            .AsNoTracking()
            .FirstOrDefaultAsync(rt => rt.Token == token);
    }
}