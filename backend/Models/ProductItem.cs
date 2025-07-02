using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SushiZume.Models;

public class ProductItem
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public int Quantity { get; set; }
    public string Description { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; init; } = null!;
}