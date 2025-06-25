using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

public class OrderProduct
{
    public int Quantity { get; set; }
    public Guid OrderId { get; set; }
    public Guid ProductId { get; set; }

    public Order Order { get; set; }
    public Product Product { get; set; }
}