using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using SushiZume.Enums;
using SushiZume.Models;

namespace SushiZume.Models;

public class User : IdentityUser<Guid>
{
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiresAtUtc { get; set; }

    public bool RefreshTokenIsValid =>
        RefreshTokenExpiresAtUtc.HasValue && RefreshTokenExpiresAtUtc.Value > DateTime.UtcNow;
}