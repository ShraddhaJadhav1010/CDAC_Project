using AutoMapper;
using Quickrent.DTO;
using Quickrent.DTO.ProductDTO;
using Quickrent.Model;
using Quickrent.Repository;

namespace Quickrent.Service
{
    public class SellerAddProductService
    {
        private readonly SellerAddProductRepository _productRepository;
        private readonly IMapper _mapper;

        public SellerAddProductService(SellerAddProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        // Add Product
        public async Task<SellerProductAddDTO> AddProduct(SellerProductAddDTO productDTO)
        {
            var product = _mapper.Map<Product>(productDTO);
            product.IsActive = true; // Ensure new products are active
            var addedProduct = await _productRepository.AddProduct(product);
            return _mapper.Map<SellerProductAddDTO>(addedProduct);
        }

        // Get All Active Products
        public async Task<List<SellerProductAddDTO>> GetProductsByUserId(int id)
        {
            var products = await _productRepository.GetProductsByUserId(id);
            return products.Select(p => _mapper.Map<SellerProductAddDTO>(p)).ToList();
        }

        // Get Product By ID
        public async Task<SellerProductAddDTO> GetProductById(int id)
        {
            var product = await _productRepository.GetProductById(id);
            return product == null ? null : _mapper.Map<SellerProductAddDTO>(product);
        }

        // Update Product
        public async Task<SellerProductAddDTO> UpdateProduct(int id, SellerProductAddDTO productDTO)
        {
            var existingProduct = await _productRepository.GetProductById(id);

            if (existingProduct == null)
            {
                throw new InvalidOperationException($"Product with ID {id} not found.");
            }

            var productToUpdate = _mapper.Map<Product>(productDTO);
            productToUpdate.ProductId = id;

            var updatedProduct = await _productRepository.UpdateProduct(productToUpdate);
            return _mapper.Map<SellerProductAddDTO>(updatedProduct);
        }

        // Soft Delete Product
        public async Task DeleteProduct(int productId)
        {
            await _productRepository.SoftDeleteProduct(productId);
        }
    }
}
