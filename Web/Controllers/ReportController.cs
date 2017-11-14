using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Entities;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;
using Web.Models;
using Newtonsoft.Json;

namespace Web.Controllers
{
    public class ReportController : BaseController<BaseEntity>
    {
        public ReportController(TrackingContext context) : base(context) {}       

        public IActionResult Index() => View();

        public IActionResult Error() => base.View(new ErrorViewModel { RequestId = System.Diagnostics.Activity.Current?.Id ?? HttpContext.TraceIdentifier });

        public async Task<IQueryable<ReportViewModel>> GetReportDataAsync() => _context.Activities
            .Include(t => t.Project)
            .Include(t => t.Project.Client)
            .Select(a => new ReportViewModel
            {
                Client = a.Project != null && a.Project.Client != null ? a.Project.Client.Name : EmptyEntity,
                Project = a.Project != null ? a.Project.Name : EmptyEntity,
                Activity = a.Name,
                Date = a.Date,
                Duration = a.Duration.TotalHours
            });

        public async Task<IActionResult> ReportRead([DataSourceRequest] DataSourceRequest request)
        {
            var reportData = await GetReportDataAsync();
            return Json(await reportData.ToDataSourceResultAsync(request));
        }
    }
}