using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using SushiZume.DTOs;
using SushiZume.Models;
using SushiZume.Services.Interfaces;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(ICategoryService categoryService)
    : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetCategories(CancellationToken cancellationToken)
    {
        var categories = await categoryService.GetAllAsync(cancellationToken);
        return Ok(categories);
    }

    [HttpPost("order")]
    public async Task<IActionResult> OrderCategories([FromBody] List<string> categoryIds,
        CancellationToken cancellationToken)
    {
        await categoryService.OrderCategoriesAsync(categoryIds, cancellationToken);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CategoryPostDto dto, CancellationToken cancellationToken)
    {
        var categoryId = await categoryService.CreateAsync(dto, cancellationToken);
        var category = await categoryService.GetByIdAsync(categoryId, cancellationToken);
        return Ok(category);
    }

    [HttpPut("{categoryId:guid}")]
    public async Task<IActionResult> UpdateCategory(Guid categoryId, [FromBody] CategoryPostDto dto,
        CancellationToken cancellationToken)
    {
        await categoryService.UpdateAsync(categoryId, dto, cancellationToken);
        return NoContent();
    }
}