using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Models;

namespace SushiZume.Configurations;

public class OrderProductConfiguration : IEntityTypeConfiguration<OrderProduct>
{
    public void Configure(EntityTypeBuilder<OrderProduct> builder)
    {
        builder.ToTable("OrderProduct");

        builder.HasKey(op => new { op.OrderId, op.ProductId });

        builder.Property(op => op.Quantity)
            .HasColumnName("quantity");

        builder.Property(op => op.OrderId)
            .HasColumnName("orderId");

        builder.Property(op => op.ProductId)
            .HasColumnName("productId");

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