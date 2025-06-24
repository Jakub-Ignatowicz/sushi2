using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Models;

namespace SushiZume.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("User");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.Id)
            .HasColumnName("id");

        builder.Property(u => u.Email)
            .HasColumnName("email");

        builder.Property(u => u.PhoneNumber)
            .HasColumnName("phone");

        builder.Property(u => u.PasswordHash)
            .HasColumnName("passwordHash");

        builder.Property(u => u.FirstName)
            .HasColumnName("firstName");

        builder.Property(u => u.LastName)
            .HasColumnName("lastName");

        builder.Property(u => u.CreatedAt)
            .HasColumnName("createdAt");

        builder.Property(u => u.Role)
            .HasColumnName("role")
            .HasConversion<string>();

        builder.HasMany(u => u.Orders)
            .WithOne(o => o.User)
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}