using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.Model.Dtos;

namespace RehkitzWebApp.Model;

public class ApplicationDbContext : IdentityDbContext<IdentityUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Protocol> Protocol { get; set; }

    public DbSet<UserDto> UserDto { get; set; }

    public DbSet<Region> Region { get; set; }

    public DbSet<Area> Area { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}