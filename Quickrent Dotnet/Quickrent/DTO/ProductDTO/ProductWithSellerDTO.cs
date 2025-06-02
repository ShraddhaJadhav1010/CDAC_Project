using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quickrent.DTO.ProductDTO
{
    public class ProductWithSellerDTO
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public string BrandName { get; set; }
        public string ModelName { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public double AdvancePayment { get; set; }
        public string CategoryName { get; set; }
        public string Image { get; set; }
        public SellerDTO Seller { get; set; }
    }
}