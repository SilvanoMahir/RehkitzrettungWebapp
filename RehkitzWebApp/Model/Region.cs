using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RehkitzWebApp.Model;

public class Region
{

    [Key]
    public int RegionId { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? RegionName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? RegionState { get; set; }
}
