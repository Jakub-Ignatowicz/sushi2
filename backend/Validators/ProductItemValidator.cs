using FluentValidation;
using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Validators;

public class ProductItemValidator : AbstractValidator<ProductItem>
{
    public ProductItemValidator()
    {
        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Opis produktu jest wymagany.")
            .MaximumLength(256).WithMessage("Opis produktu nie może przekraczać 256 znaków.");

        RuleFor(x => x.Quantity)
            .GreaterThan(0).WithMessage("Numer musi być większy niż 0.");

        // RuleFor(x => x.NumberSuffix)
        //     .NotEmpty().WithMessage("Suffix nie może być pusty.")
        //     .MaximumLength(10).WithMessage("Suffix nie może przekraczać 10 znaków.")
        //     .When(x => x.NumberSuffix is not null);
    }
}