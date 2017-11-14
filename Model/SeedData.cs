using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            //using (var context = new TrackingContext(serviceProvider.GetRequiredService<DbContextOptions<TrackingContext>>()))
            using (var context = new TrackingContext())
            {
                // Look for any client.
                if (context.Clients.Any())
                {
                    return;   // DB has been seeded
                }

                var client1 = "Client1";
                var client2 = "Client2";
                var client3 = "Client3";
                var client4 = "Client4";

                var project1 = "Project1";
                var project2 = "Project2";
                var project3 = "Project3";
                var project4 = "Project4";

                var activity1 = "Activity1";
                var activity2 = "Activity2";
                var activity3 = "Activity3";
                var activity4 = "Activity4";

                context.Clients.AddRange(
                    new Client() { Name = client1 }, 
                    new Client() { Name = client2 }, 
                    new Client() { Name = client3 }, 
                    new Client() { Name = client4 });
                await context.SaveChangesAsync();

                context.Projects.AddRange(
                    new Project() { Name = project1 }, 
                    new Project() { Name = project2, Client = await context.Clients.SingleOrDefaultAsync(t => t.Name == client1) },
                    new Project() { Name = project3, Client = await context.Clients.SingleOrDefaultAsync(t => t.Name == client2) },
                    new Project() { Name = project4, Client = await context.Clients.SingleOrDefaultAsync(t => t.Name == client3) });
                await context.SaveChangesAsync();

                context.Add(new Activity() { Date = DateTime.Today.Subtract(TimeSpan.FromDays(1)), StartTime = DateTime.Now.TimeOfDay.Subtract(TimeSpan.FromHours(1.5)), EndTime = DateTime.Now.TimeOfDay, Name = activity1 });
                context.Add(new Activity() { Date = DateTime.Today.Subtract(TimeSpan.FromDays(1)), StartTime = DateTime.Now.TimeOfDay.Subtract(TimeSpan.FromHours(1.5)), EndTime = DateTime.Now.TimeOfDay, Name = activity2, Project = await context.Projects.SingleOrDefaultAsync(t => t.Name == project1) });
                context.Add(new Activity() { Date = DateTime.Today, StartTime = DateTime.Now.TimeOfDay.Subtract(TimeSpan.FromHours(1.5)), EndTime = DateTime.Now.TimeOfDay, Name = activity3, Project = await context.Projects.SingleOrDefaultAsync(t => t.Name == project2) });
                await context.SaveChangesAsync();
            }
        }
    }
}