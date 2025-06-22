using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Enums;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

namespace SushiZume.Repositories;

public class UserRepository(SushiContext context) : Repository<User>(context), IUserRepository
{
    public Task<User?> GetByEmailAsync(string email)
    {
        return DefaultQuery
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email && u.Role == UserRole.Normal);
    }
}