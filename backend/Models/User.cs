using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SushiZume.Enums;
using SushiZume.Models;

namespace SushiZume.Models;

public class User
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? PasswordHash { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    public UserRole Role { get; set; }
    public ICollection<Address> Addresses { get; init; } = [];
    public ICollection<Order> Orders { get; init; } = [];
    public string? FullName => IsNormal ? $"{FirstName} {LastName}".Trim() : null;
    public bool IsAdmin => Role == UserRole.Admin;
    public bool IsGuest => Role == UserRole.Guest;
    public bool IsNormal => Role == UserRole.Normal;
}