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
    public class ProtocolController : ControllerBase
    {
        private readonly APIDbContext _context;

        public ProtocolController(APIDbContext context)
        {
            _context = context;
        }

        // GET: api/Protocol
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Protocols>>> GetProtocols()
        {
          if (_context.Protocols == null)
          {
              return NotFound();
          }
            return await _context.Protocols.ToListAsync();
        }

        // GET: api/Protocol/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Protocols>> GetProtocols(int id)
        {
          if (_context.Protocols == null)
          {
              return NotFound();
          }
            var protocols = await _context.Protocols.FindAsync(id);

            if (protocols == null)
            {
                return NotFound();
            }

            return protocols;
        }

        // PUT: api/Protocol/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProtocols(int id, Protocols protocols)
        {
            if (id != protocols.protocolId)
            {
                return BadRequest();
            }

            _context.Entry(protocols).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProtocolsExists(id))
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

        // POST: api/Protocol
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Protocols>> PostProtocols(Protocols protocols)
        {
          if (_context.Protocols == null)
          {
              return Problem("Entity set 'APIDbContext.Protocols'  is null.");
          }
            _context.Protocols.Add(protocols);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProtocols", new { id = protocols.protocolId }, protocols);
        }

        // DELETE: api/Protocol/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProtocols(int id)
        {
            if (_context.Protocols == null)
            {
                return NotFound();
            }
            var protocols = await _context.Protocols.FindAsync(id);
            if (protocols == null)
            {
                return NotFound();
            }

            _context.Protocols.Remove(protocols);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProtocolsExists(int id)
        {
            return (_context.Protocols?.Any(e => e.protocolId == id)).GetValueOrDefault();
        }
    }
}
