using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SushiZume.Enums;
using SushiZume.Models;

namespace SushiZume.Models;

public class User
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public DateTime CreatedAt { get; init; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? PasswordHash { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public UserType Type { get; set; }
    public ICollection<Address> Addresses { get; init; } = [];
    public ICollection<Order> Orders { get; init; } = [];
    public bool IsAdmin => Type == UserType.Admin;
    public bool IsGuest => Type == UserType.Guest;
    public bool IsRegular => Type == UserType.Regular;
    public string? FullName => IsRegular ? $"{FirstName} {LastName}".Trim() : null;
}
