using SushiZume.Models;
using FluentValidation;
using SushiZume.DTOs;

namespace SushiZume.Validators;

public class UserValidator : AbstractValidator<UserPostDto>
{
    public UserValidator()
    {
        RuleFor(x => x)
            .Must(dto => dto.Guest is not null ^ dto.Normal is not null)
            .WithMessage("Tylko jedna forma rejestracji jest dozwolona: gość lub normalna.");

        When(u => u.Guest is not null, () =>
        {
            RuleFor(x => x.Guest!.PhoneNumber)
                .NotEmpty().WithMessage("Numer telefonu jest wymagany.")
                .Matches(@"^\d{9}$").WithMessage("Numer telefonu musi składać się z 9 cyfr.");

            RuleFor(x => x.Guest!.Email)
                .NotEmpty().WithMessage("Email jest wymagany.")
                .EmailAddress().WithMessage("Email musi być poprawnym adresem email.");
        });

        When(u => u.Normal is not null, () =>
        {
            RuleFor(x => x.Normal!.PhoneNumber)
                .NotEmpty().WithMessage("Numer telefonu jest wymagany.")
                .Matches(@"^\d{9}$").WithMessage("Numer telefonu musi składać się z 9 cyfr.");

            RuleFor(x => x.Normal!.Email)
                .NotEmpty().WithMessage("Email jest wymagany.")
                .EmailAddress().WithMessage("Email musi być poprawnym adresem email.");

            RuleFor(x => x.Normal!.Password)
                .NotEmpty().WithMessage("Hasło jest wymagane.")
                .MinimumLength(6).WithMessage("Hasło musi mieć co najmniej 6 znaków.")
                .MaximumLength(100).WithMessage("Hasło nie może przekraczać 100 znaków.");

            RuleFor(x => x.Normal!.ConfirmPassword)
                .Equal(x => x.Normal!.Password).WithMessage("Hasła muszą się zgadzać.");

            RuleFor(x => x.Normal!.FirstName)
                .NotEmpty().WithMessage("Imię jest wymagane.")
                .MaximumLength(50).WithMessage("Imię nie może przekraczać 50 znaków.");

            RuleFor(x => x.Normal!.LastName)
                .NotEmpty().WithMessage("Nazwisko jest wymagane.")
                .MaximumLength(50).WithMessage("Nazwisko nie może przekraczać 50 znaków.");
        });
    }
}

public class ChangePasswordValidator : AbstractValidator<UserChangePasswordDto>
{
    public ChangePasswordValidator()
    {
        RuleFor(x => x.OldPassword)
            .NotEmpty().WithMessage("Stare hasło jest wymagane.");

        RuleFor(x => x.NewPassword)
            .NotEmpty().WithMessage("Nowe hasło jest wymagane.")
            .MinimumLength(6).WithMessage("Nowe hasło musi mieć co najmniej 6 znaków.")
            .MaximumLength(100).WithMessage("Nowe hasło nie może przekraczać 100 znaków.");

        RuleFor(x => x.ConfirmNewPassword)
            .Equal(x => x.NewPassword).WithMessage("Hasła muszą się zgadzać.");
    }
}

public class UserResetPasswordValidator : AbstractValidator<UserResetPasswordDto>
{
    public UserResetPasswordValidator()
    {
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Hasło jest wymagane.")
            .MinimumLength(6).WithMessage("Hasło musi mieć co najmniej 6 znaków.")
            .MaximumLength(100).WithMessage("Hasło nie może przekraczać 100 znaków.");

        RuleFor(x => x.ConfirmPassword)
            .Equal(x => x.Password).WithMessage("Hasła muszą się zgadzać.");
    }
}