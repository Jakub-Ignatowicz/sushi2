namespace SushiZume.Services.Interfaces;

public interface IImageService
{
    Task<string> Upload(IFormFile image);
}