using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding;
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