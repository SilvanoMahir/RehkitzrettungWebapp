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
            EntryIsDeleted = user.EntryIsDeleted
        };
    }

    public static User ToUser(this UserDto userDto)
    {
        return new User
        {
            UserId = userDto.UserId,
            OwnerId = userDto.OwnerId,
            UserFirstName = userDto.UserFirstName,
            UserLastName = userDto.UserLastName,
            UserRegionId = userDto.UserRegionId,
            EntryIsDeleted = userDto.EntryIsDeleted
        };
    }
}
