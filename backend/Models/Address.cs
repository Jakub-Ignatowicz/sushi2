using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("Address")]
public class Address
{
    [Key, Column("id")] public string Id { get; set; }
    [Column("city")] public string City { get; set; }
    [Column("district")] public string District { get; set; }
    [Column("street")] public string Street { get; set; }
    [Column("homeNumber")] public string HomeNumber { get; set; }
    [Column("apartamentNumber")] public string ApartamentNumber { get; set; }
    [Column("floor")] public int Floor { get; set; }
    public List<Order> Orders { get; set; }
}