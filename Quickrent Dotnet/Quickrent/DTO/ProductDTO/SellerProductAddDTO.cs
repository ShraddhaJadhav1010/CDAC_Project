namespace Quickrent.DTO.ProductDTO
{
    public class SellerProductAddDTO
    {
        public string Title { get; set; }
        public string BrandName { get; set; }
        public string ModelName { get; set; }
        public string Description { get; set; }
        public string Specifications { get; set; }
        public double Price { get; set; }
        public double AdvancePayment { get; set; }
        public IFormFile ImageFile { get; set; } // For receiving file from client
        public string Image { get; set; } // For storing image path
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int ProductId { get; internal set; }
        public int IsActive { get; set; } = 1;
    }
}
