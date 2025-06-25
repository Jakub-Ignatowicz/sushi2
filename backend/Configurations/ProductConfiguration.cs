using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Enums;
using SushiZume.Models;

namespace SushiZume.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Id)
            .HasDefaultValueSql("gen_random_uuid()");

        builder.Property(p => p.IsAvailable)
            .HasDefaultValue(true);

        builder.Property(p => p.IsVisible)
            .HasDefaultValue(true);

        builder.Property(p => p.IsFeatured)
            .HasDefaultValue(false);

        builder.Property(p => p.ImageUrl)
            .IsRequired(false);

        builder.Property(p => p.Amount)
            .IsRequired(false);

        builder.Property(p => p.AmountUnit)
            .IsRequired(false);

        builder.Property(p => p.Description)
            .IsRequired(false);

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