using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models;

public class Region
{

    [Key]
    public int regionId { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? regionName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? regionState { get; set; }

    [Column(TypeName = "nvarchar(50)")]
    public string? contactPersonLastName { get; set; }
 
    [Column(TypeName = "nvarchar(50)")]
    public string? contactPersonFirstName{ get; set; }

    [Column(TypeName = "nvarchar(50)")]
    public string? contactPersonMail { get; set; }

}
