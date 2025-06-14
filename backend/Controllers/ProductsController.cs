using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SushiZume.DTOs;
using SushiZume.Services;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(ProductService productService, Mapper mapper) : ControllerBase
{
    // GET: api/<ProductsController.cs>
    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetProductsAsync()
    {
        var all = await productService.GetAllProductsAsync();
        var dtos = mapper.Map<List<ProductDto>>(all);
        return Ok(dtos);
    }
}