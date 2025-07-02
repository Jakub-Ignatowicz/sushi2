using SushiZume.Services.Interfaces;

namespace SushiZume.Services;

public class ImageService : IImageService
{
    private readonly string _imageFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

    public async Task<string> Upload(IFormFile image)
    {
        if (image.Length == 0)
            throw new ArgumentException("Image file is empty.", nameof(image));

        Directory.CreateDirectory(_imageFolder);

        var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
        var filePath = Path.Combine(_imageFolder, fileName);

        await using var stream = new FileStream(filePath, FileMode.Create);
        await image.CopyToAsync(stream);

        return fileName;
    }
}