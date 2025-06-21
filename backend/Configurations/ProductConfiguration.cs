using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Models;

namespace SushiZume.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Product");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Id)
            .HasColumnName("id");

        builder.Property(p => p.Name)
            .HasColumnName("name");

        builder.Property(p => p.Price)
            .HasColumnName("price");

        builder.Property(p => p.IsAvailable)
            .HasColumnName("available")
            .HasDefaultValue(true);

        builder.Property(p => p.IsVisible)
            .HasColumnName("visible")
            .HasDefaultValue(true);

        builder.Property(p => p.ImagePath)
            .HasColumnName("imagePath");

        builder.Property(p => p.Amount)
            .HasColumnName("amount");

        builder.Property(p => p.AmountUnit)
            .HasColumnName("amountName");

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