namespace SushiZume.Models;

public class PasswordResetToken
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public DateTime ExpiryDate { get; set; }
    public bool Used { get; set; } = false;

    public User User { get; set; }

    public bool IsExpired => DateTime.UtcNow > ExpiryDate;
}