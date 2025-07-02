using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using SushiZume.Enums;

namespace SushiZume.Models;

public class Order
{
    private static readonly decimal PerPersonPrice = 2m; // Example price per person
    private static readonly decimal DeliveryFee = 8m; // Example delivery fee

    public Guid Id { get; init; } = Guid.NewGuid();
    public int PeopleCount { get; set; }
    public OrderPaymentMethod PaymentMethod { get; set; }
    public OrderStatus Status { get; set; }
    public DateTime CreatedAt { get; init; }
    public string Notes { get; set; }
    public Guid AddressId { get; set; }
    public Guid UserId { get; set; }

    public Address Address { get; init; }
    public List<OrderProduct> OrderProducts { get; set; } = [];
    public User User { get; init; }

    public decimal TotalPrice =>
        OrderProducts.Sum(op => op.Product.Price * op.Quantity) + DeliveryFee + PerPersonPrice * PeopleCount;
}