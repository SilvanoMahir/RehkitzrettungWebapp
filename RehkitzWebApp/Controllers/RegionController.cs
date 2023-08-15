using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.Model;
using RehkitzWebApp.Model.Dtos;
using System.Data;

namespace webapi.Controllers;

[Authorize]
[ApiController]
[Route("api/regions")]
public class RegionController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RegionController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: /api/regions
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RegionNameDto>>> GetRegion()
    {
        if (_context.Region == null)
        {
            return NotFound();
        }

        var regionsList = await _context.Region
            .Where(p => p.EntryIsDeleted == false)
            .Select(p => p.RegionName)
            .ToListAsync();

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
