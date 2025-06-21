using SushiZume.Models;
using FluentValidation;

namespace SushiZume.Validators;

public class UserValidator : AbstractValidator<User>
{
    public UserValidator()
    {
        RuleFor(x => x.Email).NotEmpty().Length(1, 50);
        // RuleFor(x => x.FirstName).InclusiveBetween(18, 100);
    }
}