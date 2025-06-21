using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

namespace SushiZume.Repositories;

public class UserRepository(SushiContext context) : Repository<User>(context), IUserRepository
{
}