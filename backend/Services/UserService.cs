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
        Console.WriteLine(JsonConvert.SerializeObject(user, Formatting.Indented));

        await userRepo.AddAsync(user);
        await userRepo.SaveChangesAsync();

        return user.Id;
    }
}