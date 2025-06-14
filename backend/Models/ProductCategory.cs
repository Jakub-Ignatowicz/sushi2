using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("ProductCategory")]
public class ProductCategory
{
    [Column("productId")] public Guid ProductId { get; set; }
    [Column("categoryId")] public Guid CategoryId { get; set; }
}