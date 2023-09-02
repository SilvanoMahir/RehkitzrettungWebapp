using DocumentFormat.OpenXml;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.FileController;
using RehkitzWebApp.Model;
using RehkitzWebApp.Model.Dtos;
using System.Security.Claims;

namespace RehkitzWebApp.Controllers;

[Authorize]
[ApiController]
[Route("api/protocols")]
public class ProtocolController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpContextAccessor _httpcontext;

    public ProtocolController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpcontext = httpContextAccessor;
    }

    // GET: /api/protocols
    [Authorize(Roles = "Admin,Zentrale,Wildhut,Benutzer")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProtocolDto>>> GetProtocols()
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }

        if (_httpcontext.HttpContext == null)
        {
            return NotFound();
        }

        var principal = _httpcontext.HttpContext.User;
        var loggedInUserDistrict = principal.FindFirst("userDistrict");
        var loggedInUserRole = principal.FindFirst(ClaimTypes.Role);

        if ( loggedInUserDistrict == null || loggedInUserRole == null)
        {
            return NotFound();
        }

        var userRegionsFromDistrictList = await _context.Region
                                                    .Where(p => p.RegionDistrict == loggedInUserDistrict.Value)
                                                    .Select(p => p.RegionName)
                                                    .ToListAsync();

        List<Protocol> protocols = new List<Protocol>();
        if (loggedInUserRole.Value == "Admin")
        {
            protocols = await _context.Protocol
                                    .Where(p => p.EntryIsDeleted == false)
                                    .ToListAsync();
        }
        else
        {
            protocols = await _context.Protocol
                                    .Where(p => p.EntryIsDeleted == false && userRegionsFromDistrictList.Contains(p.RegionName))
                                    .ToListAsync();
        }

        var protocolDtos = new List<ProtocolDto>();

        foreach (var protocol in protocols)
        {
            protocolDtos.Add(protocol.ToDto());
        }

        return Ok(protocolDtos);
    }

    // GET: /api/protocols/5
    [Authorize(Roles = "Admin,Zentrale,Benutzer")]
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
    [Authorize(Roles = "Admin,Zentrale,Wildhut,Benutzer")]
    [HttpGet("file")]
    public async Task<IActionResult> ExportProtocolsToExcelAsync()
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }

        if (_httpcontext.HttpContext == null)
        {
            return NotFound();
        }

        var principal = _httpcontext.HttpContext.User;
        var loggedInUserDistrict = principal.FindFirst("userDistrict");
        var loggedInUserRole = principal.FindFirst(ClaimTypes.Role);

        if (loggedInUserDistrict == null || loggedInUserRole == null)
        {
            return NotFound();
        }
        var userRegionsFromDistrictList = await _context.Region
                                                    .Where(p => p.RegionDistrict == loggedInUserDistrict.Value)
                                                    .Select(p => p.RegionName)
                                                    .ToListAsync();

        List<Protocol> protocolsList = new List<Protocol>();
        if (loggedInUserRole.Value == "Admin")
        {
            protocolsList = await _context.Protocol
                                    .Where(p => p.EntryIsDeleted == false)
                                    .ToListAsync();
        }
        else
        {
            protocolsList = await _context.Protocol
                                    .Where(p => p.EntryIsDeleted == false && userRegionsFromDistrictList.Contains(p.RegionName))
                                    .ToListAsync();
        }

        ExcelExporter exporter = new ExcelExporter();
        var stream = exporter.ExportToExcel(protocolsList, loggedInUserDistrict.Value);
        return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "RehkitzrettungProtokolle" + DateTime.Now.ToString("yyyy-M-d") + ".xlsx");
    }

    // GET: /api/protocols/overview
    [Authorize(Roles = "Admin,Zentrale,Wildhut,Benutzer")]
    [HttpGet("overview")]
    public async Task<ActionResult<ProtocolOverviewDto>> GetProtocolsOverview()
    {
        if (_context.Protocol == null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Der Server ist akutell nicht erreichbar! Bitte probieren Sie es später nochmals." });
        }

        if (_httpcontext.HttpContext == null)
        {
            return NotFound();
        }

        var principal = _httpcontext.HttpContext.User;
        var loggedInUserDistrict = principal.FindFirst("userDistrict");
        var loggedInRegion = principal.FindFirst("userRegion");

        if (loggedInUserDistrict == null || loggedInRegion == null)
        {
            return NotFound();
        }

        var userRegionTable = await _context.Region
                                        .Where(p => p.RegionName == loggedInRegion.Value)
                                        .ToListAsync();

        var userRegionListFromDistrict = await _context.Region
                                                .Where(p => p.RegionDistrict == loggedInUserDistrict.Value)
                                                .Select(p => p.RegionName)
                                                .ToListAsync();

        var protocolsList = await _context.Protocol
                                    .Where(p => p.EntryIsDeleted == false && userRegionListFromDistrict.Contains(p.RegionName))
                                    .ToListAsync();

        int numberOfProtocols = 0;
        int foundFawns = 0;
        int injuredFawns = 0;
        int markedFawns = 0;

        foreach (var protocol in protocolsList)
        {
            if (userRegionListFromDistrict.Contains(protocol.RegionName))
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
            DistrictName = loggedInUserDistrict.Value
        };

        return Ok(protocolOverviewDto);
    }

    // PUT: /api/protocols/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [Authorize(Roles = "Admin,Zentrale,Benutzer")]
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
    [Authorize(Roles = "Admin,Zentrale,Benutzer")]
    [HttpPost]
    public async Task<ActionResult<ProtocolDto>> PostProtocol(ProtocolDto protocolDto)
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }

        int maxProtocolCode = 0;
        foreach (var protocolEntry in _context.Protocol)
        {
            int currentProtocolCode = int.Parse(protocolEntry.ProtocolCode.Substring(3));
            if (maxProtocolCode < currentProtocolCode)
            {
                maxProtocolCode = currentProtocolCode;
            }
        }

        ++maxProtocolCode;
        string protocolCode = maxProtocolCode.ToString("D4");

        var regionState = await _context.Region
                                        .Where(r => r.RegionName == protocolDto.RegionName)
                                        .Select(r => r.RegionState)
                                        .ToListAsync();

        protocolDto.ProtocolCode = $"{regionState[0]}-{protocolCode}";

        bool entryIsDeleted = false;
        var protocol = protocolDto.ToProtocolEntity(entryIsDeleted);
        _context.Protocol.Add(protocol);
        await _context.SaveChangesAsync();

        return Ok(protocolDto);
    }

    // DELETE: /api/protocols/5
    [Authorize(Roles = "Admin,Zentrale")]
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