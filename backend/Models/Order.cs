using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SushiZume.Models;

public enum OrderPaymentMethod
{
    Cash
}

[Table("Order")]
public class Order
{
    [Column("id")] public Guid Id { get; init; } = Guid.NewGuid();

    [Required, MinLength(1), Column("email")]
    public string Email { get; set; } = string.Empty;

    [Required, MinLength(1), Column("phone")]
    public string PhoneNumber { get; set; } = string.Empty;

    [Range(1, int.MaxValue), Column("peopleCount")]
    public int PeopleCount { get; set; }

    [Required, Column("paymentMethod")] public OrderPaymentMethod PaymentMethod { get; set; }
    [Column("new")] public bool IsNew { get; set; } = true;
    [Column("done")] public bool IsDone { get; set; } = false;
    [Column("createdAt")] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    [Column("notesForOrder")] public string Notes { get; set; }
    [Required, Column("addressId")] public Guid AddressId { get; set; }
    [ForeignKey(nameof(AddressId))] public Address Address { get; init; } = null!;
    public List<OrderProduct> OrderProducts { get; set; } = [];
}

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(o => o.Id);

        builder.HasOne(o => o.Address)
            .WithMany(a => a.Orders)
            .HasForeignKey(o => o.AddressId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(o => o.OrderProducts)
            .WithOne(op => op.Order)
            .HasForeignKey(op => op.OrderId);
    }
}