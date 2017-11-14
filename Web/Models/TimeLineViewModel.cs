using Model.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class TimeLineViewModel
    {
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        public IEnumerable<Activity> Activities { get; set; }
    }
}
