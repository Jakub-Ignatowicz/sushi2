using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Enums;
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
            .HasColumnName("imagePath")
            .IsRequired(false);

        builder.Property(p => p.Amount)
            .HasColumnName("amount")
            .IsRequired(false);

        builder.Property(p => p.AmountUnit)
            .HasColumnName("amountName")
            .IsRequired(false);

        builder.Property(p => p.Description)
            .HasColumnName("description")
            .IsRequired(false);

        builder.Property(p => p.Type)
            .HasColumnName("type")
            .HasConversion<string>()
            .HasDefaultValue(ProductType.Normal);

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