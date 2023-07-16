using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.Model;
using RehkitzWebApp.Model.Dtos;

namespace webapi.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: /api/users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserSmallDto>>> GetUser()
    {
        if (_context.User == null)
        {
            return NotFound();
        }

        var users = await _context.User
            .Where(p => p.EntryIsDeleted == false)
            .ToListAsync();

        var userDtos = new List<UserSmallDto>();

        foreach (var user in users)
        {
            var userRegion = await _context.Region.FindAsync(int.Parse(user.UserRegionId));
            var userRoleId = await _context.UserRoles
                                    .Where(x => x.UserId == user.OwnerId)
                                    .Select(x => x.RoleId)
                                    .ToListAsync();
            var username = await _context.Users
                                    .Where(x => x.Id == user.OwnerId)
                                    .Select(x => x.UserName)
                                    .ToListAsync();

            if (userRoleId.Count != 0)
            {
                var userRole = await _context.Roles.FindAsync(userRoleId[0]);
                var userDto = getUserDto(user, userRegion, userRole.Name, username[0]);
                userDtos.Add(userDto.ToUserSmallListDto());
            }
            else
            {
                return NoContent();
            }
        }

        if (userDtos.Count != 0)
            return Ok(userDtos);
        else
            return NoContent();
    }

    // GET: /api/users/5
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
        if (_context.User == null)
        {
            return NotFound();
        }

        var userRole = "";
        var user = await _context.User.FindAsync(id);
        if (user == null)
            return NotFound();

        var userRegion = await _context.Region.FindAsync(int.Parse(user.UserRegionId));
        var userRoleId = await _context.UserRoles
                                .Where(x => x.UserId == user.OwnerId)
                                .Select(x => x.RoleId)
                                .ToListAsync();

        var username = await _context.Users
                        .Where(x => x.Id == user.OwnerId)
                        .Select(x => x.UserName)
                        .ToListAsync();

        if (userRoleId.Count != 0)
        {
            var userRoleItem = await _context.Roles.FindAsync(userRoleId[0]);
            userRole = userRoleItem.Name;
        }
        else
        {
            return NotFound();
        }

        if (user == null || userRegion == null)
        {
            return NotFound();
        }
        return Ok(getUserDto(user, userRegion, userRole, username[0]));
    }

    // PUT: /api/users/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<ActionResult> PutUser(int id, UserDto userDto)
    {
        if (id != userDto.UserId)
        {
            return BadRequest();
        }

        var userInUserTable = await _context.User.FindAsync(userDto.UserId);
        var userInUsersRolesTable = await _context.Users.FindAsync(userInUserTable.OwnerId);
        var userInUserRolesTable = await _context.UserRoles.FirstOrDefaultAsync(x => x.UserId == userInUserTable.OwnerId);
        var userInRegionTable = await _context.Region.FirstOrDefaultAsync(x => x.RegionId == int.Parse(userInUserTable.UserRegionId));


        userInUserTable.UserFirstName = userDto.UserFirstName;
        userInUserTable.UserLastName = userDto.UserLastName;
        userInUserTable.UserDefinition = userDto.UserDefinition;

        // find the region Id for the new region 
        var userRegionId = await _context.Region
                            .Where(x => x.RegionName == userDto.UserRegion)
                            .Select(x => x.RegionId)
                            .ToListAsync();

        if (userRegionId[0] != null)
            userInUserTable.UserRegionId = userRegionId[0].ToString();

        userInUsersRolesTable.Email = userDto.UserMail;
        userInUsersRolesTable.NormalizedEmail = userDto.UserMail.ToUpper();
        userInRegionTable.ContactPersonMail = userDto.UserMail;
        userInUsersRolesTable.UserName = userDto.Username;
        userInUsersRolesTable.NormalizedUserName = userDto.Username.ToUpper();


        // updating user does not work:
        // System.InvalidOperationException: The property 'IdentityUserRole<string>.RoleId' is part of a key and so cannot
        // be modified or marked as modified. To change the principal of an existing entity with an identifying foreign key,
        // first delete the dependent and invoke 'SaveChanges', and then associate the dependent with the new principal.
        // solution --> delete old user, create new; Problem Changes UserId 
        var userRoleId = await _context.Roles
                      .Where(x => x.Name == userDto.UserFunction)
                      .Select(x => x.Id)
                      .ToListAsync();

        userInUserRolesTable.RoleId = userRoleId[0].ToString();

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return NoContent();
    }

    // POST: /api/users
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<UserDto>> PostUser(UserDto userDto)
    {
        if (_context.User == null)
        {
            return NotFound();
        }

        bool entryIsDeleted = false;
        var user = userDto.ToUserEntity(entryIsDeleted);
        _context.User.Add(user);
        await _context.SaveChangesAsync();

        return Ok(userDto);
    }

    // DELETE: /api/users/5
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUser(int id)
    {
        if (_context.User == null)
        {
            return NotFound();
        }
        var user = await _context.User.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        user.EntryIsDeleted = true;
        _context.Entry(user).State = EntityState.Modified;
        _context.SaveChanges();

        return NoContent();
    }

    private bool UserExists(int id)
    {
        return (_context.User?.Any(e => e.UserId == id)).GetValueOrDefault();
    }

    private UserDto getUserDto(User user, Region region, string userRole, string username)
    {
        // the fixed comments depends on the Role which has to be linked first
        return new UserDto
        {
            UserId = user.UserId,
            UserDefinition = user.UserDefinition,
            UserFunction = userRole,
            UserRegion = region.RegionName,
            UserFirstName = user.UserFirstName,
            UserLastName = user.UserLastName,
            UserMail = region.ContactPersonMail,
            Username = username,
            UserPassword = "Password"
        };
    }
}