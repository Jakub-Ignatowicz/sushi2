using SushiZume.Models;

namespace SushiZume.Data;

public static class DataInitializer
{
    public static async Task SeedAsync(SushiContext context)
    {
        if (!context.Categories.Any())
        {
            var category = new Category { Id = Guid.NewGuid().ToString(), Name = "Pizza" };
            context.Categories.Add(category);

            var product = new Product
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Margherita",
                Price = 25,
                IsAvailable = true,
                IsVisible = true,
                ImagePath = "margherita.jpg",
                Amount = 1.0,
                AmountUnit = "pcs",
                CategoryId = category.Id
            };
            context.Products.Add(product);

            context.ProductItems.Add(new ProductItem
            {
                Id = Guid.NewGuid().ToString(),
                ProductId = product.Id,
                Description = "Tomato sauce",
                Number = 1,
                NumberPostfix = ""
            });

            context.ProductItems.Add(new ProductItem
            {
                Id = Guid.NewGuid().ToString(),
                ProductId = product.Id,
                Description = "Mozzarella",
                Number = 2,
                NumberPostfix = "x"
            });

            await context.SaveChangesAsync();
        }
    }
}