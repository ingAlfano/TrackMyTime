using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models
{
    public class FilterViewModel
    {
        [DisplayName("Client")]
        public string ClientId { get; set; }

        [DisplayName("Project")]
        public string ProjectId { get; set; }

        [DataType(DataType.Date)]
        [DisplayName("Start date")]
        public DateTime StartDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayName("End date")]
        public DateTime EndDate { get; set; }
    }
}
