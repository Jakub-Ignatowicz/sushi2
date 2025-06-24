using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

public class ProductItem
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public string Description { get; set; }
    public double Number { get; set; }
    public string? NumberSuffix { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; }
}