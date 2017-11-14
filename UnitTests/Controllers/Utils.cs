using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Model;
using Model.Entities;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.Controllers
{
    internal static class GetData
    {
        private static string client1 = "Client1";
        private static string client2 = "Client2";
        private static string client3 = "Client3";
        private static string client4 = "Client4";

        private static string project1 = "Project1";
        private static string project2 = "Project2";
        private static string project3 = "Project3";
        private static string project4 = "Project4";

        private static string activity1 = "Activity1";
        private static string activity2 = "Activity2";
        private static string activity3 = "Activity3";
        private static string activity4 = "Activity4";
        internal static IQueryable<Activity> GetActivities() => new List<Activity>
            {
                new Activity() { Date = DateTime.Today.Subtract(TimeSpan.FromDays(1)), StartTime = DateTime.Now.TimeOfDay.Subtract(TimeSpan.FromHours(1.5)), EndTime = DateTime.Now.TimeOfDay, Name = activity1 },
                new Activity() { Date = DateTime.Today.Subtract(TimeSpan.FromDays(1)), StartTime = DateTime.Now.TimeOfDay.Subtract(TimeSpan.FromHours(1.5)), EndTime = DateTime.Now.TimeOfDay, Name = activity2, Project = GetProjects().SingleOrDefault(t => t.Name == project1) },
                new Activity() { Date = DateTime.Today, StartTime = DateTime.Now.TimeOfDay.Subtract(TimeSpan.FromHours(1.5)), EndTime = DateTime.Now.TimeOfDay, Name = activity3, Project = GetProjects().SingleOrDefault(t => t.Name == project2) }
            }.AsQueryable();

        internal static IQueryable<Client> GetClients() => new List<Client>
        {
               new Client() { Name = client1 },
               new Client() { Name = client2 },
               new Client() { Name = client3 },
               new Client() { Name = client4 }
        }.AsQueryable();

        internal static IQueryable<Project> GetProjects() => new List<Project>
            {       new Project() { Name = project1 },
                    new Project() { Name = project2, Client = GetClients().SingleOrDefault(t => t.Name == client1) },
                    new Project() { Name = project3, Client = GetClients().SingleOrDefault(t => t.Name == client2) },
                    new Project() { Name = project4, Client = GetClients().SingleOrDefault(t => t.Name == client3) }
            }.AsQueryable();

        internal static Mock<TrackingContext> GetMockTrackingContext()
        {
            var activities = GetActivities();
            var projects = GetProjects();
            var clients = GetClients();

            var mockActivities = new Mock<DbSet<Activity>>();
            mockActivities.As<IQueryable<Activity>>().Setup(m => m.Provider).Returns(activities.Provider);
            mockActivities.As<IQueryable<Activity>>().Setup(m => m.Expression).Returns(activities.Expression);
            mockActivities.As<IQueryable<Activity>>().Setup(m => m.ElementType).Returns(activities.ElementType);
            mockActivities.As<IQueryable<Activity>>().Setup(m => m.GetEnumerator()).Returns(activities.GetEnumerator());

            var mockProjects = new Mock<DbSet<Project>>();
            mockProjects.As<IQueryable<Project>>().Setup(m => m.Provider).Returns(projects.Provider);
            mockProjects.As<IQueryable<Project>>().Setup(m => m.Expression).Returns(projects.Expression);
            mockProjects.As<IQueryable<Project>>().Setup(m => m.ElementType).Returns(projects.ElementType);
            mockProjects.As<IQueryable<Project>>().Setup(m => m.GetEnumerator()).Returns(projects.GetEnumerator());

            var mockClients = new Mock<DbSet<Client>>();
            mockClients.As<IQueryable<Client>>().Setup(m => m.Provider).Returns(clients.Provider);
            mockClients.As<IQueryable<Client>>().Setup(m => m.Expression).Returns(clients.Expression);
            mockClients.As<IQueryable<Client>>().Setup(m => m.ElementType).Returns(clients.ElementType);
            mockClients.As<IQueryable<Client>>().Setup(m => m.GetEnumerator()).Returns(clients.GetEnumerator());

            var mockCtx = new Mock<TrackingContext>();
            mockCtx.Setup(c => c.Activities).Returns(mockActivities.Object);
            mockCtx.Setup(c => c.Projects).Returns(mockProjects.Object);
            mockCtx.Setup(c => c.Clients).Returns(mockClients.Object);
            
            return mockCtx;
        }
    }
}
