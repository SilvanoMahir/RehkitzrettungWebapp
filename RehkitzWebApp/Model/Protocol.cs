using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RehkitzWebApp.Model;

public class Protocol
{

    [Key]
    public int ProtocolId { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? ProtocolCode { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? ClientFullName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? LocalName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? PilotFullName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? RegionName { get; set; }

    [Column(TypeName = "nvarchar(250)")]
    public string? Remark { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? AreaSize { get; set; }

    [Required]
    public int FoundFawns { get; set; }
    [Required]
    public int EscapedFawns { get; set; }

    [Required]
    public int InjuredFawns { get; set; }

    [Required]
    public int MarkedFawns { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    [Column(TypeName = "bit")]
    [DefaultValue(false)]
    public bool EntryIsDeleted { get; set; }
}
