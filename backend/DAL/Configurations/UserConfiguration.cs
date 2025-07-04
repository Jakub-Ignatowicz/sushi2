using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Models;

namespace SushiZume.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        // builder.HasKey(u => u.Id);
        //
        // builder.Property(u => u.Id)
        //     .HasDefaultValueSql("gen_random_uuid()");
        //
        // builder.Property(u => u.CreatedAt)
        //     .HasDefaultValueSql("now()");
        //
        // builder.Property(u => u.Email)
        //     .IsRequired(false);
        //
        // builder.Property(u => u.PhoneNumber)
        //     .IsRequired(false);
        //
        // builder.Property(u => u.PasswordHash)
        //     .IsRequired(false);
        //
        // builder.Property(u => u.FirstName)
        //     .IsRequired(false);
        //
        // builder.Property(u => u.LastName)
        //     .IsRequired(false);
        //
        // builder.Property(u => u.Type)
        //     .HasConversion<string>();
        //
        // builder.HasMany(u => u.Orders)
        //     .WithOne(o => o.User)
        //     .HasForeignKey(o => o.UserId)
        //     .OnDelete(DeleteBehavior.Cascade);
    }
}