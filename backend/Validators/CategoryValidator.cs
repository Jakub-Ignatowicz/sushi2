using FluentValidation;
using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Validators;

public class CategoryValidator : AbstractValidator<CategoryPostDto>
{
    public CategoryValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Nazwa kategorii jest wymagana.")
            .MaximumLength(100).WithMessage("Nazwa kategorii nie może przekraczać 100 znaków.");

        RuleFor(x => x.Description)
            .MaximumLength(256).WithMessage("Dzielnica nie może przekraczać 256 znaków.");
    }
}
