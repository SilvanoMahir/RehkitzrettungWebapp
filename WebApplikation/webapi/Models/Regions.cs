using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace webapi.Models;

public class Regions
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
    public string? contactPersonName { get; set; }
 
    [Column(TypeName = "nvarchar(50)")]
    public string? contactPersonPrename { get; set; }

    [Column(TypeName = "nvarchar(50)")]
    public string? contactPersonMail { get; set; }

}
