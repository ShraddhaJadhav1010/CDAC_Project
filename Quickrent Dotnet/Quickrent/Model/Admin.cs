using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Quickrent.Model
{
    public class Admin
    {
        [Column("empid")]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        [Column("email")]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        [Column("password")]
        public string Password { get; set; }
    }
}
