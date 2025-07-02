using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Enums;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

namespace SushiZume.Repositories;

public class UserRepository(SushiContext context) : Repository<User>(context), IUserRepository
{
    public Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken)
    {
        return DefaultQuery
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email && u.Type == UserType.Regular, cancellationToken);
    }
}