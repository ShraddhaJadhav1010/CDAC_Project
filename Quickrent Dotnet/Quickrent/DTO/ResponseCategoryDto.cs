using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quickrent.DTO
{
    public class ResponseCategoryDto
    {
        public int ProductId { get; set; }


        public string Title { get; set; }


        public string BrandName { get; set; }


        public string ModelName { get; set; }


        public string Description { get; set; }


        public string? Specifications { get; set; }


        public double Price { get; set; }


        public double AdvancePayment { get; set; }


        public bool? IsActive { get; set; } = true;


        public bool? IsApproved { get; set; } = false;


        public string? Image { get; set; }


        public int UserId { get; set; }

        public int CategoryId { get; set; }
    }
}