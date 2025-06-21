using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

namespace SushiZume.Repositories;

public class AddressRepository(SushiContext context) : Repository<Address>(context), IAddressRepository
{
    public async Task<List<Address>> GetByUserIdAsync(Guid userId)
    {
        return await DefaultQuery
            .Where(a => a.UserId == userId)
            .ToListAsync();
    }
}