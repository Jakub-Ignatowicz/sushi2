using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Services.Interfaces;

public interface IUserService
{
    Task<Guid> AddAsync(UserPostDto dto, CancellationToken cancellationToken = default);
    Task<User> TryGetByIdAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<User> TryGetByEmailAsync(string email, CancellationToken cancellationToken = default);
    Task<List<User>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<List<Order>> GetOrdersAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<List<Address>> GetAddressesAsync(Guid userId, CancellationToken cancellationToken = default);
    Task ResetPasswordAsync(Guid tokenId, UserResetPasswordDto dto, CancellationToken cancellationToken = default);
    Task ChangePasswordAsync(Guid userId, UserChangePasswordDto dto, CancellationToken cancellationToken = default);
    Task<Guid> AddAddressAsync(Guid userId, AddressPostDto dto, CancellationToken cancellationToken = default);
    Task DeleteAddressAsync(Guid userId, Guid addressId, CancellationToken cancellationToken = default);
    Task<User?> AuthenticateAsync(string email, string password, CancellationToken cancellationToken = default);
    Task<User> TryAuthenticateAsync(string email, string password, CancellationToken cancellationToken = default);
    Task<bool> DoesEmailExistAsync(string email, CancellationToken cancellationToken = default);
    Task GeneratePasswordResetToken(string dtoEmail, CancellationToken cancellationToken = default);
    Task<PasswordResetToken?> GetPasswordResetTokenAsync(Guid tokenId, CancellationToken cancellationToken = default);
}