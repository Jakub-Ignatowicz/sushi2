using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using SushiZume.DTOs;
using SushiZume.Services.Interfaces;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IValidator<UserPostDto> validator, IUserService userService, IJwtService jwtService)
    : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<Guid>> Register([FromBody] UserPostDto dto)
    {
        await validator.ValidateAndThrowAsync(dto);

        var id = await userService.AddAsync(dto);
        return Ok(id);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
    {
        var user = await userService.Authenticate(dto.Email, dto.Password);

        if (user == null)
            return Unauthorized("Invalid email or password.");

        var token = jwtService.GenerateToken(user);
        return Ok(new { token });
    }
}