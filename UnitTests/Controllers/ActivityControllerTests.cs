using Model;
using Moq;
using System.Threading.Tasks;
using Web.Controllers;
using Xunit;
using System;
using Model.Entities;
using Web.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using Microsoft.EntityFrameworkCore;

namespace UnitTests.Controllers
{
    public class ActivityControllerTests
    {
        #region Index
        [Fact]
        public async Task Index_ReturnsAViewResult_WithAListOfTimeLineViewModel()
        {
            // Arrange
            var ctx = GetData.GetMockTrackingContext();
            var controller = new ActivityController(ctx.Object);

            // Act
            var result = await controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<TimeLineViewModel>>(
                viewResult.ViewData.Model);

            //I have 3 activities grouped in 2 days
            Assert.Equal(2, model.Count());
        }

        #endregion
        #region Create
        [Fact]
        public async Task Create_ReturnsARedirectAndAddsAnActivity_WhenModelStateIsValid()
        {
            //Arrange
            var ctx = GetData.GetMockTrackingContext();
            ctx.Setup(t => t.Add(It.IsAny<Activity>())).Verifiable();
            var controller = new ActivityController(ctx.Object);
            var newActiity = new Activity() { Date = DateTime.Today, StartTime = DateTime.Now.TimeOfDay.Subtract(TimeSpan.FromHours(1.5)), EndTime = DateTime.Now.TimeOfDay, Name = "NewActivity", Project = GetData.GetProjects().FirstOrDefault() };

            //Act
            var result = await controller.Create(newActiity);

            //Assert
            var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Null(redirectToActionResult.ControllerName);
            Assert.Equal(nameof(controller.Index), redirectToActionResult.ActionName);
            ctx.Verify();
        }

