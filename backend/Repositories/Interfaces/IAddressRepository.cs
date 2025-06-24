using SushiZume.Models;

namespace SushiZume.Repositories.Interfaces;

public interface IAddressRepository : IRepository<Address>
{
    Task<List<Address>> GetByUserIdAsync(Guid userId);
}