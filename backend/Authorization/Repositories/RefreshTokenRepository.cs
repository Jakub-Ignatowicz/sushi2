using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

namespace SushiZume.Repositories;

public class RefreshTokenRepository(SushiContext context) : Repository<RefreshToken>(context), IRefreshTokenRepository
{
    protected override IQueryable<RefreshToken> DefaultQuery =>
        base.DefaultQuery
            .Include(rt => rt.User)
            .Include(rt => rt.ReplacedByToken);


    public Task<RefreshToken?> GetByTokenAsync(string token, CancellationToken cancellationToken)
    {
        return DefaultQuery
            .AsNoTracking()
            .FirstOrDefaultAsync(rt => rt.Token == token, cancellationToken);
    }
}