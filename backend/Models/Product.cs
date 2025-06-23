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
    public string? ImagePath { get; set; }
    public double? Amount { get; set; }
    public string? AmountUnit { get; set; }
    public string? Description { get; set; }
    public ProductType Type { get; set; }
    public List<ProductCategory> Categories { get; init; } = [];
    public List<OrderProduct> OrderProducts { get; init; } = [];
    public List<ProductItem> Items { get; init; } = [];
}