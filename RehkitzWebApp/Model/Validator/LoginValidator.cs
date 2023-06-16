using FluentValidation;
using RehkitzWebApp.Model.DTOs;

namespace RehkitzWebApp.Model.Validator
{
    public class LoginValidator : AbstractValidator<LoginDTO>
    {
        public LoginValidator() {
            RuleFor(x => x.Username).NotEmpty().WithMessage("Username wird benötigt");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Password wird benötigt");
        }
    }
}
