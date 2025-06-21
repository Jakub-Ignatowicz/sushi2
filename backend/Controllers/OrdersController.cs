using AutoMapper;
using FluentValidation;
using SushiZume.DTOs;
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
    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrdersWithPagination(int page = 1, int pageSize = 10)
    {
        var orders = await orderService.GetWithPaginationAsync(page, pageSize);
        return Ok(mapper.Map<List<OrderDto>>(orders));
    }

    [HttpGet("{orderId:guid}")]
    public async Task<ActionResult<OrderDto>> GetOrderById(Guid orderId)
    {
        var order = await orderService.GetByIdAsync(orderId);
        return Ok(mapper.Map<OrderDto>(order));
    }

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

    [HttpPost("{orderId:guid}/seen")]
    public async Task<ActionResult<bool>> MarkAsSeen(Guid orderId)
    {
        var order = await orderService.MarkAsSeenAsync(orderId);
        return Ok(order);
    }

    [HttpPost("{orderId:guid}/resolved")]
    public async Task<ActionResult<bool>> MarkAsResolved(Guid orderId)
    {
        var order = await orderService.MarkAsResolvedAsync(orderId);
        return Ok(order);
    }
}