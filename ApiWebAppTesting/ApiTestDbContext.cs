using Microsoft.EntityFrameworkCore;
using RehkitzWebApp.Model;

namespace ApiWebAppTesting
{
    public class ApiTestDbContext : DbContext
    {
        public ApiTestDbContext(DbContextOptions options) : base(options)
        { }

        public DbSet<Protocol> Protocol { get; set; }

        public DbSet<User> User { get; set; }

        public DbSet<Region> Region { get; set; }

    }
}