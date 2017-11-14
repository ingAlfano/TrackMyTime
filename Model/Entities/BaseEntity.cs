using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.Entities
{
    public class BaseEntity
    {
        [Key]
        public string Id { get; set; }
        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        public BaseEntity()
        {
            this.Id = Guid.NewGuid().ToString();
        }
    }
}
