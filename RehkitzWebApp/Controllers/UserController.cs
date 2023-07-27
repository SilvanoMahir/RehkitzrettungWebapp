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
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public UserController(ApplicationDbContext context, UserManager<IdentityUser> userManager,
        RoleManager<IdentityRole> roleManager)
    {
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
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
        {
            return Ok(userDtos);
        }
        else
        {
            return NoContent();
        }
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
        {
            return NotFound();
        }

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

    // GET: /api/users/roles
    [HttpGet("roles")]
    public async Task<ActionResult<IEnumerable<RoleDto>>> GetUserRoles()
    {
        if (_context.User == null)
        {
            return NotFound();
        }

        var roleDtosList = new List<RoleDto>();

        List<string> rolesList = await _context.Roles
            .Select(x => x.Name)
            .ToListAsync();

        foreach (var role in rolesList)
        {
            var roleDto = new RoleDto
            {
                RoleName = role
            };
            roleDtosList.Add(roleDto);
        }

        if (roleDtosList.Count != 0)
        {
            return Ok(roleDtosList);
        }
        else
        {
            return NoContent();
        }
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

        try
        {
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
            {
                userInUserTable.UserRegionId = userRegionId[0].ToString();
            }

            userInUsersRolesTable.Email = userDto.UserMail;
            userInUsersRolesTable.NormalizedEmail = userDto.UserMail.ToUpper();
            userInRegionTable.ContactPersonMail = userDto.UserMail;
            userInUsersRolesTable.UserName = userDto.Username;
            userInUsersRolesTable.NormalizedUserName = userDto.Username.ToUpper();

            var userRoleId = await _context.Roles
                          .Where(x => x.Name == userDto.UserFunction)
                          .Select(x => x.Id)
                          .ToListAsync();

            var user = await _userManager.FindByIdAsync(userInUserTable.OwnerId);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User not found!" });
            }

            var newRole = await _roleManager.FindByIdAsync(userRoleId[0]);
            if (newRole == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Role does not exist!" });
            }

            var existingRoles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, existingRoles);
            await _userManager.AddToRoleAsync(user, newRole.Name);
        }
        catch
        {
            return NotFound();
        }

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
        return Ok();
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

        IdentityUser user = new()
        {
            Email = userDto.UserMail,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = userDto.Username
        };

        var MailExists = await _context.Region.FirstOrDefaultAsync(x => x.ContactPersonMail == userDto.UserMail);
        if (MailExists == null)
        {
            List<ErrorMsgDto> errorMsg = new List<ErrorMsgDto>
        {
            new ErrorMsgDto
            {
                Code = "MailaddressDoesNotExist",
                Description = "Mailaddresse von regionaler Kontaktperson existiert nicht!"
            }
            };
            return BadRequest(errorMsg);
        }

        var userManger = await _userManager.CreateAsync(user, userDto.UserPassword);
        if (userManger.Errors.Any()) 
            return BadRequest(userManger.Errors);
        
        try
        {
            await _userManager.AddToRoleAsync(user, userDto.UserFunction);
        }
        catch
        {
            return BadRequest(userManger.Errors);
        }

        var userRegion = await _context.Region
            .Where(r => r.RegionName == userDto.UserRegion) // Replace "Attribute" with the actual attribute name in your entity
            .Select(r => (int?)r.RegionId) // Replace "Id" with the actual ID property name in your entity
            .FirstOrDefaultAsync();

        var newUser = new User
        {
            OwnerId = user.Id,
            UserFirstName = userDto.UserFirstName,
            UserLastName = userDto.UserLastName,
            UserRegionId = userRegion.ToString(),
            UserDefinition = userDto.UserDefinition,
            EntryIsDeleted = false
        };

        _context.User.Add(newUser);

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