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
    public async Task<ActionResult<List<ProductDto>>> GetProductsAsync()
    {
        var all = await productService.GetAllProductsAsync();
        var dtos = mapper.Map<List<ProductDto>>(all);
        return Ok(dtos);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> AddProductAsync(ProductPostDto dto)
    {
        // var product = mapper.Map<Product>(productDto);
        // await productService.AddProductAsync(product);
        // return CreatedAtAction(nameof(GetProductsAsync), new { id = product.Id }, mapper.Map<ProductDto>(product));
        var product = await productService.AddProductAsync(dto);
        return mapper.Map<ProductDto>(product);
    }
}