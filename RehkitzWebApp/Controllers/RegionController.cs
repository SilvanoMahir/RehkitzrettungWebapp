using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
        }

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

    // GET: /api/regions/all
    [Authorize(Roles = "Admin,Zentrale")]
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<RegionNameDto>>> GetRegionsAll()
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
        }

        List<Region> regionsList = new List<Region>();

        if (loggedInUserRole.Value == "Admin")
        {
            regionsList = await _context.Region
                                    .Where(p => p.EntryIsDeleted == false).ToListAsync();
        }
        else
        {
            regionsList = await _context.Region
                                    .Where(p => p.EntryIsDeleted == false && p.RegionDistrict == loggedInUserDistrict.Value)
                                    .ToListAsync();
        }

        var regionDtosList = new List<RegionDto>();

        foreach (var region in regionsList)
        {
            var regionDto = new RegionDto
            {
                RegionId = region.RegionId,
                RegionName = region.RegionName,
                RegionState = region.RegionState,
                RegionDistrict = region.RegionDistrict,
                ContactPersonFirstName = region.ContactPersonFirstName,
                ContactPersonLastName = region.ContactPersonLastName,
                ContactPersonEmail = region.ContactPersonEmail
            };
            regionDtosList.Add(regionDto);
        }

        if (regionsList.Count != 0)
        {
            return Ok(regionDtosList);
        }
        else
        {
            return NoContent();
        }
    }

    // GET: /api/regions/5
    [Authorize(Roles = "Admin,Zentrale")]
    [HttpGet("{id}")]
    public async Task<ActionResult<RegionDto>> GetRegion(int id)
    {
        if (_context.Region == null)
        {
            return NotFound();
        }

        var principal = _httpcontext.HttpContext.User;
        var loggedInUserRole = principal.FindFirst(ClaimTypes.Role);

        var region = await _context.Region.FindAsync(id);

        if (region == null)
        {
            return NotFound();
        }

        if (loggedInUserRole.Value == "Admin")
        {
            var regionDto = new RegionDto
            {
                RegionId = region.RegionId,
                RegionName = region.RegionName,
                RegionState = region.RegionState,
                RegionDistrict = region.RegionDistrict,
                ContactPersonFirstName = region.ContactPersonFirstName,
                ContactPersonLastName = region.ContactPersonLastName,
                ContactPersonEmail = region.ContactPersonEmail
            };

            return regionDto;

        }
        else
        {
            var regionDto = new RegionDto
            {
                RegionId = region.RegionId,
                RegionName = region.RegionName,
                RegionState = "",
                RegionDistrict = "",
                ContactPersonFirstName = region.ContactPersonFirstName,
                ContactPersonLastName = region.ContactPersonLastName,
                ContactPersonEmail = region.ContactPersonEmail
            };

            return regionDto;

        }
    }

    // DELETE: /api/regions/5
    [Authorize(Roles = "Admin,Zentrale")]
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
        _context.SaveChanges();

        return NoContent();
    }

    // POST: /api/regions
    [Authorize(Roles = "Admin,Zentrale")]
    [HttpPost]
    public async Task<ActionResult<RegionDto>> PostRegion(RegionDto regionDto)
    {
        if (_context.Region == null)
        {
            return NotFound();
        }

        var newRegion = new Region
        {
            RegionName = regionDto.RegionName,
            RegionState = regionDto.RegionState,
            RegionDistrict = regionDto.RegionDistrict,
            ContactPersonFirstName = regionDto.ContactPersonFirstName,
            ContactPersonLastName = regionDto.ContactPersonLastName,
            ContactPersonEmail = regionDto.ContactPersonEmail,
            EntryIsDeleted = false
        };

        _context.Region.Add(newRegion);

        await _context.SaveChangesAsync();

        return Ok(regionDto);
    }

    // POST: /api/regions
    [Authorize(Roles = "Admin,Zentrale")]
    [HttpPut("{id}")]
    public async Task<ActionResult<RegionDto>> PutProtocol(int id, RegionDto regionDto)
    {
        if (id != regionDto.RegionId)
        {
            return BadRequest();
        }

        bool entryIsDeleted = false;
        var region = regionDto.ToRegionEntity(entryIsDeleted);
        region.RegionDistrict = regionDto.RegionDistrict;
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

    private bool RegionExists(int id)
    {
        return (_context.Region?.Any(e => e.RegionId == id)).GetValueOrDefault();
    }
}
