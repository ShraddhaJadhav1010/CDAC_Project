using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quickrent.Data;
using Quickrent.DTO.ProductDTO;
using Quickrent.Model;
using Quickrent.Repository.Interface;

namespace Quickrent.Repository.Implementation
{
    public class ProductRepository : IProductRepository
    {
        QuickrentContext _context;

        public ProductRepository(QuickrentContext context)
        {
            _context = context;   
        }

        public Task<ProductWithSellerDTO> GetProductById(int id)
        {
            /*return _context.Products
                .Include(p => p.User)
                .Include(p => p.Category)
                .Where(p => p.ProductId == id)
                .Select(p => new ProductWithSellerDTO
                {
                    ProductId = p.ProductId,
                    Title = p.Title,
                    BrandName = p.BrandName,
                    ModelName = p.ModelName,
                    Description = p.Description,
                    Price = p.Price,
                    AdvancePayment = p.AdvancePayment,
                    Image = p.Image,
                    //Description = p.Description,
                    CategoryName = p.Category != null ? p.Category.CategoryName : null,
                    Seller = p.User != null ? new SellerDTO
                    {
                        UserId = p.User.UserId,
                        FirstName = p.User.FirstName,
                        LastName = p.User.LastName,
                        Email = p.User.Email,
                        PhoneNo = p.User.PhoneNo
                    } : null
                })
                .FirstOrDefaultAsync();*/
            return null;
        }

        public List<Product> GetUnverifiedProducts()
        {
            return _context.Products
                .Where(p=> p.IsApproved == false)
                .Include(p=> p.User)
                .Include(p => p.Category)
                .ToList();
        }

        public void VerifyProduct(int id)
        {
            Product product = _context.Products.Where(p => p.ProductId == id).FirstOrDefault();
            product.IsApproved = true;
            _context.SaveChanges();
        }
    }
}