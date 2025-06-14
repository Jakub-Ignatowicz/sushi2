namespace SushiZume.Controllers;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OrdersController(IOrderService orderService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var orders = await orderService.GetAllOrdersAsync();
        return Ok(orders);
    }

    [HttpGet("{id}/seen")]
    public async Task<IActionResult> MarkAsSeen(string id)
    {
        var order = await orderService.MarkAsNotNewAsync(id);
        return Ok(order);
    }
}