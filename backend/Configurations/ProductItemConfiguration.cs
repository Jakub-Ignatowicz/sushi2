using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Models;

namespace SushiZume.Configurations;

public class ProductItemConfiguration : IEntityTypeConfiguration<ProductItem>
{
    public void Configure(EntityTypeBuilder<ProductItem> builder)
    {
        builder.HasKey(pi => pi.Id);

        builder.Property(pi => pi.Id)
            .HasDefaultValueSql("gen_random_uuid()");

        builder.HasOne(pi => pi.Product)
            .WithMany(p => p.Items)
            .HasForeignKey(pi => pi.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}