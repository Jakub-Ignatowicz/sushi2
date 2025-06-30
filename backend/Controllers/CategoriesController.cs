using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using SushiZume.DTOs;
using SushiZume.Services.Interfaces;

namespace SushiZume.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(ICategoryService categoryService, IValidator<CategoryPostDto> validator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await categoryService.GetAllAsync();
        return Ok(categories);
    }

    [HttpPost("order")]
    public async Task<IActionResult> OrderCategories([FromBody] List<string> categoryIds)
    {
        await categoryService.OrderCategoriesAsync(categoryIds);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CategoryPostDto dto)
    {
        await validator.ValidateAndThrowAsync(dto);

        var categoryId = await categoryService.CreateAsync(dto);
        var category = await categoryService.GetByIdAsync(categoryId);
        return Ok(category);
    }

    [HttpPatch("{categoryId:guid}")]
    public async Task<IActionResult> UpdateCategoryName(Guid categoryId, [FromBody] UpdateCategoryNameDto dto)
    {
        await categoryService.ChangeNameAsync(categoryId, dto.Name);
        return NoContent();
    }
}
