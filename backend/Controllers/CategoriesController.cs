using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SushiZume.DTOs;
using SushiZume.Services.Interfaces;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(ICategoryService categoryService, IMapper mapper) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await categoryService.GetAllAsync();
        return Ok(categories);
    }
    //
    // [HttpGet("with-products")]
    // public async Task<IActionResult> GetCategoriesWithProducts()
    // {
    //     var categories = await categoryService.GetAllWithProductsAsync();
    //     return Ok(mapper.Map<List<CategoryWithProductsDto>>(categories));
    // }

    [HttpPost("order")]
    public async Task<IActionResult> OrderCategories([FromBody] List<string> categoryIds)
    {
        Console.WriteLine("123");
        await categoryService.OrderCategoriesAsync(categoryIds);
        return Ok();
    }
}