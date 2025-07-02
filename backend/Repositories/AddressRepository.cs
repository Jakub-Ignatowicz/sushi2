using Microsoft.EntityFrameworkCore;
using SushiZume.Data;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;

namespace SushiZume.Repositories;

public class AddressRepository(SushiContext context) : Repository<Address>(context), IAddressRepository
{
    public Task<List<Address>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return DefaultQuery
            .Where(a => a.UserId == userId)
            .ToListAsync(cancellationToken);
    }
}