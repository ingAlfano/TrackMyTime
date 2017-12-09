using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Controllers;
using Web.Models;

namespace Web.ApiControllers
{
    [Route("api/[controller]")]
    public class ActivityController : BaseController<Activity>
    {
        public ActivityController(TrackingContext context) : base(context)
        { }

        // GET api/activities
        [HttpGet]
        public IEnumerable<Activity> Get()
        {
            return _context.Activities
                //.Include(t => new { Project = t.Project.Name, Client = t.Project.Client.Name })
                .OrderBy((o) => o.StartTime);
        }

        // GET api/activities/5
        [HttpGet("{id}", Name = "GetActivity")]
        public Activity Get(string id)
        {
            return _context.Activities.Find(id);
        }

        // GET api/activity/
        [HttpGet("{projectId}", Name = "GetClientNameByProjectId")]
        public string GetClientNameByProjectId(string projectId)
        {
            var clientId = _context.Projects.Find(projectId).ClientId;
            return String.IsNullOrWhiteSpace(clientId) ? String.Empty : _context.Clients.Find(clientId).Name;
        }

        // POST api/activities
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Activity model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Activities.Add(model);
            await _context.SaveChangesAsync();
            return CreatedAtRoute("GetActivity", new { id = model.Id }, model);
        }

        // PUT api/activities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]Activity model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            model.Id = id;
            _context.Update(model);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE api/activities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var Activity = new Activity() { Id = id };
            _context.Entry(Activity).State = EntityState.Deleted;

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}