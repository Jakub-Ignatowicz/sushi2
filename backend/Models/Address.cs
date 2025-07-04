using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

public class Address
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public string City { get; set; }
    public string District { get; set; }
    public string Street { get; set; }
    public string HomeNumber { get; set; }
    public string? ApartmentNumber { get; set; }
    public int? Floor { get; set; }
    public Guid OrderId { get; set; }
    public Order Order { get; init; }
}