using Microsoft.AspNetCore.Mvc;
using SushiZume.DTOs;
using SushiZume.Services;
using SushiZume.Services.Interfaces;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(IUserService userService) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Guid>> CreateUser([FromBody] UserPostDto dto)
    {
        var id = await userService.AddAsync(dto);
        return id;
    }
}