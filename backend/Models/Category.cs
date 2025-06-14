using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("Category")]
public class Category
{
    [Key, Column("id")] public string Id { get; set; }

    [Required, MinLength(1), Column("name")]
    public string Name { get; set; } = string.Empty;

    public List<Product> Products { get; set; }
}