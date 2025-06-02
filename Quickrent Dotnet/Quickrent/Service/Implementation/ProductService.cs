using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Quickrent.DTO.ProductDTO;
using Quickrent.Model;
using Quickrent.Repository.Interface;
using Quickrent.Service.Interface;

namespace Quickrent.Service.Implementation
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public Task<ProductWithSellerDTO> GetProductById(int id)
        {
            return _repository.GetProductById(id);
        }

        public List<SellerProductAddDTO> GetUnverifiedProducts()
        {
            List<Product> products = _repository.GetUnverifiedProducts();
            return _mapper.Map<List<SellerProductAddDTO>>(products);
        }

        public string VerifyProduct(int id)
        {
            _repository.VerifyProduct(id);
            return "Product Listed Successfully";
        }
    }
}