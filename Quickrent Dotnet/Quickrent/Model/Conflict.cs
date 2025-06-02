using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quickrent.Model
{
    public class Conflict
    {
        [Column("conflict_id")]
        public int ConflictId { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [Column(TypeName = "TEXT")]
        public string Description { get; set; }

        [Required]
        [StringLength(100)]
        [Column("is_resolved")]
        public bool IsResolved { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
