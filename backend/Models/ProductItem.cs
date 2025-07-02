using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SushiZume.Models;

[Owned]
public class ProductItem
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public int Quantity { get; set; }
    public string Description { get; set; }
}