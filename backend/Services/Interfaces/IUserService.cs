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
    Task ResetPasswordAsync(Guid tokenId, UserResetPasswordDto dto);
    Task ChangePasswordAsync(Guid userId, UserChangePasswordDto dto);
    Task<Guid> AddAddressAsync(Guid userId, AddressPostDto dto);
    Task DeleteAddressAsync(Guid userId, Guid addressId);
    Task<User?> Authenticate(string email, string password);
    Task<bool> DoesEmailExistAsync(string email);
    Task GeneratePasswordResetToken(string dtoEmail);
    Task<PasswordResetToken?> GetPasswordResetTokenAsync(Guid tokenId);
}