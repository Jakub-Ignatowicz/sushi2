using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Models;

namespace SushiZume.Configurations;

public class ProductItemConfiguration : IEntityTypeConfiguration<ProductItem>
{
    public void Configure(EntityTypeBuilder<ProductItem> builder)
    {
        builder.ToTable("ProductItem");

        builder.HasKey(pi => pi.Id);

        builder.Property(pi => pi.Id)
            .HasColumnName("id");

        builder.Property(pi => pi.Description)
            .HasColumnName("description");

        builder.Property(pi => pi.Number)
            .HasColumnName("number");

        builder.Property(pi => pi.NumberSuffix)
            .HasColumnName("numberSuffix")
            .IsRequired(false)
            .HasDefaultValue("x");

        builder.Property(pi => pi.ProductId)
            .HasColumnName("productId");

        builder.HasOne(pi => pi.Product)
            .WithMany(p => p.Items)
            .HasForeignKey(pi => pi.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}