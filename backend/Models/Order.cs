using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using SushiZume.Enums;

namespace SushiZume.Models;

public class Order
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public int PeopleCount { get; set; }
    public OrderPaymentMethod PaymentMethod { get; set; }
    public bool IsNew { get; set; } = true;
    public bool IsDone { get; set; } = false;
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    public string Notes { get; set; }
    public Guid AddressId { get; set; }
    public Guid UserId { get; set; }

    public Address Address { get; init; } = null!;
    public List<OrderProduct> OrderProducts { get; set; } = [];
    public User User { get; init; }

    public string Email => User.Email;
    public string PhoneNumber => User.PhoneNumber;
}