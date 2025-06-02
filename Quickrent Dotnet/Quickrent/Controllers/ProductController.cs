using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quickrent.Data;
using Quickrent.DTO.ProductDTO;
using Quickrent.Model;
using Quickrent.Service.Implementation;
using Quickrent.Service.Interface;

namespace Quickrent.Controllers
{
    //[Route("api/product")]
    public class ProductController : ControllerBase
    {
        private readonly QuickrentContext _context;

        private readonly IProductService _service;

        public ProductController(IProductService service, QuickrentContext context)
        {
            _context = context;
            _service = service;
        }

        [Route("api/product/{productId}")]
        [HttpGet]
        public async Task<ActionResult<ProductWithSellerDTO>> GetProductById(int productId)
        {
            
            var product = await _context.Products
                .Include(p => p.User)
                .Include(p => p.Category)
                .Where(p => p.ProductId == productId)
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
                .FirstOrDefaultAsync();

            //var product = await _service.GetProductById(id);

            if (product == null)
            {
                return NotFound(new { Message = "Product not found" });
            }

            return Ok(product);
        }

        //[Authorize(Roles = "Admin")]
        [Route("api/product/getall/unverified")]
        [HttpGet]
        public ActionResult<List<SellerProductAddDTO>> GetUnverifiedProducts()
        {
            List<SellerProductAddDTO> products = _service.GetUnverifiedProducts();
            return Ok(products);
        }

        //[Authorize(Roles = "Admin")]
        [Route("api/product/verify/{id}")]
        [HttpPatch]
        public ActionResult<String> VerifyProduct(int id) 
        {
            String message = _service.VerifyProduct(id);
            return Ok(message);
        }

    }
}