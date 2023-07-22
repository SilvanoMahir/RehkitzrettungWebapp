using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.Model;
using RehkitzWebApp.Model.Dtos;

namespace webapi.Controllers;

[ApiController]
[Route("api/area")]
public class AreaController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AreaController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: /api/area
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AreaDto>>> GetArea()
    {
        if (_context.User == null)
        {
            return NotFound();
        }

        var areaSizeDtosList = new List<AreaDto>();

        List<string> areaSizeList = await _context.Area
            .Select(x => x.AreaSize)
            .ToListAsync();

        foreach (var areaSize in areaSizeList)
        {
            var areaSizeDto = new AreaDto
            {
                AreaSize = areaSize
            };
            areaSizeDtosList.Add(areaSizeDto);
        }

        if (areaSizeDtosList.Count != 0)
            return Ok(areaSizeDtosList);
        else
            return NoContent();
    }
}