using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.Model;
using RehkitzWebApp.Model.Dtos;

namespace RehkitzWebApp.Controllers;

[Authorize]
[ApiController]
[Route("api/protocols")]
public class ProtocolController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProtocolController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: /api/protocols
    [HttpGet]
    public IActionResult GetProtocol()
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }

        var protocols = _context.Protocol
            .Where(p => p.EntryIsDeleted == false)
            .ToList();

        var protocolDtos = new List<ProtocolDto>();

        foreach (var protocol in protocols)
        {
            protocolDtos.Add(protocol.ToDto());
        }

        return Ok(protocolDtos);
    }

    // GET: /api/protocols/5
    [HttpGet("{id}")]
    public IActionResult GetProtocol(int id)
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }
        var protocol = _context.Protocol.Find(id);

        if (protocol == null)
        {
            return NotFound();
        }

        return Ok(protocol.ToDto());
    }

    // PUT: /api/protocols/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public IActionResult PutProtocol(int id, ProtocolDto protocolDto)
    {
        if (id != protocolDto.ProtocolId)
        {
            return BadRequest();
        }

        var protocol = protocolDto.ToProtocol();
        _context.Entry(protocol).State = EntityState.Modified;

        try
        {
            _context.SaveChanges();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProtocolExists(id))
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

    // POST: /api/protocols
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public IActionResult PostProtocol(ProtocolDto protocolDto)
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }
        var protocol = protocolDto.ToProtocol();
        _context.Protocol.Add(protocol);
        _context.SaveChanges();

        return CreatedAtAction("GetProtocol", new { id = protocol.ProtocolId }, protocol);
    }

    // DELETE: /api/protocols/5
    [HttpDelete("{id}")]
    public IActionResult DeleteProtocol(int id)
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }
        var protocol = _context.Protocol.Find(id);
        if (protocol == null)
        {
            return NotFound();
        }

        protocol.EntryIsDeleted = true;
        _context.Entry(protocol).State = EntityState.Modified;
        _context.SaveChanges();

        return NoContent();
    }

    private bool ProtocolExists(int id)
    {
        return (_context.Protocol?.Any(e => e.ProtocolId == id)).GetValueOrDefault();
    }
}