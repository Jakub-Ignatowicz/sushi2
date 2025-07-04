using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Models;

namespace SushiZume.Configurations;

public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.HasKey(a => a.Id);

        builder.Property(a => a.Id)
            .HasDefaultValueSql("gen_random_uuid()");

        builder.Property(a => a.ApartmentNumber)
            .IsRequired(false);

        builder.Property(a => a.Floor)
            .IsRequired(false);

        // builder.HasOne(o => o.Address)
        //     .WithOne(a => a.Order)
        //     .HasForeignKey<Address>(a => a.OrderId)
        //     .OnDelete(DeleteBehavior.Cascade);
    }
}