using Microsoft.AspNetCore.Identity;

public class CustomIdentityErrorDescriber : IdentityErrorDescriber
{
    public override IdentityError PasswordTooShort(int length)
    {
        return new IdentityError
        {
            Code = nameof(PasswordTooShort),
            Description = $"Passwort muss mindestens {length} Zeichen haben."
        };
    }

    public override IdentityError PasswordRequiresDigit()
    {
        return new IdentityError
        {
            Code = nameof(PasswordRequiresDigit),
            Description = "Passwort muss mindestens eine Zahl haben ('0'-'9')."
        };
    }

    public override IdentityError PasswordRequiresNonAlphanumeric()
    {
        return new IdentityError
        {
            Code = nameof(PasswordRequiresNonAlphanumeric),
            Description = "Passwort muss mindestens einen spezielles Zeichen haben (@,#,!)."
        };
    }

    public override IdentityError PasswordRequiresUpper()
    {
        return new IdentityError
        {
            Code = nameof(PasswordRequiresUpper),
            Description = "Passwort muss mindestens ein Zeichen haben, dass Grossgeschrieben ist (A-Z)."
        };
    }

    public override IdentityError InvalidUserName(string username)
    {
        return new IdentityError
        {
            Code = nameof(InvalidUserName),
            Description = $"Benutzername '{username}' ist ungültig. Es sind nur Buchstaben oder Zahlen erlaubt."
        };
    }
}