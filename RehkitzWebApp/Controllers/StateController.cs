using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.Model;
using RehkitzWebApp.Model.Dtos;
using System.Data;

namespace webapi.Controllers;

[Authorize]
[ApiController]
[Route("api/states")]
public class StateController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpContextAccessor _httpcontext;

    public StateController(ApplicationDbContext context, IHttpContextAccessor httpcontext)
    {
        _context = context;
        _httpcontext = httpcontext;
    }

    // GET: /api/states
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DistrictNameDto>>> GetStates()
    {
        if (_context.Region == null)
        {
            return NotFound();
        }

        if (_httpcontext.HttpContext == null)
        {
            return NotFound();
        }

        var statesList = await _context.Region
                                      .Where(p => p.EntryIsDeleted == false)
                                      .Select(p => p.RegionState)
                                      .Distinct()
                                      .ToListAsync();

        var stateDtosList = statesList.Select(d => new StateNameDto
        {
            StateName = d
        }).ToList();

        return Ok(stateDtosList);
    }

}
