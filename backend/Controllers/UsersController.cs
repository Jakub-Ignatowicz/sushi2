using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using SushiZume.DTOs;
using SushiZume.Services;
using SushiZume.Services.Interfaces;
using SushiZume.Validators;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(IUserService userService, IValidator<UserPostDto> validator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Guid>> CreateUser([FromBody] UserPostDto dto)
    {
        await validator.ValidateAndThrowAsync(dto);

        var id = await userService.AddAsync(dto);
        return Ok(id);
    }
}