using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SushiZume.Data;
using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

public class UserService(
    IMapper mapper,
    SushiContext context,
    IUserRepository userRepo,
    IOrderRepository orderRepo,
    IAddressRepository addressRepo)
    : IUserService
{
    public async Task<Guid> AddAsync(UserPostDto dto)
    {
        var user = mapper.Map<User>(dto);

        if (user.Email != null && await DoesEmailExistAsync(user.Email))
            throw new InvalidOperationException($"Email {user.Email} is already in use.");

        await userRepo.AddAsync(user);
        await userRepo.SaveChangesAsync();

        return user.Id;
    }

    public async Task<User> GetByIdAsync(Guid userId)
    {
        var user = await userRepo.GetByIdAsync(userId);
        if (user == null)
            throw new KeyNotFoundException($"User with ID {userId} not found.");
        return user;
    }

    public async Task<List<User>> GetAllAsync()
    {
        var users = await userRepo.GetAllAsync();
        return users;
    }

    public async Task<List<Order>> GetOrdersAsync(Guid userId)
    {
        var orders = await orderRepo.GetByUserIdAsync(userId);
        return orders;
    }

    public async Task<List<Address>> GetAddressesAsync(Guid userId)
    {
        var addresses = await addressRepo.GetByUserIdAsync(userId);
        return addresses;
    }

    private static bool VerifyPassword(User user, string password)
    {
        return !string.IsNullOrEmpty(user.PasswordHash) && BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
    }

    public async Task ResetPasswordAsync(Guid tokenId, UserResetPasswordDto dto)
    {
        var token = await GetPasswordResetTokenAsync(tokenId);

        if (token == null || token.ExpiryDate < DateTime.UtcNow)
            throw new UnauthorizedAccessException("Invalid or expired password reset token.");

        var user = await GetByIdAsync(token.UserId);

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        await userRepo.SaveChangesAsync();
    }

    public async Task ChangePasswordAsync(Guid userId, UserChangePasswordDto dto)
    {
        var user = await GetByIdAsync(userId);

        if (!VerifyPassword(user, dto.OldPassword))
            throw new UnauthorizedAccessException("Old password is incorrect.");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        await userRepo.SaveChangesAsync();
    }

    public async Task<Guid> AddAddressAsync(Guid userId, AddressPostDto dto)
    {
        var address = mapper.Map<Address>(dto);
        address.UserId = userId;

        await addressRepo.AddAsync(address);

        return address.Id;
    }

    public async Task DeleteAddressAsync(Guid userId, Guid addressId)
    {
        var address = await addressRepo.GetByIdAsync(addressId);

        if (address == null || address.UserId != userId)
            throw new KeyNotFoundException($"Address with ID {addressId} not found for user {userId}.");

        addressRepo.Delete(address);
        await addressRepo.SaveChangesAsync();
    }

    public async Task<User?> Authenticate(string email, string password)
    {
        var user = await context.Users.SingleOrDefaultAsync(u => u.Email == email);

        if (user == null || user.IsGuest)
            return null;

        if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            return null;

        return await GetByIdAsync(user.Id);
    }

    public async Task<bool> DoesEmailExistAsync(string email)
    {
        return await context.Users.AnyAsync(u => u.Email == email && !u.IsGuest);
    }

    public async Task GeneratePasswordResetToken(string email)
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
        await context.SaveChangesAsync();
    }

    public async Task<PasswordResetToken?> GetPasswordResetTokenAsync(Guid tokenId)
    {
        return await context.PasswordResetTokens
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == tokenId);
    }
}