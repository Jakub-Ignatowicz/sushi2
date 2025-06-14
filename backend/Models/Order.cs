using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

public enum OrderPaymentMethod
{
    Cash
}

[Table("Order")]
public class Order
{
    [Key, Column("id")] public string Id { get; set; }
    [Column("email")] public string Email { get; set; }
    [Column("phone")] public int PhoneNumber { get; set; }
    [Column("peopleNumber")] public int PeopleNumber { get; set; }
    [Column("paymentMethod")] public OrderPaymentMethod PaymentMethod { get; set; }
    [Column("new")] public bool IsNew { get; set; } = true;
    [Column("done")] public bool IsDone { get; set; } = false;
    [Column("createdAt")] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    [Column("notesForOrder")] public string Notes { get; set; }
    [Column("addressId")] public string AddressId { get; set; }
    [ForeignKey(nameof(AddressId))] public Address Address { get; set; }
    public List<OrderProduct> OrderProducts { get; set; }
}