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
    public async Task<ActionResult<List<OrderDto>>> GetOrdersWithPagination(int page = 1, int pageSize = 10)
    {
        var orders = await orderService.GetWithPaginationAsync(page, pageSize);
        return Ok(mapper.Map<List<OrderDto>>(orders));
    }

    [HttpGet("new")]
    public async Task<IActionResult> GetNewOrders()
    {
        var orders = await orderRepo.GetAllNewAsync();
        return Ok(mapper.Map<List<OrderDto>>(orders));
    }

    [HttpGet("in-progress")]
    public async Task<IActionResult> GetInProgressOrders()
    {
        var orders = await orderRepo.GetAllInProgressAsync();
        return Ok(mapper.Map<List<OrderDto>>(orders));
    }


    [HttpGet("{orderId:guid}")]
    public async Task<ActionResult<OrderDto>> GetOrderById(Guid orderId)
    {
        var order = await orderService.GetByIdAsync(orderId);
        return Ok(mapper.Map<OrderDto>(order));
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] OrderPostDto dto)
    {
        await validator.ValidateAndThrowAsync(dto);

        var order = await orderService.AddAsync(dto);
        var created = await orderService.GetByIdAsync(order.Id);
        return Ok(mapper.Map<OrderDto>(created));
    }

    [AllowAnonymous]
    [HttpPost("with-address")]
    public async Task<IActionResult> CreateOrderWithAddress([FromBody] OrderPostWithAddressDto dto)
    {
        await addressValidator.ValidateAndThrowAsync(dto.Address);

        var addressId = await userService.AddAddressAsync(dto.UserId, dto.Address);

        var orderPostDto = new OrderPostDto(dto.PeopleCount, dto.Notes, dto.PaymentMethod, dto.UserId, addressId, dto.OrderProducts);
        await validator.ValidateAndThrowAsync(orderPostDto);

        Console.WriteLine("cwel4");

        var order = await orderService.AddAsync(orderPostDto);
        var created = await orderService.GetByIdAsync(order.Id);
        return Ok(mapper.Map<OrderDto>(created));
    }

    [HttpGet("count")]
    public async Task<ActionResult<int>> GetOrderCount()
    {
        var count = await orderService.GetCountAsync();
        return Ok(count);
    }

    [HttpPost("{orderId:guid}/status")]
    public async Task<IActionResult> ChangeOrderStatus(Guid orderId, [FromBody] ChangeOrderStatusDto dto)
    {
        await orderService.ChangeStatusAsync(orderId, dto.Status);
        return NoContent();
    }
}
