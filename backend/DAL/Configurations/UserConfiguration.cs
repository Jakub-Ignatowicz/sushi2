using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Models;

namespace SushiZume.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(u => u.RefreshToken)
            .IsRequired(false);

        builder.Property(u => u.RefreshTokenExpiresAtUtc)
            .IsRequired(false);
    }
}