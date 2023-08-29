namespace RehkitzWebApp.Model.Dtos;

public static class UserExtensions
{
    public static UserSmallDto ToUserSmallListDto(this UserDto user)
    {
        return new UserSmallDto
        {
            UserId = user.UserId,
            UserDefinition = user.UserDefinition,
            UserFunction = user.UserFunction,
            UserRegion = user.UserRegion
        };
    }

    public static User ToUserEntity(this UserDto userDto, bool entryIsDeleted)
    {
        return new User
        {
            UserId = userDto.UserId,
            OwnerId = "0",
            UserFirstName = userDto.UserFirstName,
            UserLastName = userDto.UserLastName,
            UserRegionId = userDto.UserRegion,
            EntryIsDeleted = entryIsDeleted,
            UserDefinition = userDto.UserDefinition
        };
    }
}
