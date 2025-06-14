namespace SushiZume.Controllers;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OrdersController(IOrderService orderService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetOrders(int page = 1, int pageSize = 10)
    {
        var orders = await orderService.GetOrdersAsync(page, pageSize);
        return Ok(orders);
    }

    [HttpGet("count")]
    public async Task<IActionResult> GetOrderCount()
    {
        var count = await orderService.GetOrderCountAsync();
        return Ok(count);
    }

    [HttpGet("{id}/seen")]
    public async Task<IActionResult> MarkAsSeen(string id)
    {
        var order = await orderService.MarkAsNotNewAsync(id);
        return Ok(order);
    }
}