using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.Model;
using RehkitzWebApp.Model.Dtos;

namespace webapi.Controllers;

[Authorize]
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
    public async Task<ActionResult<IEnumerable<UserSmallDto>>> GetUser([FromQuery(Name = "userId")] string userId)
    {
        if (_context.User == null)
        {
            return NotFound();
        }

        // get user district and the regions part of this district 
        var userInUserList = await _context.User.FindAsync(int.Parse(userId));
        var userRegionIdTable = await _context.Region
                                .Where(p => p.RegionId == int.Parse(userInUserList.UserRegionId))
                                .ToListAsync();

        var userDistrict = userRegionIdTable[0].RegionDistrict;
        var userRegionListFromDistrict = await _context.Region
                                                .Where(p => p.RegionDistrict == userDistrict)
                                                .Select(p => p.RegionId.ToString())
                                                .ToListAsync();


        // get logged in user role
        var loggedInUserRoleId = await _context.UserRoles
                                            .Where(x => x.UserId == userInUserList.OwnerId)
                                            .Select(x => x.RoleId)
                                            .ToListAsync();

        var loggedInUserRole = await _context.Roles.FindAsync(loggedInUserRoleId[0]);

        List<User> userList = new List<User>();
        if (loggedInUserRole.Name == "Admin")
        {
            userList = await _context.User
                                .Where(p => p.EntryIsDeleted == false)
                                .ToListAsync();
        }
        else
        {
            userList = await _context.User
                                .Where(p => p.EntryIsDeleted == false && userRegionListFromDistrict.Contains(p.UserRegionId))
                                .ToListAsync();
        }

        var userDtos = new List<UserSmallDto>();

        foreach (var user in userList)
        {
            var userRegion = await _context.Region.FindAsync(int.Parse(user.UserRegionId));
            var userRoleId = await _context.UserRoles
                                    .Where(x => x.UserId == user.OwnerId)
                                    .Select(x => x.RoleId)
                                    .ToListAsync();
            var userName = await _context.Users
                                    .Where(x => x.Id == user.OwnerId)
                                    .Select(x => x.UserName)
                                    .ToListAsync();

            if (userRoleId.Count != 0)
            {
                var userRole = await _context.Roles.FindAsync(userRoleId[0]);
                if (loggedInUserRole.Name == "Admin" || userRole.Name != "Admin")
                {
                    var userEmail = await _context.Region
                                            .Where(x => x.RegionId == userRegion.RegionId)
                                            .Select(x => x.ContactPersonEmail)
                                            .FirstOrDefaultAsync();

                    var userDto = getUserDto(user, userRegion, userRole.Name, userName[0], userEmail);
                    userDtos.Add(userDto.ToUserSmallListDto());
                }
            }
        }

        // if (searchString != "getAllUsers")
        // {
        //     searchString = searchString.ToLower();
        //     userDtos = userDtos.Where(u => u.UserId.ToString()!.Contains(searchString) ||
        //                                    u.UserDefinition!.ToLower().Contains(searchString) ||
        //                                    u.UserFunction!.ToLower().Contains(searchString) ||
        //                                    u.UserRegion!.ToLower().Contains(searchString)).ToList();
        // }

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

        var userEmail = await _context.Region
                                .Where(x => x.RegionId == userRegion.RegionId)
                                .Select(x => x.ContactPersonEmail)
                                .ToListAsync();

        var userName = await _context.Users
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
        return Ok(getUserDto(user, userRegion, userRole, userName[0], userEmail[0]));
    }

    // GET: /api/users/roles
    [HttpGet("roles")]
    public async Task<ActionResult<IEnumerable<RoleDto>>> GetUserRoles([FromQuery(Name = "userId")] string userId)
    {
        if (_context.User == null)
        {
            return NotFound();
        }

        // get logged in user role
        var userInUserList = await _context.User.FindAsync(int.Parse(userId));
        var userRoleIdList = await _context.UserRoles
                                    .Where(x => x.UserId == userInUserList.OwnerId)
                                    .Select(x => x.RoleId)
                                    .ToListAsync();

        var userRole = await _context.Roles.FindAsync(userRoleIdList[0]);

        var roleDtosList = new List<RoleDto>();
        List<string> rolesList = new List<string>();

        if (userRole.Name == "Admin")
        {
            rolesList = await _context.Roles
                                .Select(x => x.Name)
                                .ToListAsync();
        }
        else
        {
            rolesList = await _context.Roles
                                .Where(x => x.Name != "Admin")
                                .Select(x => x.Name)
                                .ToListAsync();
        }

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

            var userEmail = await _context.Region
                .Where(r => r.RegionName == userDto.UserRegion)
                .Select(r => r.ContactPersonEmail)
                .FirstOrDefaultAsync();

            userInUsersRolesTable.Email = userEmail;
            userInUsersRolesTable.NormalizedEmail = userEmail.ToUpper();
            userInRegionTable.ContactPersonEmail = userEmail;
            userInUsersRolesTable.UserName = userDto.UserName;
            userInUsersRolesTable.NormalizedUserName = userDto.UserName.ToUpper();

            var userRoleId = await _context.Roles
                          .Where(x => x.Name == userDto.UserFunction)
                          .Select(x => x.Id)
                          .ToListAsync();

            var user = await _userManager.FindByIdAsync(userInUserTable.OwnerId);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User nicht gefunden!" });
            }

            var newRole = await _roleManager.FindByIdAsync(userRoleId[0]);
            if (newRole == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Rolle existiert nicht!" });
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

        var userEmail = await _context.Region
            .Where(r => r.RegionName == userDto.UserRegion)
            .Select(r => r.ContactPersonEmail)
            .FirstOrDefaultAsync();

        IdentityUser user = new()
        {
            Email = userEmail,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = userDto.UserName
        };

        var userManger = await _userManager.CreateAsync(user, userDto.UserPassword);
        if (userManger.Errors.Any())
        {
            return BadRequest(userManger.Errors);
        }

        try
        {
            await _userManager.AddToRoleAsync(user, userDto.UserFunction);
        }
        catch
        {
            return BadRequest(userManger.Errors);
        }

        var userRegion = await _context.Region
            .Where(r => r.RegionName == userDto.UserRegion)
            .Select(r => (int?)r.RegionId)
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

    private UserDto getUserDto(User user, Region region, string userRole, string userName, string userEmail)
    {
        return new UserDto
        {
            UserId = user.UserId,
            UserDefinition = user.UserDefinition,
            UserFunction = userRole,
            UserRegion = region.RegionName,
            UserFirstName = user.UserFirstName,
            UserLastName = user.UserLastName,
            UserName = userName,
            UserEmail = userEmail,
            UserPassword = "Password"
        };
    }
}