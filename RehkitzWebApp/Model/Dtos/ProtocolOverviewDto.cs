namespace RehkitzWebApp.Model.Dtos;

public class ProtocolOverviewDto
{
    public int NumberOfProtocols { get; set; }
    public int FoundFawns { get; set; }
    public int InjuredFawns { get; set; }
    public int MarkedFawns { get; set; }
    public int EscapedFawns { get; set; }
    public string? DistrictName { get; set; }
}