using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Quickrent.Model
{
    public class Query : BaseEntity
    {
        [Column("query_id")]
        public int QueryId {get; set;}

        [Required]
        [StringLength(100)]
        public string Name {get; set;}

        [Required]
        [StringLength(255)]
        public string Email {get; set;}

        [Required]
        [StringLength(100)]
        [Column(TypeName = "TEXT")]
        public string Description {get; set;}
    }
}