        [Fact]
        public async Task Create_ReturnsAViewResult_WithAListOfTimeLineViewModel_WhenModelStateIsInvalid()
        {
            // Arrange
            var ctx = GetData.GetMockTrackingContext();
            var controller = new ActivityController(ctx.Object);
            controller.ModelState.AddModelError(nameof(Activity.ProjectId), "Required");
            var newActivity = new Activity() { Date = DateTime.Today, StartTime = DateTime.Now.TimeOfDay.Subtract(TimeSpan.FromHours(1.5)), EndTime = DateTime.Now.TimeOfDay, Name = "NewActivity", Project = GetData.GetProjects().FirstOrDefault() };

            // Act
            var result = await controller.Create(newActivity);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<TimeLineViewModel>>(
                viewResult.ViewData.Model);

            //I have 3 activities grouped in 2 days
            Assert.Equal(2, model.Count());
        }
        #endregion
        #region Edit
        [Theory]
        [InlineData("")]
        [InlineData(null)]
        [InlineData(" ")]
        [InlineData("This ActivityId should not exist")]
        public async Task Edit_ReturnsNotFound_ForInvalidId(string id)
        {
            // Arrange
            var ctx = GetData.GetMockTrackingContext();
            var controller = new ActivityController(ctx.Object);


            // Act
            var result = await controller.Edit(id);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Edit_ReturnsAViewResult_WithAnActivity_ForValidId()
        {
            //Arrange
            var ctx = GetData.GetMockTrackingContext();
            var controller = new ActivityController(ctx.Object);
            var existingActivity = ctx.Object.Activities.FirstOrDefault();

            //Act
            var result = await controller.Edit(existingActivity.Id);

            //Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<Activity>(viewResult.ViewData.Model);
            Assert.StrictEqual(existingActivity, model);
        }

        [Theory]
        [InlineData("")]
        [InlineData(null)]
        [InlineData(" ")]
        [InlineData("This ActivityId should not exist")]
        public async Task EditPost_ReturnNotFound_ForInvalidId(string id)
        {
            // Arrange
            var ctx = GetData.GetMockTrackingContext();
            var controller = new ActivityController(ctx.Object);
            var toBeEditedActivity = ctx.Object.Activities.LastOrDefault();


            // Act
            var result = await controller.Edit(id, toBeEditedActivity);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task EditPost__ReturnsARedirectAndUpdatesAnActivity_WhenModelStateIsValid()
        {
            //Arrange
            var ctx = GetData.GetMockTrackingContext();
            ctx.Setup(t => t.Update(It.IsAny<Activity>())).Verifiable();
            var controller = new ActivityController(ctx.Object);
            var updatedActivity = new Activity() { Date = DateTime.Today, StartTime = DateTime.Now.TimeOfDay.Subtract(TimeSpan.FromHours(1.5)), EndTime = DateTime.Now.TimeOfDay, Name = "UpdatedActivity", Project = GetData.GetProjects().FirstOrDefault() };

            //Act
            var result = await controller.Edit(updatedActivity.Id, updatedActivity);

            //Assert
            var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Null(redirectToActionResult.ControllerName);
            Assert.Equal(nameof(controller.Index), redirectToActionResult.ActionName);
            ctx.Verify();
        }

        [Theory]
        [InlineData("")]
        [InlineData(null)]
        [InlineData(" ")]
        [InlineData("This ActivityId should not exist")]
        public async Task EditPost__ReturnsNotFound_ForInvalidId_WhenModelStateIsValid(string invalidId)
        {
            //Arrange
            var ctx = GetData.GetMockTrackingContext();
            ctx.Setup(t => t.Update(It.IsAny<Activity>())).Verifiable();
            var controller = new ActivityController(ctx.Object);
            var updatedActivity = new Activity() { Date = DateTime.Today, StartTime = DateTime.Now.TimeOfDay.Subtract(TimeSpan.FromHours(1.5)), EndTime = DateTime.Now.TimeOfDay, Name = "UpdatedActivity", Project = GetData.GetProjects().FirstOrDefault() };
            var validId = updatedActivity.Id;
            updatedActivity.Id = invalidId;

            //Act
            var result = await controller.Edit(validId, updatedActivity);

            //Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task EditPost__ReturnsViewResult_WithAnActivity_WhenModelStateIsInvalid()
        {
            // Arrange
            var ctx = GetData.GetMockTrackingContext();
            var controller = new ActivityController(ctx.Object);
            controller.ModelState.AddModelError(nameof(Activity.ProjectId), "Required");
            var updatedActivity = new Activity() { Date = DateTime.Today, StartTime = DateTime.Now.TimeOfDay.Subtract(TimeSpan.FromHours(1.5)), EndTime = DateTime.Now.TimeOfDay, Name = "UpdatedActivity", Project = GetData.GetProjects().FirstOrDefault() };

            // Act
            var result = await controller.Edit(updatedActivity.Id, updatedActivity);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<Activity>(
                viewResult.ViewData.Model);
        }
        #endregion
        #region Delete

        [Theory]
        [InlineData("")]
        [InlineData(null)]
        [InlineData(" ")]
        [InlineData("This ActivityId should not exist")]
        public async Task Delete_ReturnsNotFound_ForInvalidId(string id)
        {
            // Arrange
            var ctx = GetData.GetMockTrackingContext();
            var controller = new ActivityController(ctx.Object);

            // Act
            var result = await controller.Delete(id);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Delete_ReturnsAViewResult_WithAnActivity_ForValidId()
        {
            //Arrange
            var ctx = GetData.GetMockTrackingContext();
            var controller = new ActivityController(ctx.Object);
            var toBeDeletedActivity = ctx.Object.Activities.FirstOrDefault();

            //Act
            var result = await controller.Delete(toBeDeletedActivity.Id);

            //Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<Activity>(viewResult.ViewData.Model);
            Assert.StrictEqual(toBeDeletedActivity, model);
        }

        [Fact]
        public async Task DeletePost_ReturnsARedirectAndRemoveAnActivity()
        {
            //Arrange
            var ctx = GetData.GetMockTrackingContext();
            var toBeDeletedActivity = ctx.Object.Activities.FirstOrDefault();

            var controller = new ActivityController(ctx.Object);
            

            //Act
            var result = await controller.DeleteConfirmed(toBeDeletedActivity.Id);

            //Assert
            var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Null(redirectToActionResult.ControllerName);
            Assert.Equal(nameof(controller.Index), redirectToActionResult.ActionName);
        }

        #endregion
    }
}
