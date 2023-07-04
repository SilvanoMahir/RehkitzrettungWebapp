namespace RehkitzWebApp.Model.Dtos;

public static class UserExtensions
{
    public static UserDto ToDto(this User user)
    {
        return new UserDto
        {
            UserId = user.UserId,
            OwnerId = user.OwnerId,
            UserFirstName = user.UserFirstName,
            UserLastName = user.UserLastName,
            UserRegionId = user.UserRegionId,
        };
    }

    public static User ToUserEntity(this UserDto userDto, bool entryIsDeleted)
    {
        return new User
        {
            UserId = userDto.UserId,
            OwnerId = userDto.OwnerId,
            UserFirstName = userDto.UserFirstName,
            UserLastName = userDto.UserLastName,
            UserRegionId = userDto.UserRegionId,
            EntryIsDeleted = entryIsDeleted,
        };
    }
}
