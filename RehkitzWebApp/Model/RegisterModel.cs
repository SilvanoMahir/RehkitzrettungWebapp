using System.ComponentModel.DataAnnotations;

namespace RehkitzWebApp.Model;

public class RegisterModel
{
    [Required(ErrorMessage = "User Name is required")]
    public string? Username { get; set; }

    [EmailAddress]
    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; set; }

    [Required(ErrorMessage = "User definition is required")]
    public string? UserDefinition { get; set; }

    [Required(ErrorMessage = "User first name is required")]
    public string? UserFirstName { get; set; }

    [Required(ErrorMessage = "User last name is required")]
    public string? UserLastName { get; set; }

    [Required(ErrorMessage = "User region is required")]
    public string? UserRegion { get; set; }
}
