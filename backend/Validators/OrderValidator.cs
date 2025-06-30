using FluentValidation;
using SushiZume.DTOs;

namespace SushiZume.Validators;

public class OrderValidator : AbstractValidator<OrderPostDto>
{
    public OrderValidator()
    {
        RuleFor(x => x.PeopleCount)
            .GreaterThan(0).WithMessage("Liczba osób musi być większa niż 0.");

        RuleFor(x => x.Notes)
            .MaximumLength(500).WithMessage("Notatki nie mogą przekraczać 500 znaków.");

        RuleFor(x => x.PaymentMethod)
            .IsInEnum().WithMessage("Nieprawidłowa metoda płatności.");

        RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("Identyfikator użytkownika jest wymagany.")
            .Must(x => x != Guid.Empty).WithMessage("Identyfikator użytkownika nie może być pusty.");

        RuleFor(x => x.AddressId)
            .NotEmpty().WithMessage("Identyfikator adresu jest wymagany.")
            .Must(x => x != Guid.Empty).WithMessage("Identyfikator adresu nie może być pusty.");

        RuleForEach(x => x.OrderProducts)
            .SetValidator(new OrderProductValidator());
    }
}
