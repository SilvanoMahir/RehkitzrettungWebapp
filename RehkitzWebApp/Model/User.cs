using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RehkitzWebApp.Model;

public class User
{
    [Key]
    public int userId { get; set; }

    [Required]
    // user ID from AspNetUser table. In this table username and Email are stored. With this ID the Role is linked. 
    [Column(TypeName = "nvarchar(50)")]
    public string? ownerId { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? userFirstName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? userLastName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? userRegionId { get; set; }
}
