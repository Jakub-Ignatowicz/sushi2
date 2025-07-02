using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using SushiZume.DTOs;
using SushiZume.Enums;
using SushiZume.Models;
using SushiZume.Services.Interfaces;
using SushiZume.Validators;

namespace SushiZume.Controllers;

using Microsoft.AspNetCore.Mvc;
using SushiZume.Repositories.Interfaces;
using SushiZume.Services;

[Authorize(Roles = nameof(UserType.Admin))]
[ApiController]
[Route("api/[controller]")]
public class OrdersController(
    IOrderService orderService,
    IUserService userService,
    IMapper mapper,
    IValidator<OrderPostDto> validator,
    IValidator<AddressPostDto> addressValidator,
    IAddressRepository addressRepo,
    IOrderRepository orderRepo)
    : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetOrdersWithPagination(int page = 1, int pageSize = 10,
        CancellationToken cancellationToken = default)
    {
        var orders = await orderService.GetWithPaginationAsync(page, pageSize, cancellationToken);
        return Ok(mapper.Map<List<OrderDto>>(orders));
    }

    [HttpGet("new")]
    public async Task<IActionResult> GetNewOrders(CancellationToken cancellationToken)
    {
        var orders = await orderRepo.GetAllNewAsync(cancellationToken);
        return Ok(mapper.Map<List<OrderDto>>(orders));
    }

    [HttpGet("in-progress")]
    public async Task<IActionResult> GetInProgressOrders(CancellationToken cancellationToken)
    {
        var orders = await orderRepo.GetAllInProgressAsync(cancellationToken);
        return Ok(mapper.Map<List<OrderDto>>(orders));
    }


    [HttpGet("{orderId:guid}")]
    public async Task<IActionResult> GetOrderById(Guid orderId, CancellationToken cancellationToken)
    {
        var order = await orderService.GetByIdAsync(orderId, cancellationToken);
        return Ok(mapper.Map<OrderDto>(order));
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] OrderPostDto dto, CancellationToken cancellationToken)
    {
        await validator.ValidateAndThrowAsync(dto, cancellationToken);

        var order = await orderService.AddAsync(dto, cancellationToken);
        var created = await orderService.GetByIdAsync(order.Id, cancellationToken);
        return Ok(mapper.Map<OrderDto>(created));
    }

    [AllowAnonymous]
    [HttpPost("with-address")]
    public async Task<IActionResult> CreateOrderWithAddress([FromBody] OrderPostWithAddressDto dto,
        CancellationToken cancellationToken)
    {
        await addressValidator.ValidateAndThrowAsync(dto.Address, cancellationToken);

        var addressId = await userService.AddAddressAsync(dto.UserId, dto.Address, cancellationToken);

        var orderPostDto = new OrderPostDto(dto.PeopleCount, dto.Notes, dto.PaymentMethod, dto.UserId, addressId,
            dto.OrderProducts);
        await validator.ValidateAndThrowAsync(orderPostDto, cancellationToken);

        var order = await orderService.AddAsync(orderPostDto, cancellationToken);
        var created = await orderService.GetByIdAsync(order.Id, cancellationToken);
        return Ok(mapper.Map<OrderDto>(created));
    }

    [HttpGet("count")]
    public async Task<IActionResult> GetOrderCount(CancellationToken cancellationToken)
    {
        var count = await orderService.GetCountAsync(cancellationToken);
        return Ok(count);
    }

    [HttpPost("{orderId:guid}/status")]
    public async Task<IActionResult> ChangeOrderStatus(Guid orderId, [FromBody] ChangeOrderStatusDto dto,
        CancellationToken cancellationToken)
    {
        await orderService.ChangeStatusAsync(orderId, dto.Status, cancellationToken);
        return NoContent();
    }
}