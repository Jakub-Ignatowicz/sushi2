using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Services.Interfaces;

public interface IProductService
{
    Task<List<Product>> GetAllAsync();
    Task<List<Product>> GetAllAvailableAsync();
    Task<Product> GetByIdAsync(Guid id);
    Task<Product> AddAsync(ProductPostDto dto);
}