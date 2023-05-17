using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RehkitzWebApp.Model;

public class Protocol
{

    [Key]
    public int protocolId { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? protocolCode { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? clientFullName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? localName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? pilotFullName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? regionName { get; set; }

    [Column(TypeName = "nvarchar(250)")]
    public string? remark { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? areaSize { get; set; }

    [Required]
    public int foundFawns { get; set; }

    [Required]
    public int injuredFawns { get; set; }

    [Required]
    public int markedFawns { get; set; }

    [Required]
    public DateTime date { get; set; }

}
