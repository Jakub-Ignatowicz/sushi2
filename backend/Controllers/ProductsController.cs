using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SushiZume.DTOs;
using SushiZume.Enums;
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
    public async Task<ActionResult<List<ProductDto>>> GetProducts(CancellationToken cancellationToken)
    {
        var all = await productService.GetAllAsync(cancellationToken);
        return mapper.Map<List<ProductDto>>(all);
    }

    [HttpGet("range")]
    public async Task<IActionResult> GetProductsRange([FromBody] List<Guid> productIds,
        CancellationToken cancellationToken)
    {
        var ranged = await productService.GetRangeAsync(productIds, cancellationToken);
        return Ok(mapper.Map<List<ProductDto>>(ranged));
    }

    [Authorize(Roles = nameof(UserType.Admin))]
    [HttpGet("/available")]
    public async Task<IActionResult> GetAvailableProducts(CancellationToken cancellationToken)
    {
        var all = await productService.GetAllAvailableAsync(cancellationToken);
        return Ok(mapper.Map<List<ProductDto>>(all));
    }

    [Authorize(Roles = nameof(UserType.Admin))]
    [HttpPost]
    public async Task<IActionResult> CreateProduct(ProductPostDto dto, CancellationToken cancellationToken)
    {
        await validator.ValidateAndThrowAsync(dto, cancellationToken);

        var product = await productService.AddAsync(dto, cancellationToken);
        var created = await productService.GetByIdAsync(product.Id, cancellationToken);
        return Ok(mapper.Map<ProductDto>(created));
    }

    [Authorize(Roles = nameof(UserType.Admin))]
    [HttpPatch("{productId:guid}/available")]
    public async Task<IActionResult> SetProductAvailable(Guid productId, [FromBody] bool available,
        CancellationToken cancellationToken)
    {
        await productService.SetAvailableAsync(productId, available, cancellationToken);
        return NoContent();
    }

    [Authorize(Roles = nameof(UserType.Admin))]
    [HttpPatch("{productId:guid}/visible")]
    public async Task<IActionResult> SetProductVisible(Guid productId, [FromBody] bool visible,
        CancellationToken cancellationToken)
    {
        await productService.SetVisibleAsync(productId, visible, cancellationToken);
        return NoContent();
    }

    [Authorize(Roles = nameof(UserType.Admin))]
    [HttpPatch("{productId:guid}/featured")]
    public async Task<IActionResult> SetProductFeatured(Guid productId, [FromBody] bool featured,
        CancellationToken cancellationToken)
    {
        await productService.SetFeaturedAsync(productId, featured, cancellationToken);
        return NoContent();
    }

    [Authorize(Roles = nameof(UserType.Admin))]
    [HttpPut("{productId:guid}")]
    public async Task<IActionResult> UpdateProduct(Guid productId, [FromBody] ProductUpdateDto dto,
        CancellationToken cancellationToken)
    {
        await productUpdateValidator.ValidateAndThrowAsync(dto, cancellationToken);

        var product = await productService.UpdateAsync(productId, dto, cancellationToken);
        return Ok(mapper.Map<ProductDto>(product));
    }

    [Authorize(Roles = nameof(UserType.Admin))]
    [HttpPost("{productId:guid}/items")]
    public async Task<IActionResult> AddProductItems(Guid productId, [FromBody] List<ProductItemPostDto> dtos,
        CancellationToken cancellationToken)
    {
        await Task.WhenAll(dtos.Select(dto => productItemValidator.ValidateAndThrowAsync(dto, cancellationToken)));

        await productService.AddItemsAsync(productId, dtos, cancellationToken);
        return NoContent();
    }

    [Authorize(Roles = nameof(UserType.Admin))]
    [HttpDelete("{productId:guid}/items")]
    public async Task<IActionResult> RemoveProductItems(Guid productId, [FromBody] List<Guid> itemIds,
        CancellationToken cancellationToken)
    {
        await productService.RemoveItemsAsync(productId, itemIds, cancellationToken);
        return NoContent();
    }
}