using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("Product")]
public class Product
{
    [Key, Column("id")] public string Id { get; set; }
    [Required, Column("name")] public string Name { get; set; }
    [Required, Column("price")] public int Price { get; set; }
    [Column("available")] public bool IsAvailable { get; set; }
    [Column("visible")] public bool IsVisible { get; set; }
    [Column("imagePath")] public string ImagePath { get; set; }
    [Column("amount")] public double Amount { get; set; }
    [Column("amountName")] public string AmountUnit { get; set; }
    [Column("categoryId")] public string CategoryId { get; set; }
    [ForeignKey(nameof(CategoryId))] public Category Category { get; set; }
    public List<OrderProduct> OrderProducts { get; set; }
    public List<ProductItem> ProductItems { get; set; }
}