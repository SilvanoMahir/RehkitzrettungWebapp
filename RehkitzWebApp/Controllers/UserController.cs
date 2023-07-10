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
            if (userRoleId.Count != 0)
            {
                var userRole = await _context.Roles.FindAsync(userRoleId[0]);
                var userDto = getUserDto(user, userRegion, userRole.Name);
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
        if (userRoleId.Count != 0)
        {
            var userRoleItem = await _context.Roles.FindAsync(userRoleId[0]);
            var userDto = getUserDto(user, userRegion, userRoleItem.Name);
        }
        else
        {
            return NotFound();
        }

        if (user == null || userRegion == null)
        {
            return NotFound();
        }
        return Ok(getUserDto(user, userRegion, userRole));
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

        bool entryIsDeleted = false;
        var user = userDto.ToUserEntity(entryIsDeleted);
        _context.Entry(user).State = EntityState.Modified;

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

    private UserDto getUserDto(User user, Region region, string userRole)
    {
        // the fixed comments depends on the Role which has to be linked first
        return new UserDto
        {
            UserId = user.UserId,
            UserDefinition = user.UserDefinition,
            UserFunction = userRole + " " + region.RegionName,
            UserStateRegion = region.RegionState + "/" + region.RegionName,
            UserFirstName = user.UserFirstName,
            UserLastName = user.UserLastName,
            UserMail = region.ContactPersonMail,
            UserPassword = "Password"
        };
    }
}