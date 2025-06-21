using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Services.Interfaces;

public interface IUserService
{
    Task<Guid> AddAsync(UserPostDto dto);
    Task<User> GetByIdAsync(Guid userId);
    Task<List<User>> GetAllAsync();
    Task<List<Order>> GetOrdersAsync(Guid userId);
    Task<List<Address>> GetAddressesAsync(Guid userId);
    Task ChangePasswordAsync(Guid userId, ChangePasswordDto dto);
    Task<Guid> AddAddressAsync(Guid userId, AddressPostDto dto);
    Task DeleteAddressAsync(Guid userId, Guid addressId);
}