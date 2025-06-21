using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Services;
using SushiZume.Services.Interfaces;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(
    IProductService productService,
    IMapper mapper,
    IValidator<ProductItemPostDto> productItemValidator,
    IValidator<ProductUpdateDto> productUpdateValidator,
    IValidator<ProductPostDto> validator
) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetProducts()
    {
        var all = await productService.GetAllAsync();
        return mapper.Map<List<ProductDto>>(all);
    }

    [HttpGet("/available")]
    public async Task<ActionResult<List<ProductDto>>> GetAvailableProducts()
    {
        var all = await productService.GetAllAvailableAsync();
        return mapper.Map<List<ProductDto>>(all);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> CreateProduct(ProductPostDto dto)
    {
        await validator.ValidateAndThrowAsync(dto);

        var product = await productService.AddAsync(dto);
        var created = await productService.GetByIdAsync(product.Id);
        return mapper.Map<ProductDto>(created);
    }

    [HttpPost("{productId:guid}/available")]
    public async Task<ActionResult<ProductDto>> SetProductAvailable(Guid productId, [FromBody] bool available)
    {
        var product = await productService.SetAvailableAsync(productId, available);
        return mapper.Map<ProductDto>(product);
    }

    [HttpPost("{productId:guid}/visible")]
    public async Task<ActionResult<ProductDto>> SetProductVisible(Guid productId, [FromBody] bool visible)
    {
        var product = await productService.SetVisibleAsync(productId, visible);
        return mapper.Map<ProductDto>(product);
    }

    [HttpPost("{productId:guid}")]
    public async Task<ActionResult<ProductDto>> UpdateProduct(Guid productId, [FromBody] ProductUpdateDto dto)
    {
        await productUpdateValidator.ValidateAndThrowAsync(dto);

        var product = await productService.UpdateAsync(productId, dto);
        return mapper.Map<ProductDto>(product);
    }

    [HttpPost("{productId:guid}/items")]
    public async Task<ActionResult> AddProductItems(Guid productId, [FromBody] List<ProductItemPostDto> dtos)
    {
        await Task.WhenAll(dtos.Select(dto => productItemValidator.ValidateAndThrowAsync(dto)));

        await productService.AddItemsAsync(productId, dtos);
        return NoContent();
    }

    [HttpDelete("{productId:guid}/items")]
    public async Task<ActionResult> RemoveProductItems(Guid productId, [FromBody] List<Guid> itemIds)
    {
        await productService.RemoveItemsAsync(productId, itemIds);
        return NoContent();
    }

    [HttpPost("{productId:guid}/categories")]
    public async Task<ActionResult> AddProductCategories(Guid productId, [FromBody] List<Guid> categoryIds)
    {
        var result = await productService.AddCategoriesAsync(productId, categoryIds);
        return Ok(result);
    }

    [HttpDelete("{productId:guid}/categories")]
    public async Task<ActionResult> RemoveProductCategories(Guid productId, [FromBody] List<Guid> categoryIds)
    {
        var result = await productService.RemoveCategoriesAsync(productId, categoryIds);
        return Ok(result);
    }
}