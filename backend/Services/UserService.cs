using AutoMapper;
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

    public async Task ChangePasswordAsync(Guid userId, ChangePasswordDto dto)
    {
        var user = await GetByIdAsync(userId);

        if (user.IsGuest)
            throw new InvalidOperationException("Guest users cannot change their password.");

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
}