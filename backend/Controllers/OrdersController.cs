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

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class OrdersController(
    IOrderService orderService,
    IMapper mapper,
    IValidator<Order> orderValidator,
    IValidator<Address> addressValidator,
    IOrderRepository orderRepository)
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
        var orders = await orderRepository.GetAllNewAsync(cancellationToken);
        return Ok(mapper.Map<List<OrderDto>>(orders));
    }

    [HttpGet("in-progress")]
    public async Task<IActionResult> GetInProgressOrders(CancellationToken cancellationToken)
    {
        var orders = await orderRepository.GetAllInProgressAsync(cancellationToken);
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
        var order = await orderService.AddAsync(dto, cancellationToken);
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