using Microsoft.EntityFrameworkCore;

namespace WaterProject.API.Data
{
    public class WaterDbContext : DbContext
    {
        public WaterDbContext(DbContextOptions<WaterDbContext> options) : base(options) 
        { 
        }

        //setting up table name (Projects)
        public DbSet<Project> Projects { get; set; }
    }
}
