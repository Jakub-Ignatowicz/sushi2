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

        builder.HasOne(o => o.Address)
            .WithMany(a => a.Orders)
            .HasForeignKey(o => o.AddressId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(o => o.OrderProducts)
            .WithOne(op => op.Order)
            .HasForeignKey(op => op.OrderId);

        builder.HasOne(o => o.User)
            .WithMany(u => u.Orders)
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}