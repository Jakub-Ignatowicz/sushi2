using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using SushiZume.Enums;

namespace SushiZume.Models;

public class Order
{
    public const decimal PerPersonPrice = 2m; // Example price per person
    public const decimal DeliveryFee = 8m; // Example delivery fee

    public Guid Id { get; init; } = Guid.NewGuid();
    public int PeopleCount { get; set; }
    public decimal TotalCost { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public OrderPaymentMethod PaymentMethod { get; set; }
    public OrderStatus Status { get; set; }
    public DateTime CreatedAt { get; init; }
    public string Notes { get; set; }

    public Address Address { get; init; }
    public ICollection<OrderProduct> OrderProducts { get; set; } = [];

    public decimal CalculateTotalCost(ICollection<Product> products)
    {
        var totalCost = (PeopleCount * PerPersonPrice) + DeliveryFee;
        foreach (var product in products)
        {
            var quantity = OrderProducts.FirstOrDefault(op => op.ProductId == product.Id)?.Quantity ?? 0;
            totalCost += product.Price * quantity;
        }

        return totalCost;
    }
}