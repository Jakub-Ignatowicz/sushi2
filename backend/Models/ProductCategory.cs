using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SushiZume.Models;

[Table("ProductCategory")]
public class ProductCategory
{
    [Column("productId")] public Guid ProductId { get; init; }
    public Product Product { get; init; } = null!;
    [Column("categoryId")] public Guid CategoryId { get; init; }
    public Category Category { get; init; } = null!;
}

public class ProductCategoryConfiguration : IEntityTypeConfiguration<ProductCategory>
{
    public void Configure(EntityTypeBuilder<ProductCategory> builder)
    {
        builder.HasKey(pc => new { pc.ProductId, pc.CategoryId });

        builder.HasOne(pc => pc.Product)
            .WithMany(p => p.Categories)
            .HasForeignKey(pc => pc.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(pc => pc.Category)
            .WithMany(p => p.Products)
            .HasForeignKey(pc => pc.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}