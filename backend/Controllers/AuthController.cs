using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using SushiZume.Services.Interfaces;
using LoginRequest = SushiZume.DTOs.LoginRequest;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAccountService accountService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request, CancellationToken cancellationToken)
    {
        await accountService.LoginAsync(request, cancellationToken);
        return Ok();
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh(CancellationToken cancellationToken)
    {
        var refreshToken = Request.Cookies["REFRESH_TOKEN"];
        await accountService.RefreshTokenAsync(refreshToken, cancellationToken);
        return Ok();
    }

    [Authorize]
    [HttpPost("me")]
    public IActionResult Me(CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Ok();
    }
}