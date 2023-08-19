using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.FileController;
using RehkitzWebApp.Model;
using RehkitzWebApp.Model.Dtos;
using System.Linq;

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
    public async Task<ActionResult<IEnumerable<ProtocolDto>>> GetProtocols([FromQuery(Name = "userId")] string userId)
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }

        // get user district and the regions part of this district 
        var userInUserList = await _context.User.FindAsync(int.Parse(userId));
        var userRegionIdList = await _context.Region
                                        .Where(p => p.RegionId == int.Parse(userInUserList.UserRegionId))
                                        .ToListAsync();

        var userDistrict = userRegionIdList[0].RegionDistrict;
        var userRegionsFromDistrictList = await _context.Region
                                                    .Where(p => p.RegionDistrict == userDistrict)
                                                    .Select(p => p.RegionName)
                                                    .ToListAsync();
        // get logged in user role
        var userRoleIdList = await _context.UserRoles
                                    .Where(x => x.UserId == userInUserList.OwnerId)
                                    .Select(x => x.RoleId)
                                    .ToListAsync();

        var userRole = await _context.Roles.FindAsync(userRoleIdList[0]);

        List<Protocol> protocols = new List<Protocol>();
        if (userRole.Name == "Admin") { 
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
    public async Task<IActionResult> ExportProtocolsToExcelAsync([FromQuery(Name = "userId")] string userId)
    {
        if (_context.Protocol == null)
        {
            return NotFound();
        }

        // get user district and the regions part of this district 
        var userInUserList = await _context.User.FindAsync(int.Parse(userId));
        var userRegionIdList = await _context.Region
                                        .Where(p => p.RegionId == int.Parse(userInUserList.UserRegionId))
                                        .ToListAsync();

        var userDistrict = userRegionIdList[0].RegionDistrict;
        var userRegionsFromDistrictList = await _context.Region
                                                    .Where(p => p.RegionDistrict == userDistrict)
                                                    .Select(p => p.RegionName)
                                                    .ToListAsync();
        // get logged in user role
        var userRoleIdList = await _context.UserRoles
                                    .Where(x => x.UserId == userInUserList.OwnerId)
                                    .Select(x => x.RoleId)
                                    .ToListAsync();

        var userRole = await _context.Roles.FindAsync(userRoleIdList[0]);

        List<Protocol> protocolsList = new List<Protocol>();
        if (userRole.Name == "Admin")
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
        var stream = exporter.ExportToExcel(protocolsList, userDistrict);
        return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "RehkitzrettungProtokolle" + DateTime.Now.ToString("yyyy-M-d") + ".xlsx");
    }

    // GET: /api/protocols/overview
    [HttpGet("overview")]
    public async Task<ActionResult<ProtocolOverviewDto>> GetProtocolsOverview([FromQuery(Name = "userRegion")] string userRegion)
    {
        if (_context.Protocol == null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Der Server ist akutell nicht erreichbar! Bitte probieren Sie es später nochmals." });
        }
        var userRegionTable = await _context.Region
                                        .Where(p => p.RegionName == userRegion)
                                        .ToListAsync();

        var userDistrict = userRegionTable[0].RegionDistrict;
        var userRegionListFromDistrict = await _context.Region
                                                .Where(p => p.RegionDistrict == userDistrict)
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
            DistrictName = userDistrict
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