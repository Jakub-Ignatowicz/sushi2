using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SushiZume.Attributes;
using SushiZume.DTOs;
using SushiZume.Enums;
using SushiZume.Services.Interfaces;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(
    IUserService userService,
    IValidator<UserPostDto> validator,
    IMapper mapper,
    IValidator<AddressPostDto> addressValidator,
    IValidator<UserChangePasswordDto> changePasswordValidator)
    : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] UserPostDto dto, CancellationToken cancellationToken)
    {
        await validator.ValidateAndThrowAsync(dto, cancellationToken);

        var id = await userService.AddAsync(dto, cancellationToken);
        return Ok(id);
    }

    [Authorize(Roles = nameof(UserType.Admin))]
    [HttpGet]
    public async Task<IActionResult> GetUsers(CancellationToken cancellationToken)
    {
        var users = await userService.GetAllAsync(cancellationToken);
        return Ok(mapper.Map<List<UserDto>>(users));
    }

    [Authorize(Roles = nameof(UserType.Admin))]
    [HttpGet("{userId:guid}")]
    public async Task<IActionResult> GetUserById(Guid userId, CancellationToken cancellationToken)
    {
        var user = await userService.TryGetByIdAsync(userId, cancellationToken);
        return Ok(mapper.Map<UserDto>(user));
    }

    [Authorize]
    [SameUserOnly]
    [HttpGet("{userId:guid}/orders")]
    public async Task<IActionResult> GetUserOrders(Guid userId, CancellationToken cancellationToken)
    {
        var orders = await userService.GetOrdersAsync(userId, cancellationToken);
        return Ok(mapper.Map<List<OrderDto>>(orders));
    }

    [Authorize]
    [SameUserOnly]
    [HttpGet("{userId:guid}/addresses")]
    public async Task<IActionResult> GetUserAddresses(Guid userId, CancellationToken cancellationToken)
    {
        var addresses = await userService.GetAddressesAsync(userId);
        return Ok(mapper.Map<List<AddressDto>>(addresses));
    }

    [Authorize]
    [SameUserOnly]
    [HttpPost("{userId:guid}/addresses")]
    public async Task<ActionResult<Guid>> AddAddress(Guid userId, [FromBody] AddressPostDto dto,
        CancellationToken cancellationToken)
    {
        await addressValidator.ValidateAndThrowAsync(dto, cancellationToken);

        var addressId = await userService.AddAddressAsync(userId, dto, cancellationToken);
        return Ok(addressId);
    }

    [Authorize]
    [SameUserOnly]
    [HttpDelete("{userId:guid}/addresses/{addressId:guid}")]
    public async Task<IActionResult> DeleteAddress(Guid userId, Guid addressId, CancellationToken cancellationToken)
    {
        await userService.DeleteAddressAsync(userId, addressId, cancellationToken);
        return NoContent();
    }

    [Authorize]
    [SameUserOnly]
    [HttpPost("{userId:guid}/password")]
    public async Task<IActionResult> ChangePassword(Guid userId, [FromBody] UserChangePasswordDto dto,
        CancellationToken cancellationToken)
    {
        await changePasswordValidator.ValidateAndThrowAsync(dto, cancellationToken);

        await userService.ChangePasswordAsync(userId, dto, cancellationToken);
        return NoContent();
    }
}