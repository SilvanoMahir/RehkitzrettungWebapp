using RehkitzWebApp.Model;
using RehkitzWebApp.Model.Dtos;

public static class RegionExtensions
{
    public static RegionDto ToDto(this Region region)
    {
        return new RegionDto
        {
            RegionId = region.RegionId,
            RegionName = region.RegionName,
            RegionState = region.RegionState,
            ContactPersonFirstName = region.ContactPersonFirstName,
            ContactPersonLastName = region.ContactPersonLastName,
            ContactPersonEmail = region.ContactPersonEmail,
        };
    }

    public static Region ToRegionEntity(this RegionDto regionDto, bool entryIsDeleted)
    {
        return new Region
        {
            RegionId = regionDto.RegionId,
            RegionName = regionDto.RegionName,
            RegionState = regionDto.RegionState,
            ContactPersonFirstName = regionDto.ContactPersonFirstName,
            ContactPersonLastName = regionDto.ContactPersonLastName,
            ContactPersonEmail = regionDto.ContactPersonEmail,
            EntryIsDeleted = entryIsDeleted,
        };
    }
}