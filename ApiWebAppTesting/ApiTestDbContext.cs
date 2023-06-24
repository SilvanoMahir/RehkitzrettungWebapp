using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.Model;

namespace ApiWebAppTesting
{
    public class ApiTestDbContext : IdentityDbContext<IdentityUser>
    {
        public ApiTestDbContext(DbContextOptions<ApiTestDbContext> options) : base(options)
        { }

        public DbSet<Protocol> Protocol { get; set; }

        public DbSet<User> User { get; set; }

        public DbSet<Region> Region { get; set; }

        public DbSet<Area> Area { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}