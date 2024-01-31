namespace RehkitzWebApp.Model.Dtos;

public class ProtocolDto
{
    public int ProtocolId { get; set; }
    public string? ProtocolCode { get; set; }
    public string? ClientFullName { get; set; }
    public string? LocalName { get; set; }
    public string? PilotFullName { get; set; }
    public string? RegionName { get; set; }
    public string? Remark { get; set; }
    public string? AreaSize { get; set; }
    public int FoundFawns { get; set; }
    public int InjuredFawns { get; set; }
    public int EscapedFawns { get; set; }
    public int MarkedFawns { get; set; }
    public DateTime Date { get; set; }
}
