using API.Features.Users;
using API.Infrastructure.Auth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using API.Features.Items;
using API.Features.Parameters;

namespace API.Infrastructure.Classes {

    public class AppDbContext : IdentityDbContext<IdentityUser> {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        #region DbSets

        public DbSet<Item> Items { get; set; }
        public DbSet<Parameter> Parameters { get; set; }
        public DbSet<Token> Tokens { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            ApplyConfigurations(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

        private static void ApplyConfigurations(ModelBuilder modelBuilder) {
            modelBuilder.ApplyConfiguration(new ItemsConfig());
            modelBuilder.ApplyConfiguration(new ParametersConfig());
            modelBuilder.ApplyConfiguration(new UsersConfig());
        }

    }

}