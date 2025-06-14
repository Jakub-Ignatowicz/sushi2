using AutoMapper;
using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Services.Interfaces;

namespace SushiZume.Controllers;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OrdersController(IOrderService orderService, IMapper mapper) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetOrdersWithPagination(int page = 1, int pageSize = 10)
    {
        var orders = await orderService.GetWithPaginationAsync(page, pageSize);
        return Ok(mapper.Map<List<OrderDto>>(orders));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(Guid id)
    {
        var order = await orderService.GetByIdAsync(id);
        return Ok(mapper.Map<OrderDto>(order));
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] OrderPostDto dto)
    {
        var createdOrder = await orderService.AddAsync(dto);

        var fresh = await orderService.GetByIdAsync(createdOrder.Id);
        return Ok(mapper.Map<OrderDto>(fresh));
    }

    [HttpGet("count")]
    public async Task<IActionResult> GetOrderCount()
    {
        var count = await orderService.GetCountAsync();
        return Ok(count);
    }

    [HttpPost("{id}/seen")]
    public async Task<IActionResult> MarkAsSeen(Guid id)
    {
        var order = await orderService.MarkAsNotNewAsync(id);
        return Ok(order);
    }
}