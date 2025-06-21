using FluentValidation;
using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Validators;

public class ProductValidator : AbstractValidator<ProductPostDto>
{
    public ProductValidator()
    {
        RuleFor(p => p.Name)
            .NotEmpty().WithMessage("Nazwa produktu jest wymagana.")
            .MaximumLength(100).WithMessage("Nazwa produktu nie może przekraczać 100 znaków.");

        RuleFor(p => p.Price)
            .GreaterThan(0).WithMessage("Cena produktu musi być większa niż 0.");

        RuleFor(p => p.Amount)
            .GreaterThan(0).WithMessage("Ilość produktu musi być większa niż 0.");

        RuleFor(p => p.ImagePath)
            .NotEmpty().WithMessage("Ścieżka do obrazu produktu jest wymagana.")
            .Must(BeAValidUrl).WithMessage("Ścieżka do obrazu musi być poprawnym adresem URL.");

        RuleFor(p => p.AmountUnit)
            .NotEmpty().WithMessage("Jednostka miary produktu jest wymagana.")
            .MaximumLength(50).WithMessage("Jednostka miary nie może przekraczać 50 znaków.");

        RuleForEach(p => p.ProductItems)
            .SetValidator(new ProductItemValidator());
    }

    private bool BeAValidUrl(string url)
    {
        return Uri.TryCreate(url, UriKind.Absolute, out var uriResult)
               && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
    }
}

public class ProductUpdateValidator : AbstractValidator<ProductUpdateDto>
{
    public ProductUpdateValidator()
    {
        RuleFor(p => p.Name)
            .MaximumLength(100).WithMessage("Nazwa produktu nie może przekraczać 100 znaków.");

        RuleFor(p => p.Price)
            .GreaterThan(0).When(p => p.Price.HasValue).WithMessage("Cena produktu musi być większa niż 0.");

        RuleFor(p => p.Amount)
            .GreaterThan(0).When(p => p.Amount.HasValue).WithMessage("Ilość produktu musi być większa niż 0.");

        RuleFor(p => p.ImagePath)
            .Must(BeAValidUrl).When(p => !string.IsNullOrEmpty(p.ImagePath))
            .WithMessage("Ścieżka do obrazu musi być poprawnym adresem URL.");

        RuleFor(p => p.AmountUnit)
            .MaximumLength(50).When(p => !string.IsNullOrEmpty(p.AmountUnit))
            .WithMessage("Jednostka miary nie może przekraczać 50 znaków.");
    }

    private bool BeAValidUrl(string url)
    {
        return Uri.TryCreate(url, UriKind.Absolute, out var uriResult)
               && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
    }
}