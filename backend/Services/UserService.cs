using AutoMapper;
using Newtonsoft.Json;
using SushiZume.Data;
using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

public class UserService(IMapper mapper, SushiContext context) : IUserService
{
    public async Task<Guid> AddAsync(UserPostDto dto)
    {
        Console.WriteLine(JsonConvert.SerializeObject(dto, Formatting.Indented));
        var user = mapper.Map<User>(dto);
        Console.WriteLine(JsonConvert.SerializeObject(user, Formatting.Indented));
        // user.Validate();

        context.Users.Add(user);
        await context.SaveChangesAsync();


        return user.Id;
    }
}