using FluentValidation;
using SushiZume.DTOs;
using SushiZume.Models;

namespace SushiZume.Validators;

public class OrderValidator : AbstractValidator<Order>
{
    public OrderValidator()
    {
        RuleFor(x => x.PeopleCount)
            .GreaterThan(0).WithMessage("Liczba osób musi być większa niż 0.");

        RuleFor(x => x.Notes)
            .MaximumLength(500).WithMessage("Notatki nie mogą przekraczać 500 znaków.");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Numer telefonu jest wymagany.")
            .Matches(@"^\d{9}$").WithMessage("Numer telefonu musi składać się z 9 cyfr.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email jest wymagany.")
            .EmailAddress().WithMessage("Email musi być poprawnym adresem email.");

        RuleFor(x => x.PaymentMethod)
            .IsInEnum().WithMessage("Nieprawidłowa metoda płatności.");

        RuleForEach(x => x.OrderProducts)
            .SetValidator(new OrderProductValidator());

        RuleFor(x => x.Address)
            .SetValidator(new AddressValidator());
    }
}