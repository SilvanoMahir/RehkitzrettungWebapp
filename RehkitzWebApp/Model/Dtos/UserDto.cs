namespace RehkitzWebApp.Model.Dtos;

public class UserDto
{
    public int UserId { get; set; }
    public string? OwnerId { get; set; }
    public string? UserFirstName { get; set; }
    public string? UserLastName { get; set; }
    public string? UserRegionId { get; set; }
}
