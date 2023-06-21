using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RehkitzWebApp.Model;

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
}
