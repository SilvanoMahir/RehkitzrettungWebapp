using DocumentFormat.OpenXml.Drawing.Diagrams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.Model;
using RehkitzWebApp.Model.Dtos;
using System.Data;
using System.Security.Claims;

namespace webapi.Controllers;

[Authorize]
[ApiController]
[Route("api/regions")]
public class RegionController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpContextAccessor _httpcontext;

    public RegionController(ApplicationDbContext context, IHttpContextAccessor httpcontext)
    {
        _context = context;
        _httpcontext = httpcontext;
    }

    // GET: /api/regions
    [Authorize(Roles = "Admin,Zentrale,Benutzer")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RegionNameDto>>> GetRegion()
    {
        if (_context.Region == null)
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
        };

        List<string?> regionsList = new List<string>();

        if (loggedInUserRole.Value == "Admin")
        {
            regionsList = await _context.Region
                                    .Where(p => p.EntryIsDeleted == false)
                                    .Select(p => p.RegionName)
                                    .ToListAsync();
        }
        else
        {
            regionsList = await _context.Region
                                    .Where(p => p.EntryIsDeleted == false && p.RegionDistrict == loggedInUserDistrict.Value)
                                    .Select(p => p.RegionName)
                                    .ToListAsync();
        }

        var regionDtosList = new List<RegionNameDto>();

        foreach (var region in regionsList)
        {
            var regionDto = new RegionNameDto
            {
                RegionName = region
            };
            regionDtosList.Add(regionDto);
        }

        if (regionDtosList.Count != 0)
        {
            return Ok(regionDtosList);
        }
        else
        {
            return NoContent();
        }
    }

    // GET: /api/regions/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProtocolDto>> GetRegion(int id)
    {
        if (_context.Region == null)
        {
            return NotFound();
        }
        var region = await _context.Region.FindAsync(id);

        if (region == null)
        {
            return NotFound();
        }

        return Ok(region.ToDto());
    }

    // PUT: /api/regions/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<ActionResult> PutRegion(int id, RegionDto regionDto)
    {
        if (id != regionDto.RegionId)
        {
            return BadRequest();
        }

        bool entryIsDeleted = false;
        var region = regionDto.ToRegionEntity(entryIsDeleted);
        _context.Entry(region).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!RegionExists(id))
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

    // POST: /api/regions
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<RegionDto>> PostRegion(RegionDto regionDto)
    {
        if (_context.Region == null)
        {
            return NotFound();
        }

        bool entryIsDeleted = false;
        var region = regionDto.ToRegionEntity(entryIsDeleted);
        _context.Region.Add(region);
        await _context.SaveChangesAsync();

        return Ok(regionDto);
    }

    // DELETE: /api/regions/5
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteRegion(int id)
    {
        if (_context.Region == null)
        {
            return NotFound();
        }
        var region = await _context.Region.FindAsync(id);
        if (region == null)
        {
            return NotFound();
        }

        region.EntryIsDeleted = true;
        _context.Entry(region).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool RegionExists(int id)
    {
        return (_context.Region?.Any(e => e.RegionId == id)).GetValueOrDefault();
    }
}
