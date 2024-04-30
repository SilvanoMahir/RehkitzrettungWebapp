using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.Model;
using RehkitzWebApp.Model.Dtos;
using System.Data;

namespace webapi.Controllers;

[Authorize]
[ApiController]
[Route("api/districts")]
public class DistrictController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpContextAccessor _httpcontext;

    public DistrictController(ApplicationDbContext context, IHttpContextAccessor httpcontext)
    {
        _context = context;
        _httpcontext = httpcontext;
    }

    // GET: /api/districts
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DistrictNameDto>>> GetDistricts()
    {
        if (_context.Region == null)
        {
            return NotFound();
        }

        if (_httpcontext.HttpContext == null)
        {
            return NotFound();
        }

        var districtList = await _context.Region
                                      .Where(p => p.EntryIsDeleted == false)
                                      .Select(p => p.RegionDistrict)
                                      .Distinct()
                                      .ToListAsync();

        var regionDtosList = districtList.Select(d => new DistrictNameDto
        {
            DistrictName = d
        }).ToList();

        return Ok(regionDtosList);
    }

}
