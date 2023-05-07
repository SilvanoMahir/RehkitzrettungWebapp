using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace webapi.Models;

public class Protocols
{

    [Key]
    public int protocolId { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? protocolCode { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? clientName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? localName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? pilotName { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? regionName { get; set; }

    [Column(TypeName = "nvarchar(250)")]
    public string? remark { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public string? areaName { get; set; }

    [Required]
    public int foundFawns { get; set; }

    [Required]
    public int injuredFawns { get; set; }

    [Required]
    public int markedFawns { get; set; }

    [Required]
    public DateTime date { get; set; }

}
