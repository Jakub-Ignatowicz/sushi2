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

[ApiController]
[Route("api/[controller]")]
public class OrdersController(IOrderService orderService, IMapper mapper, IValidator<OrderPostDto> validator)
    : ControllerBase
{
    [Authorize(Roles = nameof(UserRole.Admin))]
    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrdersWithPagination(int page = 1, int pageSize = 10)
    {
        var orders = await orderService.GetWithPaginationAsync(page, pageSize);
        return Ok(mapper.Map<List<OrderDto>>(orders));
    }

    [Authorize(Roles = nameof(UserRole.Admin))]
    [HttpGet("{orderId:guid}")]
    public async Task<ActionResult<OrderDto>> GetOrderById(Guid orderId)
    {
        var order = await orderService.GetByIdAsync(orderId);
        return Ok(mapper.Map<OrderDto>(order));
    }

    [Authorize(Roles = nameof(UserRole.Admin))]
    [HttpPost]
    public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] OrderPostDto dto)
    {
        await validator.ValidateAndThrowAsync(dto);

        var order = await orderService.AddAsync(dto);
        var created = await orderService.GetByIdAsync(order.Id);
        return mapper.Map<OrderDto>(created);
    }

    [HttpGet("count")]
    public async Task<ActionResult<int>> GetOrderCount()
    {
        var count = await orderService.GetCountAsync();
        return Ok(count);
    }

    [Authorize(Roles = nameof(UserRole.Admin))]
    [HttpPost("{orderId:guid}/seen")]
    public async Task<ActionResult<bool>> MarkAsSeen(Guid orderId)
    {
        var order = await orderService.MarkAsSeenAsync(orderId);
        return Ok(order);
    }

    [Authorize(Roles = nameof(UserRole.Admin))]
    [HttpPost("{orderId:guid}/resolved")]
    public async Task<ActionResult<bool>> MarkAsResolved(Guid orderId)
    {
        var order = await orderService.MarkAsResolvedAsync(orderId);
        return Ok(order);
    }
}