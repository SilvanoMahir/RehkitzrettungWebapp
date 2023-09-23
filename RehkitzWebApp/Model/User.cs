using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RehkitzWebApp.Model;

public class User
{
    [Key]
    public int UserId { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? OwnerId { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? UserFirstName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? UserLastName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? UserDefinition { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? UserRegionId { get; set; }

    [Required]
    [Column(TypeName = "bit")]
    [DefaultValue(false)]
    public bool EntryIsDeleted { get; set; }
}
