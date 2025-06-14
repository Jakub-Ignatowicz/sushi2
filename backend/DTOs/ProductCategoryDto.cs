namespace SushiZume.DTOs;

public record ProductCategoryDto(
    ProductDto Product,
    CategoryDto Category
);