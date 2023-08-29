namespace RehkitzWebApp.Model.Dtos;

public class UserDto
{
    public int UserId { get; set; }
    public string UserFirstName { get; set; }
    public string UserLastName { get; set; }
    public string? UserDefinition { get; set; }
    public string? UserFunction { get; set; }
    public string? UserRegion { get; set; }
    public string? UserName { get; set; }
    public string? UserEmail { get; set; }
    public string? UserPassword { get; set; }
}
