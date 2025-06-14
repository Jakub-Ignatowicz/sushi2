using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("OrderProduct")]
public class OrderProduct
{
    [Range(1, int.MaxValue), Column("quantity")]
    public int Quantity { get; set; }

    [Column("orderId")] public string OrderId { get; set; }
    [ForeignKey(nameof(OrderId))] public Order Order { get; set; }
    [Column("productId")] public string ProductId { get; set; }
    [ForeignKey(nameof(ProductId))] public Product Product { get; set; }
}