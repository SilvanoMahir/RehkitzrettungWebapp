using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace RehkitzWebApp.Model
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Protocol> Protocol { get; set; }

        public DbSet<User> User { get; set; }

        public DbSet<Region> Region { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}