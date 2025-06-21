using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Models;

namespace SushiZume.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Order");

        builder.HasKey(o => o.Id);

        builder.Property(o => o.Id)
            .HasColumnName("id");

        builder.Property(o => o.PeopleCount)
            .HasColumnName("peopleCount");

        builder.Property(o => o.PaymentMethod)
            .HasColumnName("paymentMethod");

        builder.Property(o => o.IsNew)
            .HasColumnName("new")
            .HasDefaultValue(true);

        builder.Property(o => o.IsDone)
            .HasColumnName("done")
            .HasDefaultValue(false);

        builder.Property(o => o.CreatedAt)
            .HasColumnName("createdAt");

        builder.Property(o => o.Notes)
            .HasColumnName("notesForOrder")
            .IsRequired(false);

        builder.Property(o => o.AddressId)
            .HasColumnName("addressId");

        builder.Property(o => o.UserId)
            .HasColumnName("userId");

        builder.Property(o => o.PaymentMethod)
            .HasConversion<string>();

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