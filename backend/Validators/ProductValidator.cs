using FluentValidation;
using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Validators;

public class ProductValidator : AbstractValidator<Product>
{
    public ProductValidator()
    {
        RuleFor(p => p.Name)
            .NotEmpty().WithMessage("Nazwa produktu jest wymagana.")
            .MaximumLength(100).WithMessage("Nazwa produktu nie może przekraczać 100 znaków.");

        RuleFor(p => p.Price)
            .GreaterThan(0).WithMessage("Cena produktu musi być większa niż 0.");

        RuleFor(p => p.Amount)
            .GreaterThan(0).WithMessage("Ilość produktu musi być większa niż 0.")
            .When(p => p.Amount != null);

        RuleFor(p => p.AmountUnit)
            .MaximumLength(50).WithMessage("Jednostka miary nie może przekraczać 50 znaków.")
            .When(p => !string.IsNullOrWhiteSpace(p.AmountUnit));

        RuleFor(p => p.Description)
            .MaximumLength(500).WithMessage("Opis produktu nie może przekraczać 500 znaków.")
            .When(p => !string.IsNullOrWhiteSpace(p.Description));

        RuleForEach(p => p.Items)
            .SetValidator(new ProductItemValidator());
    }
}