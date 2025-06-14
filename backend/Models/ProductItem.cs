using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SushiZume.Models;

[Table("ProductItem")]
public class ProductItem
{
    [Column("id")] public Guid Id { get; set; }

    [Required, Column("description"), MinLength(1)]
    public string Description { get; set; } = string.Empty;

    [Required, Column("number"), Range(1, int.MaxValue)]
    public int Number { get; set; }

    [Column("numberSuffix"), MinLength(1)] public string NumberSuffix { get; set; } = "x";
    [Column("productId")] public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
}

public class ProductItemConfiguration : IEntityTypeConfiguration<ProductItem>
{
    public void Configure(EntityTypeBuilder<ProductItem> builder)
    {
        builder.HasKey(pi => pi.Id);

        builder.HasOne(pi => pi.Product)
            .WithMany(p => p.Items)
            .HasForeignKey(pi => pi.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}