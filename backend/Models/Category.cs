using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

public class Category
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public string Name { get; set; }
    public int OrderIndex { get; set; }
    public string? Description { get; set; }

    public List<Product> Products { get; set; } = [];
}
