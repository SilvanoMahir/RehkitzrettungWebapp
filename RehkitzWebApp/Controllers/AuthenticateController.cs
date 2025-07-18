﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RehkitzWebApp.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RehkitzWebApp.Controllers;

[Route("api/authenticate")]
[ApiController]
public class AuthenticateController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context;

    public AuthenticateController(
        UserManager<IdentityUser> userManager,
        RoleManager<IdentityRole> roleManager,
        ApplicationDbContext context,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
        _context = context;
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await _userManager.FindByNameAsync(model.Username);

        if (user == null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Benutzer nicht gefunden!" });
        }

        var userDeleted = await _context.User
                            .Where(x => x.OwnerId == user.Id)
                            .Select(x => x.EntryIsDeleted)
                            .ToListAsync();

        var userInUserList = await _context.User
                                    .Where(x => x.OwnerId == user.Id)
                                    .ToListAsync();

        var userRegion = await _context.Region
                                    .Where(x => x.RegionId == int.Parse(userInUserList[0].UserRegionId))
                                    .Select(x => x.RegionName)
                                    .ToListAsync();

        var userDistrict = await _context.Region
                            .Where(x => x.RegionId == int.Parse(userInUserList[0].UserRegionId))
                            .Select(x => x.RegionDistrict)
                            .ToListAsync();

        var userId = userInUserList[0].UserId.ToString();

        if (userDeleted[0] == true)
        {
            return Unauthorized();
        }

        if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim("userOwnerId", user.Id),
                new Claim("userDistrict", userDistrict[0]),
                new Claim("userRegion", userRegion[0]),
                new Claim("userId", userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var token = GetToken(authClaims);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo,
                userId
            });
        }
        return Unauthorized();
    }

    [Authorize(Roles ="Admin,Zentrale")]
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var userExists = await _userManager.FindByNameAsync(model.Username);
        if (userExists != null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Benutzer existiert bereits!" });
        }

        IdentityUser user = new()
        {
            Email = model.UserEmail,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = model.Username
        };
        var result = await _userManager.CreateAsync(user, model.UserPassword);
        if (!result.Succeeded)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Benutzererstellung fehlgeschlagen! Bitte Benutzerangaben überprüfen oder später probieren." });
        }

        return Ok(new Response { Status = "Success", Message = "User created successfully!" });
    }

    [HttpPost]
    [Route("register-admin")]
    public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
    {
        var userExists = await _userManager.FindByNameAsync(model.Username);
        if (userExists != null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Benutzer existiert bereits!" });
        }

        var MailExists = await _context.Region.FirstOrDefaultAsync(x => x.ContactPersonEmail == model.UserEmail);
        if (MailExists == null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Mailadresse von Kontaktperson existiert nicht." });
        }

        IdentityUser user = new()
        {
            Email = model.UserEmail,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = model.Username
        };
        var result = await _userManager.CreateAsync(user, model.UserPassword);
        if (!result.Succeeded)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Benutzererstellung fehlgeschlagen! Bitte Benutzerangaben überprüfen oder später probieren." });
        }

        if (!await _roleManager.RoleExistsAsync(UserRoles.Admin))
        {
            var role = new IdentityRole(UserRoles.Admin);
            await _roleManager.CreateAsync(role);
        }

        if (!await _roleManager.RoleExistsAsync(UserRoles.User))
        {
            var role = new IdentityRole(UserRoles.User);
            await _roleManager.CreateAsync(role);
        }

        if (!await _roleManager.RoleExistsAsync(UserRoles.Central))
        {
            var role = new IdentityRole(UserRoles.Central);
            await _roleManager.CreateAsync(role);
        }

        if (!await _roleManager.RoleExistsAsync(UserRoles.Ranger))
        {
            var role = new IdentityRole(UserRoles.Ranger);
            await _roleManager.CreateAsync(role);
        }

        if (await _roleManager.RoleExistsAsync(UserRoles.Admin))
        {
            await _userManager.AddToRoleAsync(user, UserRoles.Admin);
        }

        var userRegion = await _context.Region
            .Where(r => r.RegionName == model.UserRegion)
            .Select(r => (int?)r.RegionId)
            .FirstOrDefaultAsync();

        var newUser = new User
        {
            OwnerId = user.Id,
            UserFirstName = model.UserFirstName,
            UserLastName = model.UserLastName,
            UserRegionId = userRegion.ToString(),
            UserDefinition = model.UserDefinition,
            EntryIsDeleted = false
        };

        _context.User.Add(newUser);
        await _context.SaveChangesAsync();

        return Ok(new Response { Status = "Success", Message = "User created successfully!" });
    }

    private JwtSecurityToken GetToken(List<Claim> authClaims)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

        return token;
    }
}