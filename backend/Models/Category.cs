using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("Category")]
public class Category
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public string Name { get; set; }
    public int OrderIndex { get; set; }
    public string? Description { get; set; }

    public List<ProductCategory> Products { get; set; } = [];
}