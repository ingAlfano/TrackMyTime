using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class ReportViewModel
    {
        public string Id { get; set; }
        public string Client { get; set; }
        public string Project { get; set; }
        public string Activity { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        public double Duration { get; set; }

        public ReportViewModel()
        {
            this.Id = Guid.NewGuid().ToString();
        }
    }
}