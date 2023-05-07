using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAPI.Models;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionController : ControllerBase
    {
        private readonly APIDbContext _context;

        public RegionController(APIDbContext context)
        {
            _context = context;
        }

        // GET: api/Region
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Regions>>> GetRegions()
        {
          if (_context.Regions == null)
          {
              return NotFound();
          }
            return await _context.Regions.ToListAsync();
        }

        // GET: api/Region/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Regions>> GetRegions(int id)
        {
          if (_context.Regions == null)
          {
              return NotFound();
          }
            var regions = await _context.Regions.FindAsync(id);

            if (regions == null)
            {
                return NotFound();
            }

            return regions;
        }

        // PUT: api/Region/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegions(int id, Regions regions)
        {
            if (id != regions.regionId)
            {
                return BadRequest();
            }

            _context.Entry(regions).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegionsExists(id))
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

        // POST: api/Region
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Regions>> PostRegions(Regions regions)
        {
          if (_context.Regions == null)
          {
              return Problem("Entity set 'APIDbContext.Regions'  is null.");
          }
            _context.Regions.Add(regions);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegions", new { id = regions.regionId }, regions);
        }

        // DELETE: api/Region/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegions(int id)
        {
            if (_context.Regions == null)
            {
                return NotFound();
            }
            var regions = await _context.Regions.FindAsync(id);
            if (regions == null)
            {
                return NotFound();
            }

            _context.Regions.Remove(regions);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegionsExists(int id)
        {
            return (_context.Regions?.Any(e => e.regionId == id)).GetValueOrDefault();
        }
    }
}
