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
    [Route("api/regions")]
    [ApiController]
    public class RegionController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public RegionController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/Region
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Region>>> GetRegion()
        {
          if (_context.Region == null)
          {
              return NotFound();
          }
            return await _context.Region.ToListAsync();
        }

        // GET: api/Region/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Region>> GetRegion(int id)
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

            return region;
        }

        // PUT: api/Region/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegion(int id, Region region)
        {
            if (id != region.regionId)
            {
                return BadRequest();
            }

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

        // POST: api/Region
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Region>> PostRegion(Region region)
        {
          if (_context.Region == null)
          {
              return Problem("Entity set 'ApiDbContext.Region'  is null.");
          }
            _context.Region.Add(region);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegion", new { id = region.regionId }, region);
        }

        // DELETE: api/Region/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegion(int id)
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

            _context.Region.Remove(region);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegionExists(int id)
        {
            return (_context.Region?.Any(e => e.regionId == id)).GetValueOrDefault();
        }
    }
}
