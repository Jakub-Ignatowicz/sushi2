using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using SushiZume.DTOs;
using SushiZume.Services.Interfaces;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(
    IUserService userService,
    IValidator<UserPostDto> validator,
    IMapper mapper,
    IValidator<AddressPostDto> addressValidator,
    IValidator<ChangePasswordDto> changePasswordValidator)
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

    [HttpGet("{userId:guid}/orders")]
    public async Task<ActionResult<List<OrderDto>>> GetUserOrders(Guid userId)
    {
        var orders = await userService.GetOrdersAsync(userId);
        return mapper.Map<List<OrderDto>>(orders);
    }


    [HttpGet("{userId:guid}/addresses")]
    public async Task<ActionResult<List<AddressDto>>> GetUserAddresses(Guid userId)
    {
        var addresses = await userService.GetAddressesAsync(userId);
        return mapper.Map<List<AddressDto>>(addresses);
    }

    [HttpPost("{userId:guid}/addresses")]
    public async Task<ActionResult<Guid>> AddAddress(Guid userId, [FromBody] AddressPostDto dto)
    {
        await addressValidator.ValidateAndThrowAsync(dto);

        var addressId = await userService.AddAddressAsync(userId, dto);
        return Ok(addressId);
    }

    [HttpDelete("{userId:guid}/addresses/{addressId:guid}")]
    public async Task<ActionResult> DeleteAddress(Guid userId, Guid addressId)
    {
        await userService.DeleteAddressAsync(userId, addressId);
        return NoContent();
    }

    [HttpPost("{userId:guid}/password")]
    public async Task<ActionResult> ChangePassword(Guid userId, [FromBody] ChangePasswordDto dto)
    {
        await changePasswordValidator.ValidateAndThrowAsync(dto);

        await userService.ChangePasswordAsync(userId, dto);
        return NoContent();
    }
}