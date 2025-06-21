using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("ProductCategory")]
public class ProductCategory
{
    [Column("productId")] public Guid ProductId { get; init; }
    public Product Product { get; init; } = null!;
    [Column("categoryId")] public Guid CategoryId { get; init; }
    public Category Category { get; init; } = null!;
}