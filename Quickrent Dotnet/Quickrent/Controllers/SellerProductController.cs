using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Quickrent.DTO;
using Quickrent.DTO.ProductDTO;
using Quickrent.Service;

namespace Quickrent.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class SellerProductController : ControllerBase
    {
        private readonly SellerAddProductService _productService;
        private readonly IWebHostEnvironment _env;

        public SellerProductController(SellerAddProductService productService, IWebHostEnvironment env)
        {
            _productService = productService;
            _env = env;
        }

        //[Authorize(Roles = "Seller")]
        [Route("api/product/add")]
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromForm] SellerProductAddDTO productDTO)
        {
            if (productDTO.ImageFile == null || productDTO.ImageFile.Length == 0)
                return BadRequest(new { errors = new { Image = new[] { "Image file is required." } } });

            var imagePath = await SaveImage(productDTO.ImageFile);
            productDTO.Image = imagePath;

            var product = await _productService.AddProduct(productDTO);
            return Ok(product);
        }

        //[Authorize(Roles = "Seller")]
        [Route("api/product/user/{id}")]
        [HttpGet]
        public async Task<ActionResult<List<SellerProductAddDTO>>> GetProductsByUserId(int id)
        {
            var products = await _productService.GetProductsByUserId(id);
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productService.GetProductById(id);
            if (product == null)
                return NotFound(new { message = "Product not found." });

            return Ok(product);
        }

        //[Authorize(Roles = "Seller")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] SellerProductAddDTO productDTO)
        {
            var existingProduct = await _productService.GetProductById(id);
            if (existingProduct == null)
                return NotFound($"Product with ID {id} not found.");

            if (productDTO.ImageFile != null && productDTO.ImageFile.Length > 0)
            {
                var imagePath = await SaveImage(productDTO.ImageFile);
                productDTO.Image = imagePath;
            }
            else
            {
                productDTO.Image = existingProduct.Image;
            }

            var updatedProduct = await _productService.UpdateProduct(id, productDTO);
            return Ok(updatedProduct);
        }

        //[Authorize(Roles = "Seller")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productService.GetProductById(id);
            if (product == null)
                return NotFound(new { message = "Product not found." });

            await _productService.DeleteProduct(id);
            return Ok(new { message = "Product deleted successfully." });
        }

        private async Task<string> SaveImage(IFormFile imageFile)
        {
            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + imageFile.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return Path.Combine("uploads", uniqueFileName).Replace("\\", "/");
        }
    }
}
