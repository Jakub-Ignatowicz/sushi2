using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("Product")]
public class Product
{
    [Key, Column("id")] public Guid Id { get; set; } = Guid.NewGuid();

    [Required, MinLength(1), Column("name")]
    public string Name { get; set; } = string.Empty;

    [Range(0, double.MaxValue), Column("price")]
    public double Price { get; set; }

    [Column("available")] public bool IsAvailable { get; set; }
    [Column("visible")] public bool IsVisible { get; set; }
    [Column("imagePath")] public string ImagePath { get; set; }
    [Column("amount")] public double Amount { get; set; }

    [Column("amountName")] public string AmountUnit { get; set; }

    public List<ProductCategory> Categories { get; set; } = [];
    public List<OrderProduct> OrderProducts { get; set; } = [];
    public List<ProductItem> Items { get; set; } = [];
}