using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

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

public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.HasKey(a => a.Id);

        builder.HasMany(a => a.Orders)
            .WithOne(o => o.Address)
            .HasForeignKey(o => o.AddressId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}