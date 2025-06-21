using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

namespace SushiZume.Repositories;

public class UserRepository(SushiContext context) : Repository<User>(context), IUserRepository
{
    public Task<User?> GetByEmailAsync(string email)
    {
        return context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email && !u.IsGuest);
    }
}