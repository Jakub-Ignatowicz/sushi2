using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SushiZume.Models;

[Table("Product")]
public class Product
{
    [Column("id")] public Guid Id { get; init; } = Guid.NewGuid();

    [Column("name")]
    [Required(AllowEmptyStrings = false, ErrorMessage = "Nazwa jest wymagana.")]
    public string Name { get; set; } = string.Empty;

    [Column("price")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Cena musi być większa niż 0.")]
    public decimal Price { get; set; }

    [Column("available")] public bool IsAvailable { get; set; } = true;
    [Column("visible")] public bool IsVisible { get; set; } = true;
    [Column("imagePath")] public string ImagePath { get; set; }

    [Column("amount")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Ilość musi być większa niż 0.")]
    public double Amount { get; set; }

    [Column("amountName")] public string AmountUnit { get; set; }

    public List<ProductCategory> Categories { get; init; } = [];
    public List<OrderProduct> OrderProducts { get; init; } = [];
    public List<ProductItem> Items { get; init; } = [];
}

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(p => p.Id);

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