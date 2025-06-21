using AutoMapper;
using Newtonsoft.Json;
using SushiZume.Data;
using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

public class UserService(IMapper mapper, SushiContext context, IUserRepository userRepo) : IUserService
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
}