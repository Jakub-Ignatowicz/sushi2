using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Models;

namespace SushiZume.Configurations;

public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> builder)
    {
        builder.HasKey(rt => rt.Id);

        builder.Property(rt => rt.Id)
            .HasDefaultValueSql("gen_random_uuid()");

        builder.Property(rt => rt.IsRevoked)
            .HasDefaultValue(false);

        builder.Property(rt => rt.CreatedAt)
            .HasDefaultValueSql("now()");

        builder.Property(rt => rt.ReplacedByTokenId)
            .IsRequired(false);

        builder.Property(rt => rt.UserAgent)
            .IsRequired(false);

        builder.Property(rt => rt.IpAddress)
            .IsRequired(false);

        builder.HasOne(rt => rt.User)
            .WithMany()
            .HasForeignKey(rt => rt.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(rt => rt.ReplacedByToken)
            .WithOne()
            .HasForeignKey<RefreshToken>(rt => rt.ReplacedByTokenId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);
    }
}