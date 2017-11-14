using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Entities;
using Web.Models;

namespace Web.Controllers
{
    public class ActivityController : BaseController<Activity>
    {
        private IEnumerable<TimeLineViewModel> _timeLineList
        {
            get
            {
                //Due to an EF core 2.0 issue, I have to split the query because I can't run GroupBy and Select
                var groupedData = _context.Activities.OrderByDescending(t => t.Date).Include(a => a.Project).Include(a => a.Project.Client).Take(5).GroupBy(t => t.Date).AsEnumerable();
                return groupedData.Select(t => new TimeLineViewModel() { Date = t.Key, Activities = t });
            }
        }

        public ActivityController(TrackingContext context) : base(context)
        {
        }

        // GET: Activity
        public async Task<IActionResult> Index()
        {
            ViewBag.Projects = _projectsList;
            return View(_timeLineList);
        }

        // POST: Activity/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Date,StartTime,EndTime,ProjectId,Id,Name")] Activity activity)
        {
            if (ModelState.IsValid)
            {
                _context.Add(activity);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }

            ViewBag.Projects = _projectsList;
            return View(nameof(Index), _timeLineList);
        }

        // GET: Activity/Edit/5
        public async Task<IActionResult> Edit(string id)
        {
            if (String.IsNullOrWhiteSpace(id))
            {
                return NotFound();
            }

            var activity = _context.Activities.SingleOrDefault(m => m.Id == id);
            if (activity == null)
            {
                return NotFound();
            }

            ViewBag.Projects = _projectsList;
            return View(activity);
        }

        // POST: Activity/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("Date,StartTime,EndTime,ProjectId,Id,Name")] Activity activity)
        {
            if (id != activity.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(activity);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Exists(activity.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewBag.Projects = _projectsList;
            return View(activity);
        }

        // GET: Activity/Delete/5
        public async Task<IActionResult> Delete(string id)
        {
            if (String.IsNullOrWhiteSpace(id))
            {
                return NotFound();
            }

            var activity = _context.Activities.Include(a => a.Project).SingleOrDefault(m => m.Id == id);
            if (activity == null)
            {
                return NotFound();
            }

            return View(activity);
        }

        // POST: Activity/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var activity = _context.Activities.SingleOrDefault(m => m.Id == id);
            _context.Activities.Remove(activity);
            _context.SaveChanges();
            return RedirectToAction(nameof(Index));
        }
    }
}