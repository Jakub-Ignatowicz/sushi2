using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;

namespace SushiZume.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ImagesController(IConfiguration config) : ControllerBase
{
    [HttpPost("upload")]
    public async Task<IActionResult> UploadImage(IFormFile image, CancellationToken cancellationToken)
    {
        if (image.Length == 0)
            return BadRequest("No file uploaded.");

        var allowedMimeTypes = new[] { "image/jpeg", "image/png", "image/gif" };
        if (!allowedMimeTypes.Contains(image.ContentType.ToLower()))
            return BadRequest("Unsupported file type.");

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
        var ext = Path.GetExtension(image.FileName).ToLower();
        if (!allowedExtensions.Contains(ext))
            return BadRequest("Invalid file extension.");

        if (image.Length > 5 * 1024 * 1024) // 5MB
            return BadRequest("File too large.");

        try
        {
            using var img = await Image.LoadAsync(image.OpenReadStream(), cancellationToken);
            if (img.Width < 100 || img.Height < 100)
                return BadRequest("Image dimensions too small.");
        }
        catch
        {
            return BadRequest("Invalid image file.");
        }

        var saveFolder = "wwwroot/images";
        // if (string.IsNullOrWhiteSpace(saveFolder))
        //     return StatusCode(500, "Image save path not configured.");

        if (!Path.IsPathRooted(saveFolder))
            saveFolder = Path.Combine(Directory.GetCurrentDirectory(), saveFolder);

        if (!Directory.Exists(saveFolder))
            Directory.CreateDirectory(saveFolder);

        var fileName = $"{Guid.NewGuid()}{ext}";
        var savePath = Path.Combine(saveFolder, fileName);

        await using var stream = new FileStream(savePath, FileMode.Create);
        await image.CopyToAsync(stream, cancellationToken);

        var baseUrl = config["ImageSettings:BaseUrl"]?.TrimEnd('/');
        var url = baseUrl != null ? $"{baseUrl}/{fileName}" : fileName;

        return Ok(new { fileName, url });
    }
}
