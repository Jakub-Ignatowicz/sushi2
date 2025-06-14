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
        var dtos = mapper.Map<List<ProductDto>>(all);
        return Ok(dtos);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> AddProduct(ProductPostDto dto)
    {
        var product = await productService.AddAsync(dto);
        return mapper.Map<ProductDto>(product);
    }
}