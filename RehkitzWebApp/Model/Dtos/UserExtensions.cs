namespace RehkitzWebApp.Model.Dtos;

public static class UserExtensions
{
    public static UserDto ToUserDto(this User user)
    {
        return new UserDto
        {
            UserId = user.UserId,
            UserDefinition = "Zentrale Scuol",
            UserFunction = "Zentrale",
            UserStateRegion = "GR/Scuol",
            UserFirstName = user.UserFirstName,
            UserLastName = user.UserLastName,
            UserMail = "bsp@mail.com",
            UserPassword = "Password"
        };
    }

    public static UserSmallDto ToUserSmallListDto(this UserDto user)
    {
        return new UserSmallDto
        {
            UserId = user.UserId,
            UserDefinition = user.UserDefinition,
            UserFunction = user.UserFunction,
            UserStateRegion = user.UserStateRegion
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
            UserRegionId = userDto.UserStateRegion,
            EntryIsDeleted = entryIsDeleted
        };
    }
}
