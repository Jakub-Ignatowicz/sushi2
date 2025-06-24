using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("OrderProduct")]
public class OrderProduct
{
    [Range(1, int.MaxValue, ErrorMessage = "Ilość musi być większa niż 0.")]
    public int Quantity { get; set; }

    [Column("orderId")] public Guid OrderId { get; set; }
    public Order Order { get; set; }
    [Column("productId")] public Guid ProductId { get; set; }
    public Product Product { get; set; }
}