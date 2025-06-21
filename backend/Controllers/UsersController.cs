using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using SushiZume.DTOs;
using SushiZume.Services;
using SushiZume.Services.Interfaces;
using SushiZume.Validators;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(IUserService userService, IValidator<UserPostDto> validator, IMapper mapper)
    : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Guid>> CreateUser([FromBody] UserPostDto dto)
    {
        await validator.ValidateAndThrowAsync(dto);

        var id = await userService.AddAsync(dto);
        return Ok(id);
    }

    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetUsers()
    {
        var users = await userService.GetAllAsync();
        return mapper.Map<List<UserDto>>(users);
    }

    [HttpGet("{userId:guid}")]
    public async Task<ActionResult<UserDto>> GetUserById(Guid userId)
    {
        var user = await userService.GetByIdAsync(userId);
        return mapper.Map<UserDto>(user);
    }
}