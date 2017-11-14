using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace Model.Entities
{
    public class Project : BaseEntity
    {
        [DisplayName(nameof(Client))]
        public string ClientId { get; set; }
        public virtual Client Client { get; set; }
        [NotMapped]
        [DisplayFormat(DataFormatString = "{0} h")]
        public int Hours { get { return (int)Activities.Sum(t => t.Duration.TotalHours); } }
        public virtual List<Activity> Activities { get; set; }

        public Project()
        {
            Activities = new List<Activity>();
        }
    }
}
