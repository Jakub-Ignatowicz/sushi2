using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SushiZume.Models;

[Table("OrderProduct")]
public class OrderProduct
{
    [Range(1, int.MaxValue), Column("quantity")]
    public int Quantity { get; set; }

    [Column("orderId")] public Guid OrderId { get; set; }
    [ForeignKey(nameof(OrderId))] public Order Order { get; set; }
    [Column("productId")] public Guid ProductId { get; set; }
    [ForeignKey(nameof(ProductId))] public Product Product { get; set; }
}

public class OrderProductConfiguration : IEntityTypeConfiguration<OrderProduct>
{
    public void Configure(EntityTypeBuilder<OrderProduct> builder)
    {
        builder.HasKey(op => new { op.OrderId, op.ProductId });

        builder.HasOne(op => op.Order)
            .WithMany(o => o.OrderProducts)
            .HasForeignKey(op => op.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(op => op.Product)
            .WithMany(p => p.OrderProducts)
            .HasForeignKey(op => op.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}