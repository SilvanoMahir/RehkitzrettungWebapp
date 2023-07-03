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
            ContactPersonMail = region.ContactPersonMail,
            EntryIsDeleted = region.EntryIsDeleted
        };
    }

    public static Region ToRegion(this RegionDto regionDto)
    {
        return new Region
        {
            RegionId = regionDto.RegionId,
            RegionName = regionDto.RegionName,
            RegionState = regionDto.RegionState,
            ContactPersonFirstName = regionDto.ContactPersonFirstName,
            ContactPersonLastName = regionDto.ContactPersonLastName,
            ContactPersonMail = regionDto.ContactPersonMail,
            EntryIsDeleted = regionDto.EntryIsDeleted
        };
    }
}