namespace SushiZume.Data;

using Microsoft.EntityFrameworkCore;
using SushiZume.Models;

public class SushiContext(DbContextOptions<SushiContext> options) : DbContext(options)
{
    public DbSet<Address> Addresses { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderProduct> OrderProducts { get; set; }
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // OrderProduct: composite key
        modelBuilder.Entity<OrderProduct>()
            .HasKey(op => new { op.OrderId, op.ProductId });

        // Order → Address
        modelBuilder.Entity<Order>(entity =>
        {
            entity
                .HasOne(o => o.Address)
                .WithMany(a => a.Orders)
                .HasForeignKey(o => o.AddressId);

            entity
                .Property(o => o.PaymentMethod)
                .HasConversion<string>();
        });

        // OrderProduct → Order
        modelBuilder.Entity<OrderProduct>()
            .HasOne(op => op.Order)
            .WithMany(o => o.OrderProducts)
            .HasForeignKey(op => op.OrderId);

        // OrderProduct → Product
        modelBuilder.Entity<OrderProduct>()
            .HasOne(op => op.Product)
            .WithMany(p => p.OrderProducts)
            .HasForeignKey(op => op.ProductId);

        // Product → Category
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId);

        // Product → ProductItem[]
        modelBuilder.Entity<ProductItem>()
            .HasOne(p => p.Product)
            .WithMany(p => p.ProductItems)
            .HasForeignKey(p => p.ProductId);
    }
}