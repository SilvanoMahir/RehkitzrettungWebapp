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
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUser()
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
            userDtos.Add(user.ToUserSmallListDto());
        }

        return Ok(userDtos);
    }

    // GET: /api/users/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProtocolDto>> GetUser(int id)
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
        return Ok(user.ToUserDto());
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

        return CreatedAtAction("GetUser", new { id = user.UserId }, user);
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
}