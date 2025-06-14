using SushiZume.Models;

namespace SushiZume.Data;

public static class DataInitializer
{
    public static async Task SeedAsync(SushiContext context)
    {
        if (context.Categories.Any()) return;

        // Categories
        var pizzaCategory = new Category { Id = Guid.NewGuid(), Name = "Pizza" };
        var drinksCategory = new Category { Id = Guid.NewGuid(), Name = "Drinks" };

        context.Categories.AddRange(pizzaCategory, drinksCategory);

        // Products
        var margherita = new Product
        {
            Name = "Margherita",
            Price = 25,
            IsAvailable = true,
            IsVisible = true,
            ImagePath = "margherita.jpg",
            Amount = 1,
            AmountUnit = "pcs",
            CategoryId = pizzaCategory.Id
        };

        var cola = new Product
        {
            Name = "Cola",
            Price = 5,
            IsAvailable = true,
            IsVisible = true,
            ImagePath = "cola.jpg",
            Amount = 0.5,
            AmountUnit = "L",
            CategoryId = drinksCategory.Id
        };

        context.Products.AddRange(margherita, cola);

        // ProductItems for Margherita
        context.ProductItems.AddRange(
            new ProductItem
            {
                ProductId = margherita.Id,
                Description = "Tomato sauce",
                Number = 1,
                NumberSuffix = ""
            },
            new ProductItem
            {
                ProductId = margherita.Id,
                Description = "Mozzarella",
                Number = 2,
                NumberSuffix = "x"
            });

        // Addresses
        var address1 = new Address
        {
            City = "New York",
            District = "Manhattan",
            Street = "5th Avenue",
            HomeNumber = "123",
            ApartamentNumber = "45B",
            Floor = 4
        };

        context.Addresses.Add(address1);

        // Orders
        var order1 = new Order
        {
            Email = "customer@example.com",
            PhoneNumber = "1234567890",
            PeopleNumber = 2,
            PaymentMethod = OrderPaymentMethod.Cash,
            IsNew = true,
            IsDone = false,
            CreatedAt = DateTime.UtcNow,
            Notes = "No onions please",
            AddressId = address1.Id
        };

        context.Orders.Add(order1);

        // OrderProducts
        context.OrderProducts.Add(new OrderProduct
        {
            OrderId = order1.Id,
            ProductId = margherita.Id,
            Quantity = 1
        });

        context.OrderProducts.Add(new OrderProduct
        {
            OrderId = order1.Id,
            ProductId = cola.Id,
            Quantity = 2
        });

        await context.SaveChangesAsync();
    }
}