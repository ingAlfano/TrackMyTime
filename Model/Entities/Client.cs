using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.Entities
{
    public class Client : BaseEntity
    {
        public virtual List<Project> Projects { get; set; }
        public Client() => Projects = new List<Project>();
    }
}