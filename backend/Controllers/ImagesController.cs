using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SushiZume.Enums;
using SushiZume.Services.Interfaces;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImagesController(IImageService imageService, IProductService productService) : ControllerBase
{
    [Authorize(Roles = nameof(UserType.Admin))]
    [HttpPost("upload")]
    public async Task<IActionResult> UploadImage(IFormFile image, CancellationToken cancellationToken)
    {
        var fileName = await imageService.Upload(image);
        return Ok(fileName);
    }
}