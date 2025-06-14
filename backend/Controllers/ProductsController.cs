using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Services;
using SushiZume.Services.Interfaces;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IProductService productService, IMapper mapper) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetProducts()
    {
        var all = await productService.GetAllAsync();
        return Ok(mapper.Map<List<ProductDto>>(all));
    }

    [HttpGet("/available")]
    public async Task<ActionResult<List<ProductDto>>> GetAvailableProducts()
    {
        var all = await productService.GetAllAvailableAsync();
        return mapper.Map<List<ProductDto>>(all);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> AddProduct(ProductPostDto dto)
    {
        var product = await productService.AddAsync(dto);
        return mapper.Map<ProductDto>(product);
    }
}