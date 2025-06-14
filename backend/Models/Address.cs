using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("Address")]
public class Address
{
    [Key, Column("id")] public string Id { get; set; }

    [Required, MinLength(1), Column("city")]
    public string City { get; set; } = string.Empty;

    [Required, MinLength(1), Column("district")]
    public string District { get; set; } = string.Empty;

    [Required, MinLength(1), Column("street")]
    public string Street { get; set; } = string.Empty;

    [Required, MinLength(1), Column("homeNumber")]
    public string HomeNumber { get; set; } = string.Empty;

    [Required, MinLength(1), Column("apartamentNumber")]
    public string ApartamentNumber { get; set; } = string.Empty;

    [Column("floor")] public int? Floor { get; set; }

    public List<Order> Orders { get; set; }
}