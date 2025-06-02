using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Quickrent.Model
{
    [Table("categories")]
    public class Category
    {
        [Column("category_id")]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(100)]
        [Column("category_name")]
        public string CategoryName { get; set; }

        //[StringLength(255)]
        //[Column("description")]
        //public string? Description { get; set; }

        //[StringLength(100)]
        //[Column("parent_category")]
        //public string? ParentCategory { get; set; }

        public List<Product> Products { get; set; } = new List<Product>();
        
    }
}