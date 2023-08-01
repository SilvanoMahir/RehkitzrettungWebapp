using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.FileController;
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
    public async Task<ActionResult<IEnumerable<ProtocolDto>>> GetProtocol()
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }

        var protocols = await _context.Protocol
            .Where(p => p.EntryIsDeleted == false)
            .ToListAsync();

        var protocolDtos = new List<ProtocolDto>();

        foreach (var protocol in protocols)
        {
            protocolDtos.Add(protocol.ToDto());
        }

        return Ok(protocolDtos);
    }

    // GET: /api/protocols/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProtocolDto>> GetProtocol(int id)
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }
        var protocol = await _context.Protocol.FindAsync(id);

        if (protocol == null)
        {
            return NotFound();
        }

        return Ok(protocol.ToDto());
    }

    // GET: /api/protocols/file
    [HttpGet("file")]
    public async Task<IActionResult> ExportProtocolsToExcelAsync()
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }

        var protocolsList = await _context.Protocol
            .Where(p => p.EntryIsDeleted == false)
            .ToListAsync();

        ExcelExporter exporter = new ExcelExporter();
        var stream = exporter.ExportToExcel(protocolsList);
        return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "RehkitzrettungProtokolle" + DateTime.Now.ToString("yyyy-M-d") + ".xlsx");
    }

    // GET: /api/protocols/overview
    [HttpGet("overview")]
    public async Task<ActionResult<ProtocolOverviewDto>> GetProtocolsOverview([FromQuery(Name = "userRegion")] string userRegion)
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }

        var protocolsList = await _context.Protocol
            .Where(p => p.EntryIsDeleted == false)
            .ToListAsync();

        int numberOfProtocols = 0;
        int foundFawns = 0;
        int injuredFawns = 0;
        int markedFawns = 0;

        foreach (var protocol in protocolsList)
        {
            if (protocol.RegionName == userRegion)
            {
                ++numberOfProtocols;
                foundFawns += protocol.FoundFawns;
                injuredFawns += protocol.InjuredFawns;
                markedFawns += protocol.MarkedFawns;
            }
        }

        var protocolOverviewDto = new ProtocolOverviewDto
        {
            NumberOfProtocols = numberOfProtocols,
            FoundFawns = foundFawns,
            InjuredFawns = injuredFawns,
            MarkedFawns = markedFawns,
        };

        return Ok(protocolOverviewDto);
    }

    // PUT: /api/protocols/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<ActionResult> PutProtocol(int id, ProtocolDto protocolDto)
    {
        if (id != protocolDto.ProtocolId)
        {
            return BadRequest();
        }

        bool entryIsDeleted = false;
        var protocol = protocolDto.ToProtocolEntity(entryIsDeleted);
        _context.Entry(protocol).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
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
    public async Task<ActionResult<ProtocolDto>> PostProtocol(ProtocolDto protocolDto)
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }

        bool entryIsDeleted = false;
        var protocol = protocolDto.ToProtocolEntity(entryIsDeleted);
        _context.Protocol.Add(protocol);
        await _context.SaveChangesAsync();

        return Ok(protocolDto);
    }

    // DELETE: /api/protocols/5
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProtocol(int id)
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }
        var protocol = await _context.Protocol.FindAsync(id);
        if (protocol == null)
        {
            return NotFound();
        }

        protocol.EntryIsDeleted = true;
        _context.Entry(protocol).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ProtocolExists(int id)
    {
        return (_context.Protocol?.Any(e => e.ProtocolId == id)).GetValueOrDefault();
    }
}