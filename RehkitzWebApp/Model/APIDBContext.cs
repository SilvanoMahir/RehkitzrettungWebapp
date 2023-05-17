using Microsoft.EntityFrameworkCore;

namespace RehkitzWebApp.Model
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions option) : base(option)
        { }

        public DbSet<Protocol> Protocol { get; set; }

        public DbSet<User> User { get; set; }

        public DbSet<Region> Region { get; set; }
    }
}