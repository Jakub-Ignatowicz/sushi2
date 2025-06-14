using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace SushiZume.Models;

public enum OrderPaymentMethod
{
    Cash
}

[Table("Order")]
public class Order
{
    [Key, Column("id")] public string Id { get; set; }

    [Required, MinLength(1), Column("email")]
    public string Email { get; set; } = string.Empty;

    [Required, MinLength(1), Column("phone")]
    public string PhoneNumber { get; set; } = string.Empty;

    [Range(1, int.MaxValue), Column("peopleNumber")]
    public int PeopleNumber { get; set; }

    [Required, Column("paymentMethod")] public OrderPaymentMethod PaymentMethod { get; set; }
    [Column("new")] public bool IsNew { get; set; } = true;
    [Column("done")] public bool IsDone { get; set; } = false;
    [Column("createdAt")] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    [Column("notesForOrder")] public string Notes { get; set; }
    [Required, Column("addressId")] public string AddressId { get; set; } = string.Empty;
    [ForeignKey(nameof(AddressId))] public Address Address { get; set; }
    public List<OrderProduct> OrderProducts { get; set; }
}