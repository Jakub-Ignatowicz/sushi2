using Microsoft.AspNetCore.Mvc;
using SushiZume.Services.Interfaces;

namespace SushiZume.Controllers;

public record ImageUploadRequest(IFormFile Image);

[ApiController]
[Route("api/[controller]")]
public class ImagesController(IImageService imageService, IProductService productService) : ControllerBase
{
    [HttpPost("upload")]
    public async Task<IActionResult> UploadImage(IFormFile image)
    {
        var fileName = await imageService.Upload(image);
        return Ok(fileName);
    }
}