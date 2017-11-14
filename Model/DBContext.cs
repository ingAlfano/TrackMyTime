using Microsoft.EntityFrameworkCore;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class TrackingContext : DbContext
    {
        public virtual DbSet<Activity> Activities { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<Client> Clients { get; set; }

        public TrackingContext(DbContextOptions<TrackingContext> options)
        : base(options)
        { }

        public TrackingContext()
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Client>()
                .HasMany(t => t.Projects)
                .WithOne(t => t.Client)
                .HasForeignKey(t => t.ClientId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<Activity>()
                .HasOne(t => t.Project)
                .WithMany(t => t.Activities)
                .HasForeignKey(t => t.ProjectId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<Project>()
                .HasMany(t => t.Activities)
                .WithOne(t => t.Project)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
