using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SushiZume.Enums;

namespace SushiZume.Models;

public class Product
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public string Name { get; set; }
    public decimal Price { get; set; }
    public bool IsAvailable { get; set; }
    public bool IsVisible { get; set; }
    public bool IsFeatured { get; set; }
    public string? ImageUrl { get; set; }
    public double? Amount { get; set; }
    public string? AmountUnit { get; set; }
    public string? Description { get; set; }
    public Guid CategoryId { get; init; }
    public Category Category { get; init; }
    public ICollection<OrderProduct> OrderProducts { get; init; } = [];
    public ICollection<ProductItem> Items { get; set; } = [];
}