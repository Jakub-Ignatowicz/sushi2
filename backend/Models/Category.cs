using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("Category")]
public class Category
{
    [Key, Column("id")] public Guid Id { get; set; } = Guid.NewGuid();

    [Required, MinLength(1), Column("name")]
    public string Name { get; set; } = string.Empty;

    public List<Product> Products { get; set; }
}