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
    public DbSet<ProductCategory> ProductCategories { get; set; }
    public DbSet<ProductItem> ProductItems { get; set; }

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

        modelBuilder.Entity<Product>()
            .HasMany(p => p.OrderProducts)
            .WithOne(op => op.Product);


        // OrderProduct → Product
        modelBuilder.Entity<OrderProduct>()
            .HasOne(op => op.Product)
            .WithMany(p => p.OrderProducts)
            .HasForeignKey(op => op.ProductId);

        modelBuilder.Entity<ProductCategory>(entity =>
        {
            entity.HasKey(pc => new { pc.CategoryId, pc.ProductId });

            entity.HasOne<Product>()
                .WithMany(p => p.Categories)
                .HasForeignKey(pc => pc.ProductId);

            entity.HasOne<Category>()
                .WithMany(c => c.Products)
                .HasForeignKey(pc => pc.CategoryId);
        });

        // Product → ProductItem[]
        modelBuilder.Entity<ProductItem>()
            .HasOne(p => p.Product)
            .WithMany(p => p.Items)
            .HasForeignKey(p => p.ProductId);
    }
}