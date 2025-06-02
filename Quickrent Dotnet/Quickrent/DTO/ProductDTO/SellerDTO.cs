using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quickrent.DTO.ProductDTO
{
    public class SellerDTO
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? PhoneNo { get; set; }
    }
}