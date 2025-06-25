namespace SushiZume.Models;

public class PasswordResetToken
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateTime ExpiryDate { get; set; }
    public bool IsUsed { get; set; }

    public User User { get; set; }

    public bool IsExpired => DateTime.UtcNow > ExpiryDate;
}