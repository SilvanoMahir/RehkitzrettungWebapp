using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RehkitzWebApp.Model;

public class Area
{
    [Key]
    public int AreaId { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? AreaSize { get; set; }

    [Required]
    [Column(TypeName = "bit")]
    [DefaultValue(false)]
    public bool EntryIsDeleted { get; set; }
}
