using Microsoft.EntityFrameworkCore;
using Quickrent.Data;
using Quickrent.Model;

namespace Quickrent.Repository
{
    public class SellerAddProductRepository
    {
        private readonly QuickrentContext _context;

        public SellerAddProductRepository(QuickrentContext context)
        {
            _context = context;
        }

        // Add Product
        public async Task<Product> AddProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        // Get All Active Products
        public async Task<List<Product>> GetProductsByUserId(int id)
        {
            return await _context.Products
            .Where(p => p.IsActive == true && p.UserId == id)
            .ToListAsync();
        }

        // Get Product By ID
        public async Task<Product> GetProductById(int id)
        {
            return await _context.Products
                                 .AsNoTracking()
                                 .FirstOrDefaultAsync(p => p.ProductId == id);
        }

        // Update Product
        public async Task<Product> UpdateProduct(Product product)
        {
            var existingProduct = await _context.Products.FindAsync(product.ProductId);
            if (existingProduct == null)
            {
                throw new InvalidOperationException($"Product with ID {product.ProductId} not found.");
            }

            existingProduct.Title = product.Title;
            existingProduct.BrandName = product.BrandName;
            existingProduct.ModelName = product.ModelName;
            existingProduct.Description = product.Description;
            existingProduct.Specifications = product.Specifications;
            existingProduct.Price = product.Price;
            existingProduct.AdvancePayment = product.AdvancePayment;
            existingProduct.Image = product.Image;
            existingProduct.CategoryId = product.CategoryId;
            existingProduct.UserId = product.UserId;

            _context.Products.Update(existingProduct);
            await _context.SaveChangesAsync();

            return existingProduct;
        }

        // Soft Delete Product
        public async Task SoftDeleteProduct(int productId)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product != null)
            {
                product.IsActive = false;  // Soft delete
                _context.Products.Update(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}