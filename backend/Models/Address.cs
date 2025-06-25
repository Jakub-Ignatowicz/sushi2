using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

public class Address
{
    public Guid Id { get; init; }
    public string City { get; set; }
    public string District { get; set; }
    public string Street { get; set; }
    public string HomeNumber { get; set; }
    public string ApartmentNumber { get; set; }
    public int? Floor { get; set; }
    public Guid UserId { get; set; }

    public User User { get; set; }
    public List<Order> Orders { get; set; } = [];
}