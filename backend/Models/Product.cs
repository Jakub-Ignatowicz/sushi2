using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SushiZume.Models;

[Table("Product")]
public class Product
{
    [Key, Column("id")] public Guid Id { get; init; } = Guid.NewGuid();

    [Required, MinLength(1), Column("name")]
    public string Name { get; set; } = string.Empty;

    [Range(0, double.MaxValue), Column("price")]
    public double Price { get; set; }

    [Column("available")] public bool IsAvailable { get; set; }
    [Column("visible")] public bool IsVisible { get; set; }
    [Column("imagePath")] public string ImagePath { get; set; }
    [Column("amount")] public double Amount { get; set; }

    [Column("amountName")] public string AmountUnit { get; set; }

    public List<ProductCategory> Categories { get; init; } = [];
    public List<OrderProduct> OrderProducts { get; init; } = [];
    public List<ProductItem> Items { get; init; } = [];
}

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasMany(p => p.Categories)
            .WithOne(pc => pc.Product)
            .HasForeignKey(pc => pc.ProductId);

        builder.HasMany(p => p.OrderProducts)
            .WithOne(op => op.Product)
            .HasForeignKey(op => op.ProductId);

        builder.HasMany(p => p.Items)
            .WithOne(pi => pi.Product)
            .HasForeignKey(pi => pi.ProductId);
    }
}