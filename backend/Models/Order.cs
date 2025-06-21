using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Enums;

namespace SushiZume.Models;

[Table("Order")]
public class Order
{
    [Column("id")] public Guid Id { get; init; } = Guid.NewGuid();

    [Range(1, int.MaxValue, ErrorMessage = "Liczba osób musi być większa niż 0.")]
    [Column("peopleCount")]
    public int PeopleCount { get; set; }

    [Required, Column("paymentMethod")] public OrderPaymentMethod PaymentMethod { get; set; }
    [Column("new")] public bool IsNew { get; set; } = true;
    [Column("done")] public bool IsDone { get; set; } = false;
    [Column("createdAt")] public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    [Column("notesForOrder")] public string Notes { get; set; }
    [Column("addressId")] public Guid AddressId { get; set; }
    public Address Address { get; init; } = null!;
    public List<OrderProduct> OrderProducts { get; set; } = [];

    [Column("userId")] public Guid UserId { get; set; }
    public User User { get; init; } = null!;

    public string Email => User.Email;
    public string PhoneNumber => User.PhoneNumber;
}

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(o => o.Id);

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