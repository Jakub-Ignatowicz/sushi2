using FluentValidation;
using SushiZume.DTOs;

namespace SushiZume.Validators;

public class OrderValidator : AbstractValidator<OrderPostDto>
{
    public OrderValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage(" Email jest wymagany.")
            .EmailAddress().WithMessage("Email musi być poprawnym adresem email.");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Numer telefonu jest wymagany.")
            .Matches(@"^\d{9}$").WithMessage("Numer telefonu musi składać się z 9 cyfr.");

        RuleFor(x => x.PeopleCount)
            .GreaterThan(0).WithMessage("Liczba osób musi być większa niż 0.");

        RuleFor(x => x.Notes)
            .MaximumLength(500).WithMessage("Notatki nie mogą przekraczać 500 znaków.");

        RuleFor(x => x.PaymentMethod)
            .IsInEnum().WithMessage("Nieprawidłowa metoda płatności.");

        RuleFor(x => x.Address)
            .NotNull().WithMessage("Adres jest wymagany.")
            .SetValidator(new AddressValidator());

        RuleForEach(x => x.OrderProducts)
            .SetValidator(new OrderProductValidator());
    }
}