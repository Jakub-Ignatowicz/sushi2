using FluentValidation;
using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Validators;

public class OrderProductValidator : AbstractValidator<OrderProductPostDto>
{
    public OrderProductValidator()
    {
        RuleFor(op => op.Quantity)
            .GreaterThan(0).WithMessage("Ilość musi być większa niż 0.");

        RuleFor(op => op.ProductId)
            .NotEmpty().WithMessage("Identyfikator produktu jest wymagany.");
    }
}