using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Models;

namespace SushiZume.Configurations;

public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.ToTable("Address");

        builder.HasKey(a => a.Id);

        builder.Property(a => a.Id)
            .HasColumnName("id");

        builder.Property(a => a.City)
            .HasColumnName("city");

        builder.Property(a => a.District)
            .HasColumnName("district");

        builder.Property(a => a.Street)
            .HasColumnName("street");

        builder.Property(a => a.HomeNumber)
            .HasColumnName("homeNumber");

        builder.Property(a => a.ApartmentNumber)
            .HasColumnName("apartmentNumber");

        builder.Property(a => a.Floor)
            .HasColumnName("floor")
            .IsRequired(false);

        builder.Property(a => a.UserId)
            .HasColumnName("userId");

        builder.HasMany(a => a.Orders)
            .WithOne(o => o.Address)
            .HasForeignKey(o => o.AddressId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}