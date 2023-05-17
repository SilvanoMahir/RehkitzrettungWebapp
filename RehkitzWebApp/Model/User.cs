using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RehkitzWebApp.Model;

public class User
{

    [Key]
    public int userId { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? userFirstName { get; set; }

    [Column(TypeName = "nvarchar(50)")]
    public string? userLastName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? userRole { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? userMail { get; set; }

}
