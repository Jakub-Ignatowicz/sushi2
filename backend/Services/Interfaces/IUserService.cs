using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Services.Interfaces;

public interface IUserService
{
    Task<Guid> AddAsync(UserPostDto dto);
    Task<User> GetByIdAsync(Guid userId);
    Task<List<User>> GetAllAsync();
}