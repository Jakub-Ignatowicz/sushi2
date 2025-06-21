using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SushiZume.Models;

[Table("Address")]
public class Address
{
    [Column("id")] public Guid Id { get; init; } = Guid.NewGuid();

    [Column("city")]
    [Required(AllowEmptyStrings = false, ErrorMessage = "Miasto jest wymagane.")]
    public string City { get; set; } = string.Empty;

    [Column("district")]
    [Required(AllowEmptyStrings = false, ErrorMessage = "Dzielnica jest wymagana.")]
    public string District { get; set; } = string.Empty;

    [Column("street")]
    [Required(AllowEmptyStrings = false, ErrorMessage = "Ulica jest wymagana.")]
    public string Street { get; set; } = string.Empty;

    [Column("homeNumber")]
    [Required(AllowEmptyStrings = false, ErrorMessage = "Numer domu jest wymagany.")]
    public string HomeNumber { get; set; } = string.Empty;

    [Column("apartmentNumber")]
    [Required(AllowEmptyStrings = false, ErrorMessage = "Numer mieszkania jest wymagany.")]
    public string ApartmentNumber { get; set; } = string.Empty;

    [Column("floor")] public int? Floor { get; set; }

    public List<Order> Orders { get; set; } = [];
}