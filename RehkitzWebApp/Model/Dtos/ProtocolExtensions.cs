namespace RehkitzWebApp.Model.Dtos;

public static class ProtocolExtensions
{
    public static ProtocolDto ToDto(this Protocol protocol)
    {
        return new ProtocolDto
        {
            ProtocolId = protocol.ProtocolId,
            ProtocolCode = protocol.ProtocolCode,
            ClientFullName = protocol.ClientFullName,
            LocalName = protocol.LocalName,
            PilotFullName = protocol.PilotFullName,
            RegionName = protocol.RegionName,
            Remark = protocol.Remark,
            AreaSize = protocol.AreaSize,
            FoundFawns = protocol.FoundFawns,
            InjuredFawns = protocol.InjuredFawns,
            MarkedFawns = protocol.MarkedFawns,
            Date = protocol.Date.ToShortDateString(),
        };
    }

    public static Protocol ToProtocolEntity(this ProtocolDto protocolDto, bool entryIsDeleted)
    {
        return new Protocol
        {
            ProtocolId = protocolDto.ProtocolId,
            ProtocolCode = protocolDto.ProtocolCode,
            ClientFullName = protocolDto.ClientFullName,
            LocalName = protocolDto.LocalName,
            PilotFullName = protocolDto.PilotFullName,
            RegionName = protocolDto.RegionName,
            Remark = protocolDto.Remark,
            AreaSize = protocolDto.AreaSize,
            FoundFawns = protocolDto.FoundFawns,
            InjuredFawns = protocolDto.InjuredFawns,
            MarkedFawns = protocolDto.MarkedFawns,
            Date = DateTime.Parse(protocolDto.Date),
            EntryIsDeleted = entryIsDeleted,
        };
    }
}
