using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Models;

namespace SushiZume.Configurations;

public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> builder)
    {
        builder.ToTable("RefreshToken");

        builder.HasKey(rt => rt.Id);

        builder.Property(rt => rt.Id)
            .HasColumnName("id");

        builder.Property(rt => rt.UserId)
            .HasColumnName("userId");

        builder.Property(rt => rt.Token)
            .HasColumnName("token");

        builder.Property(rt => rt.ExpiryDate)
            .HasColumnName("expiryDate");

        builder.Property(rt => rt.CreatedAt)
            .HasColumnName("createdAt");

        builder.Property(rt => rt.IsRevoked)
            .HasColumnName("isRevoked");

        builder.Property(rt => rt.ReplacedByTokenId)
            .HasColumnName("replacedByTokenId")
            .IsRequired(false);

        builder.Property(rt => rt.UserAgent)
            .HasColumnName("userAgent")
            .IsRequired(false);

        builder.Property(rt => rt.IpAddress)
            .HasColumnName("ipAddress")
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