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
        if (_context.UserDto == null)
        {
            return NotFound();
        }
        return await _context.UserDto.ToListAsync();
    }

    // GET: /api/users/5
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
        if (_context.UserDto == null)
        {
            return NotFound();
        }
        var userDto = await _context.UserDto.FindAsync(id);

        if (userDto == null)
        {
            return NotFound();
        }
        return userDto;
    }

    // PUT: /api/users/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUser(int id, UserDto userDto)
    {
        if (id != userDto.UserId)
        {
            return BadRequest();
        }

        _context.Entry(userDto).State = EntityState.Modified;

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
        if (_context.UserDto == null)
        {
            return NotFound();
        }
        _context.UserDto.Add(userDto);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetUser", new { id = userDto.UserId }, userDto);
    }

    // DELETE: /api/users/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        if (_context.UserDto == null)
        {
            return NotFound();
        }
        var userDto = await _context.UserDto.FindAsync(id);
        if (userDto == null)
        {
            return NotFound();
        }

        _context.UserDto.Remove(userDto);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool UserExists(int id)
    {
        return (_context.UserDto?.Any(e => e.UserId == id)).GetValueOrDefault();
    }
}
