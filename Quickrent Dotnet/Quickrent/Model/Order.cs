using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Quickrent.Model.Enums;

namespace Quickrent.Model
{
    [Table("orders")]
    public class Order: BaseEntity
    {
        [Column("order_id")]
        public int OrderId { get; set; }

        [Column(TypeName = "DOUBLE DEFAULT 0")]
        public double Discount { get; set; }

        [Column(TypeName = "DOUBLE DEFAULT 0")]
        public double Taxes { get; set; }

        [Required]
        [Column("start_date")]
        public DateTime StartDate { get; set; }

        [Required]
        [Column("end_date")]
        public DateTime EndDate { get; set; }

        //[Required]
        //[Column("billing_cycle")]
        //public BillingCycle BillingCycle { get; set; }

        [Column("is_cancelled", TypeName = "TINYINT(1) DEFAULT 0")]
        public bool IsCancelled { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(255)")]
        public string Address { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(100)")]
        public string City { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(100)")]
        public string State { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(100)")]
        public string Country { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(10)")]
        public string Pincode { get; set; }


        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int UserId { get; set; }
        public User User {get; set;}
    }
}