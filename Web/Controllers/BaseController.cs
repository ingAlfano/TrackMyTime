using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Model;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers
{
    public class BaseController<T> : Controller where T : BaseEntity
    {
        protected readonly TrackingContext _context;
        protected SelectList _projectsList => new SelectList(_context.Projects, nameof(Project.Id), nameof(Project.Name));
        protected SelectList _clientsList => new SelectList(_context.Clients, nameof(Client.Id), nameof(Client.Name));
        protected String EmptyEntity => "None";

        public BaseController(TrackingContext context) => _context = context;

        public bool Exists(string id) => _context.Set<T>().Any(e => e.Id == id);
    }
}