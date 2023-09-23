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
}
