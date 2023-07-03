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
    public IActionResult GetUser()
    {
        if (_context.User == null)
        {
            return NotFound();
        }

        var userDtos = new List<UserDto>();

        foreach (var user in _context.User)
        {
            userDtos.Add(user.ToDto());
        }

        return Ok(userDtos);
    }

    // GET: /api/users/5
    [HttpGet("{id}")]
    public IActionResult GetUser(int id)
    {
        if (_context.User == null)
        {
            return NotFound();
        }
        var user = _context.User.Find(id);

        if (user == null)
        {
            return NotFound();
        }
        return Ok(user.ToDto());
    }

    // PUT: /api/users/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public IActionResult PutUser(int id, UserDto userDto)
    {
        if (id != userDto.UserId)
        {
            return BadRequest();
        }

        var user = userDto.ToUser();
        _context.Entry(user).State = EntityState.Modified;

        try
        {
            _context.SaveChanges();
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
    public IActionResult PostUser(UserDto userDto)
    {
        if (_context.User == null)
        {
            return NotFound();
        }
        var user = userDto.ToUser();
        _context.User.Add(user);
        _context.SaveChanges();

        return CreatedAtAction("GetUser", new { id = user.UserId }, user);
    }

    // DELETE: /api/users/5
    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        if (_context.User == null)
        {
            return NotFound();
        }
        var user = _context.User.Find(id);
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
