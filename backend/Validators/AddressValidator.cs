using FluentValidation;
using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Validators;

public class AddressValidator : AbstractValidator<AddressPostDto>
{
    public AddressValidator()
    {
        RuleFor(x => x.City)
            .NotEmpty().WithMessage("Miasto jest wymagane.")
            .MaximumLength(100).WithMessage("Miasto nie może przekraczać 100 znaków.");

        RuleFor(x => x.District)
            .NotEmpty().WithMessage("Dzielnica jest wymagana.")
            .MaximumLength(100).WithMessage("Dzielnica nie może przekraczać 100 znaków.");

        RuleFor(x => x.Street)
            .NotEmpty().WithMessage("Ulica jest wymagana.")
            .MaximumLength(100).WithMessage("Ulica nie może przekraczać 100 znaków.");

        RuleFor(x => x.HomeNumber)
            .NotEmpty().WithMessage("Numer domu jest wymagany.")
            .MaximumLength(10).WithMessage("Numer domu nie może przekraczać 10 znaków.");

        RuleFor(x => x.ApartmentNumber)
            .MaximumLength(10).WithMessage("Numer mieszkania nie może przekraczać 10 znaków.")
            .When(x => !string.IsNullOrEmpty(x.ApartmentNumber));

        RuleFor(x => x.Floor)
            .InclusiveBetween(0, 100).WithMessage("Piętro musi być liczbą całkowitą między 0 a 100.")
            .When(x => x.Floor.HasValue);
    }
}