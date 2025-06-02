using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Quickrent.Model.Enums;

namespace Quickrent.Model
{
    [Table("users")]
    public class User: BaseEntity
    {
        [Column("user_id")]
        public int UserId { get; set; }

        [Required]
        [Column("user_role")]
        public UserRole UserRole { get; set; }

        [Required]
        [StringLength(100)]
        [Column("first_name")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        [Column("last_name")]
        public string LastName { get; set; }

        [Required]
        [StringLength(100)]
        [Column("email")]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        [Column("password")]
        public string Password { get; set; }

        [StringLength(15)]
        [Column("phone_no")]
        public string? PhoneNo { get; set; }

        [Required]
        [Column("is_verified", TypeName = "TINYINT(1) DEFAULT 0")]
        public bool? IsVerified { get; set; }

        //[StringLength(20)]
        //[Column("aadhar_card_no")]
        //public string? AadharCardNo { get; set; }

        //[StringLength(255)]
        //[Column("aadhar_card_file")]
        //public string? AadharCardFile { get; set; }

        //[StringLength(20)]
        //[Column("pan_card_no")]
        //public string? PanCardNo { get; set; }

        //[StringLength(255)]
        //[Column("pan_card_file")]
        //public string? PanCardFile { get; set; }

        // Navigation Properties
        public List<Product> Products { get; set; } = new List<Product>();
        public List<Order> Orders { get; set; } = new List<Order>();
        
        //public List<Conflict> Conflicts { get; set; } = new List<Conflict>();

    }
}