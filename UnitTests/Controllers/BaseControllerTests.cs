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
    public class BaseControllerTests
    {
        //[Theory]
        //[InlineData(typeof(Activity))]
        //[InlineData(typeof(Client))]
        //[InlineData(typeof(Project))]
        //public async Task Exists_ReturnsTrue_ForExistingEntity<T>() where T : BaseEntity
        //{
        //    // Arrange
        //    var ctx = GetData.GetMockTrackingContext();
        //    var controller = new BaseController<T>(ctx.Object);
        //    var entity = ctx.Object.Set<T>().FirstOrDefault();

        //    // Act
        //    var result = controller.Exists(((BaseEntity)entity).Id);

        //    // Assert
        //    Assert.True(result);
        //}

        //[Theory]
        //[InlineData(typeof(Activity), "This Activity should not exist")]
        //[InlineData(typeof(Client), " ")]
        //[InlineData(typeof(Project), "")]
        //[InlineData(typeof(Project), null)]
        //public async Task Exists_ReturnsFalse_ForNotExistingEntity<T>(string id) where T : BaseEntity
        //{
        //    // Arrange
        //    var ctx = GetData.GetMockTrackingContext();
        //    var controller = new BaseController<T>(ctx.Object);

        //    // Act
        //    var result = controller.Exists(id);

        //    // Assert
        //    Assert.False(result);
        //}
    }
}
