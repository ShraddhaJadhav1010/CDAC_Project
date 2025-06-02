using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Quickrent.Model;
using Quickrent.Model.Enums;

namespace Quickrent.Data
{
    public class QuickrentContext : DbContext
    {

        public DbSet<User> User { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Query> Query { get; set; }
        public DbSet<Conflict> Conflict { get; set; }
        //public DbSet<User> User { get; set; }
        public DbSet<Admin> Admin { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("host=localhost;database=QuickrentDotnet;user=root;password=swami@1212",
                            new MySqlServerVersion(new Version(8, 0, 13)));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
                .Property(o => o.UserRole)
                .HasConversion(new EnumToStringConverter<UserRole>());
        }

    }
}