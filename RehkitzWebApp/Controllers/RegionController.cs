using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.Model;
using RehkitzWebApp.Model.Dtos;

namespace webapi.Controllers;

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
    public IActionResult GetRegion()
    {
        if (_context.Region == null)
        {
            return NotFound();
        }

        var regions = _context.Region
            .Where(p => p.EntryIsDeleted == false)
            .ToList();

        var regionDtos = new List<RegionDto>();

        foreach (var region in regions)
        {
            regionDtos.Add(region.ToDto());
        }

        return Ok(regionDtos);
    }

    // GET: /api/regions/5
    [HttpGet("{id}")]
    public IActionResult GetRegion(int id)
    {
        if (_context.Region == null)
        {
            return NotFound();
        }
        var region = _context.Region.Find(id);

        if (region == null)
        {
            return NotFound();
        }

        return Ok(region.ToDto());
    }

    // PUT: /api/regions/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public IActionResult PutRegion(int id, RegionDto regionDto)
    {
        if (id != regionDto.RegionId)
        {
            return BadRequest();
        }

        var region = regionDto.ToRegion();
        _context.Entry(region).State = EntityState.Modified;

        try
        {
            _context.SaveChanges();
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
    public IActionResult PostRegion(RegionDto regionDto)
    {
        if (_context.Region == null)
        {
            return NotFound();
        }
        var region = regionDto.ToRegion();
        _context.Region.Add(region);
        _context.SaveChanges();

        return CreatedAtAction("GetRegion", new { id = region.RegionId }, region);
    }

    // DELETE: /api/regions/5
    [HttpDelete("{id}")]
    public IActionResult DeleteRegion(int id)
    {
        if (_context.Region == null)
        {
            return NotFound();
        }
        var region = _context.Region.Find(id);
        if (region == null)
        {
            return NotFound();
        }

        region.EntryIsDeleted = true;
        _context.Entry(region).State = EntityState.Modified;
        _context.SaveChanges();

        return NoContent();
    }

    private bool RegionExists(int id)
    {
        return (_context.Region?.Any(e => e.RegionId == id)).GetValueOrDefault();
    }
}
