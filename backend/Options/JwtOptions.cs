namespace SushiZume.Options;

public class JwtOptions
{
    public const string JwtOptionsKey = "Jwt";

    public string Secret { get; set; }
    public int ExpiryMinutes { get; set; }
    public int RefreshExpiryDays { get; set; }
}
