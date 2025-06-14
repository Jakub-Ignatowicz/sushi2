using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("ProductItem")]
public class ProductItem
{
    [Key, Column("id")] public string Id { get; set; }
    [Required, Column("description")] public string Description { get; set; } = string.Empty;

    [Range(1, int.MaxValue), Column("number")]
    public int Number { get; set; }

    [Column("numberSuffix")] public string NumberSuffix { get; set; } = "x";
    [Required, Column("productId")] public string ProductId { get; set; } = string.Empty;
    [ForeignKey(nameof(ProductId))] public Product Product { get; set; }
}