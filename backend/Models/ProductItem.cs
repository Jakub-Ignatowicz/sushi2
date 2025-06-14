using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("ProductItem")]
public class ProductItem
{
    [Key, Column("id")] public string Id { get; set; }
    [Required, Column("description")] public string Description { get; set; }
    [Column("number")] public int Number { get; set; }
    [Column("numberPostfix")] public string NumberPostfix { get; set; }
    [Required, Column("productId")] public string ProductId { get; set; }
    [ForeignKey(nameof(ProductId))] public Product Product { get; set; }
}