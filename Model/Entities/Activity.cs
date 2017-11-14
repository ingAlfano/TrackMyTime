using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.Entities
{
    public class Activity : BaseEntity
    {
        //[Required]
        //[MaxLength(20)]
        //public string Name { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
        [Required]
        [DataType(DataType.Time)]
        [DisplayFormat(DataFormatString = "{0:hh\\:mm}")]
        [DisplayName("Start Time")]
        public TimeSpan StartTime { get; set; }
        [Required]
        [DataType(DataType.Time)]
        [DisplayFormat(DataFormatString = "{0:hh\\:mm}")]
        [DisplayName("End Time")]
        public TimeSpan EndTime { get; set; }
        [NotMapped]
        public TimeSpan Duration { get { return EndTime.Subtract(StartTime); } }
        [DisplayName("Project")]
        public string ProjectId { get; set; }
        public virtual Project Project { get; set; }
    }
}
