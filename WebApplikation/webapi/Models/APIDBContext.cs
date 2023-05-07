using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace StudentAPI.Models
{
    public class APIDbContext : DbContext
    {
        public APIDbContext(DbContextOptions option) : base(option)
        { }

        public DbSet<Protocols> Protocols { get; set; }

        public DbSet<Users> Users { get; set; }

        public DbSet<Regions> Regions { get; set; }
    }
}