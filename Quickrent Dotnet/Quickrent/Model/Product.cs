using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Quickrent.Model
{
    [Table("products")]
    public class Product: BaseEntity
    {
        [Column("product_id")]
        public int ProductId {get; set;}

        [Required]
        [StringLength(100)]
        public string Title {get; set;}

        [Required]
        [Column("brand_name")]
        public string BrandName {get; set;}

        [Required]
        [Column("model_name")]
        public string ModelName {get; set;}

        [Required]
        [StringLength(512)]
        public string Description {get; set;}
        
        [Column(TypeName = "TEXT")]
        public string? Specifications {get; set;}

        [Required]
        public double Price {get; set;}

        [Required]
        [Column("advance_payment")]
        public double AdvancePayment {get; set;}

        [Column("is_active", TypeName = "TINYINT(1) DEFAULT 1")]
        public bool? IsActive {get; set;} = true;

        [Column("is_approved", TypeName = "TINYINT(1) DEFAULT 0")]
        public bool? IsApproved {get; set;} = false;

        [StringLength(255)]
        public string? Image {get; set;}

        [Required]
        [Column("user_id")]
        public int UserId {get; set;}
        public User User {get; set;}

        [Required]
        [Column("category_id")]
        public int CategoryId {get; set;}
        public Category Category {get; set;}

        public List<Order> Orders {get; set;}
    }
}