using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.Model;

namespace RehkitzWebApp.Controllers
{
    [ApiController]
    [Route("api/protocols")]
    public class ProtocolController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public ProtocolController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: /api/protocols
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Protocol>>> GetProtocol()
        {
            if (_context.Protocol == null)
            {
                return NotFound();
            }
            return await _context.Protocol.ToListAsync();
        }

        // GET: /api/protocols/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Protocol>> GetProtocol(int id)
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

            return protocol;
        }

        // PUT: /api/protocols/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProtocol(int id, Protocol protocol)
        {
            if (id != protocol.protocolId)
            {
                return BadRequest();
            }

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
        public async Task<ActionResult<Protocol>> PostProtocol(Protocol protocol)
        {
            if (_context.Protocol == null)
            {
                return Problem("Entity set 'ApiDbContext.Protocol'  is null.");
            }
            _context.Protocol.Add(protocol);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProtocol", new { id = protocol.protocolId }, protocol);
        }

        // DELETE: /api/protocols/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProtocol(int id)
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

            _context.Protocol.Remove(protocol);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProtocolExists(int id)
        {
            return (_context.Protocol?.Any(e => e.protocolId == id)).GetValueOrDefault();
        }
    }
}