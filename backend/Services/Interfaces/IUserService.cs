using SushiZume.DTOs;

namespace SushiZume.Services.Interfaces;

public interface IUserService
{
    Task<Guid> AddAsync(UserPostDto dto);
}