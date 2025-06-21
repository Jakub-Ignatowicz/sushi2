using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("Category")]
public class Category
{
    [Column("id")] public Guid Id { get; init; } = Guid.NewGuid();

    [Column("name")]
    [Required(AllowEmptyStrings = false, ErrorMessage = "Nazwa kategorii jest wymagana.")]
    public string Name { get; set; } = string.Empty;

    public List<ProductCategory> Products { get; set; } = [];
}