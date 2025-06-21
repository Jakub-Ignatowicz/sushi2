using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SushiZume.Enums;
using SushiZume.Models;

namespace SushiZume.Models;

[Table("User")]
public class User : IValidatableObject
{
    [Column("id")] public Guid Id { get; init; } = Guid.NewGuid();

    // Registered User required fields
    // [Column("email")] public string Email { get; set; } = string.Empty;
    // [Column("phoneNumber")] public string PhoneNumber { get; set; } = string.Empty;

    [Column("email")]
    [EmailAddress(ErrorMessage = "E-mail jest nieprawidłowy.")]
    public string? Email { get; set; } = string.Empty;

    [Column("phone")]
    [RegularExpression(@"^\d{9}$", ErrorMessage = "Numer telefonu musi składać się z 9 cyfr.")]
    public string? PhoneNumber { get; set; } = string.Empty;

    [Column("passwordHash")] public string? PasswordHash { get; set; } = null!;
    [Column("firstName")] public string? FirstName { get; set; } = string.Empty;
    [Column("lastName")] public string? LastName { get; set; } = string.Empty;
    [Column("createdAt")] public DateTime CreatedAt { get; init; } = DateTime.UtcNow;

    public ICollection<AccountRole> Roles { get; init; } = [];

    public ICollection<Address> Addresses { get; init; } = [];
    public ICollection<Order> Orders { get; init; } = [];

    public string FullName => $"{FirstName} {LastName}".Trim();
    public bool IsAdmin => Roles.Contains(AccountRole.Admin);
    public bool IsGuest => Roles.Contains(AccountRole.Guest);
    public bool IsUser => Roles.Contains(AccountRole.User);
    public bool IsRegistered => IsUser || IsAdmin;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Roles.Count == 0)
            yield return new ValidationResult("Rola użytkownika musi być określona.", [nameof(Roles)]);
        if (IsAdmin && IsGuest)
            yield return new ValidationResult("Użytkownik nie może być jednocześnie administratorem i gościem.",
                [nameof(Roles)]);
        if (IsGuest && IsUser)
            yield return new ValidationResult(
                "Użytkownik nie może być jednocześnie gościem i zarejestrowanym użytkownikiem.",
                [nameof(Roles)]);
        if (!IsGuest && !IsUser)
            yield return new ValidationResult(
                "Użytkownik musi mieć przypisaną rolę gościa lub zarejestrowanego użytkownika.",
                [nameof(Roles)]);

        if (IsGuest)
        {
            if (string.IsNullOrWhiteSpace(Email))
                yield return new ValidationResult("E-mail jest wymagany dla gości.",
                    [nameof(Email)]);
            if (string.IsNullOrWhiteSpace(PhoneNumber))
                yield return new ValidationResult("Numer telefonu jest wymagany dla gości.",
                    [nameof(PhoneNumber)]);
        }

        if (IsUser)
        {
            if (string.IsNullOrWhiteSpace(Email))
                yield return new ValidationResult("E-mail jest wymagany dla zarejestrowanych użytkowników.",
                    [nameof(Email)]);
            if (string.IsNullOrWhiteSpace(PhoneNumber))
                yield return new ValidationResult("Numer telefonu jest wymagany dla zarejestrowanych użytkowników.",
                    [nameof(PhoneNumber)]);
            if (string.IsNullOrWhiteSpace(PasswordHash))
                yield return new ValidationResult("Hasło jest wymagane dla zarejestrowanych użytkowników.",
                    [nameof(PasswordHash)]);
            if (string.IsNullOrWhiteSpace(FirstName))
                yield return new ValidationResult("Imię jest wymagane dla zarejestrowanych użytkowników.",
                    [nameof(FirstName)]);
            if (string.IsNullOrWhiteSpace(LastName))
                yield return new ValidationResult("Nazwisko jest wymagane dla zarejestrowanych użytkowników.",
                    [nameof(LastName)]);
        }

        if (IsAdmin)
        {
            if (string.IsNullOrWhiteSpace(PasswordHash))
                yield return new ValidationResult("Hasło jest wymagane dla administratorów.",
                    [nameof(PasswordHash)]);
        }
    }
}

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);

        builder.HasMany(u => u.Orders)
            .WithOne(o => o.User)
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        //
        // builder.HasMany(p => p.Orders);

        builder.Property(u => u.Roles).HasConversion<List<string>>();
    }
}