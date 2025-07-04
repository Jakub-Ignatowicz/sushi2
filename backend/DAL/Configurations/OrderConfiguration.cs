using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Enums;
using SushiZume.Models;

namespace SushiZume.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(o => o.Id);

        builder.Property(o => o.Id)
            .HasDefaultValueSql("gen_random_uuid()");

        builder.Property(o => o.Notes)
            .IsRequired(false);

        builder.Property(o => o.PaymentMethod)
            .HasConversion<string>();

        builder.Property(o => o.CreatedAt)
            .HasDefaultValueSql("now()");

        builder.Property(o => o.Status)
            .HasConversion<string>()
            .HasDefaultValue(OrderStatus.Pending);

        builder.HasMany(o => o.OrderProducts)
            .WithOne(op => op.Order)
            .HasForeignKey(op => op.OrderId);

        builder.HasOne(o => o.Address)
            .WithOne(a => a.Order)
            .HasForeignKey<Address>(a => a.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}