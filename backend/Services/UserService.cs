using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SushiZume.Data;
using SushiZume.DTOs;
using SushiZume.Enums;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

public class UserService(
    IMapper mapper,
    SushiContext context,
    IUserRepository userRepo,
    IOrderRepository orderRepo,
    IAddressRepository addressRepo,
    IRefreshTokenService refreshTokenService)
    : IUserService
{
    public async Task<Guid> AddAsync(UserPostDto dto, CancellationToken cancellationToken)
    {
        var user = mapper.Map<User>(dto);

        if (user.Email != null && await DoesEmailExistAsync(user.Email, cancellationToken))
            throw new InvalidOperationException($"Email {user.Email} is already in use.");

        await userRepo.AddAsync(user, cancellationToken);
        await userRepo.SaveChangesAsync(cancellationToken);

        return user.Id;
    }

    public async Task<User> TryGetByIdAsync(Guid userId, CancellationToken cancellationToken)
    {
        var user = await userRepo.GetByIdAsync(userId, cancellationToken);
        if (user == null)
            throw new KeyNotFoundException($"User with ID {userId} not found.");
        return user;
    }

    public async Task<User> TryGetByEmailAsync(string email, CancellationToken cancellationToken)
    {
        var user = await userRepo.GetByEmailAsync(email, cancellationToken);
        if (user == null)
            throw new KeyNotFoundException($"User with email {email} not found or is not a normal user.");
        return user;
    }

    public async Task<List<User>> GetAllAsync(CancellationToken cancellationToken)
    {
        var users = await userRepo.GetAllAsync(cancellationToken);
        return users;
    }

    public async Task<List<Order>> GetOrdersAsync(Guid userId, CancellationToken cancellationToken)
    {
        var orders = await orderRepo.GetByUserIdAsync(userId, cancellationToken);
        return orders;
    }

    public async Task<List<Address>> GetAddressesAsync(Guid userId, CancellationToken cancellationToken)
    {
        var addresses = await addressRepo.GetByUserIdAsync(userId, cancellationToken);
        return addresses;
    }

    private static bool VerifyPassword(User user, string password)
    {
        return !string.IsNullOrEmpty(user.PasswordHash) && BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
    }

    public async Task ResetPasswordAsync(Guid tokenId, UserResetPasswordDto dto, CancellationToken cancellationToken)
    {
        var token = await GetPasswordResetTokenAsync(tokenId, cancellationToken);

        if (token == null || token.IsExpired)
            throw new UnauthorizedAccessException("Invalid or expired password reset token.");

        var user = await TryGetByIdAsync(token.UserId, cancellationToken);

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        await userRepo.SaveChangesAsync(cancellationToken);

        await refreshTokenService.RevokeAllActiveTokensAsync(user.Id, cancellationToken);
    }

    public async Task ChangePasswordAsync(Guid userId, UserChangePasswordDto dto, CancellationToken cancellationToken)
    {
        var user = await TryGetByIdAsync(userId, cancellationToken);

        if (!VerifyPassword(user, dto.OldPassword))
            throw new UnauthorizedAccessException("Old password is incorrect.");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        await userRepo.SaveChangesAsync(cancellationToken);
    }

    public async Task<Guid> AddAddressAsync(Guid userId, AddressPostDto dto, CancellationToken cancellationToken)
    {
        var address = mapper.Map<Address>(dto);
        address.UserId = userId;

        await addressRepo.AddAsync(address, cancellationToken);

        return address.Id;
    }

    public async Task DeleteAddressAsync(Guid userId, Guid addressId, CancellationToken cancellationToken)
    {
        var address = await addressRepo.GetByIdAsync(addressId, cancellationToken);

        if (address == null || address.UserId != userId)
            throw new KeyNotFoundException($"Address with ID {addressId} not found for user {userId}.");

        addressRepo.Delete(address);
        await addressRepo.SaveChangesAsync(cancellationToken);
    }

    public async Task<User?> AuthenticateAsync(string email, string password, CancellationToken cancellationToken)
    {
        var user = await userRepo.GetByEmailAsync(email, cancellationToken);

        if (user == null)
            return null;

        if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            return null;

        return await TryGetByIdAsync(user.Id, cancellationToken);
    }

    public async Task<User> TryAuthenticateAsync(string email, string password, CancellationToken cancellationToken)
    {
        var user = await AuthenticateAsync(email, password, cancellationToken);
        if (user == null)
            throw new UnauthorizedAccessException("Invalid email or password.");
        return user;
    }

    public Task<bool> DoesEmailExistAsync(string email, CancellationToken cancellationToken)
    {
        return context.Users.AnyAsync(u => u.Email == email && u.Type == UserType.Regular, cancellationToken);
    }

    public async Task GeneratePasswordResetToken(string email, CancellationToken cancellationToken)
    {
        var user = await userRepo.GetByEmailAsync(email);

        if (user == null)
            throw new KeyNotFoundException($"User with email {email} not found.");

        var resetToken = new PasswordResetToken
        {
            ExpiryDate = DateTime.UtcNow.AddMinutes(15),
            UserId = user.Id
        };

        context.PasswordResetTokens.Add(resetToken);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<PasswordResetToken?> GetPasswordResetTokenAsync(Guid tokenId, CancellationToken cancellationToken)
    {
        return await context.PasswordResetTokens
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == tokenId, cancellationToken);
    }
}