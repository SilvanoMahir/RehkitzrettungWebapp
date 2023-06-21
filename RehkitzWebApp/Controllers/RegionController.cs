using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.Model;

namespace webapi.Controllers
{
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
        public async Task<ActionResult<IEnumerable<Region>>> GetRegion()
        {
            if (_context.Region == null)
            {
                return NotFound();
            }
            return await _context.Region.ToListAsync();
        }

        // GET: /api/regions/5
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

        // PUT: /api/regions/5
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

        // POST: /api/regions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Region>> PostRegion(Region region)
        {
            if (_context.Region == null)
            {
                return NotFound();
            }
            _context.Region.Add(region);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegion", new { id = region.regionId }, region);
        }

        // DELETE: /api/regions/5
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
