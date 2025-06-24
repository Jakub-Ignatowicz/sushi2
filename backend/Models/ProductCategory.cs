using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

public class ProductCategory
{
    public Guid ProductId { get; init; }
    public Guid CategoryId { get; init; }
    public Product Product { get; init; }
    public Category Category { get; init; }
}