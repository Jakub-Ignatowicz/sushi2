namespace SushiZume.Models;

public class RefreshToken
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string Token { get; set; }
    public DateTime ExpiryDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsRevoked { get; set; } = false;
    public string? UserAgent { get; set; }
    public string? IpAddress { get; set; }

    public User User { get; set; } = null!;

    public Guid? ReplacedByTokenId { get; set; }
    public RefreshToken ReplacedByToken { get; set; } = null!;

    public bool IsExpired => DateTime.UtcNow > ExpiryDate;
    public bool IsActive => !IsRevoked && !IsExpired;
}