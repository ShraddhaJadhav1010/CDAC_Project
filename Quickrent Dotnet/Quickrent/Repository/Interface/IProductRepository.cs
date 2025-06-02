using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quickrent.DTO.ProductDTO;
using Quickrent.Model;

namespace Quickrent.Repository.Interface
{
    public interface IProductRepository
    {
        Task<ProductWithSellerDTO> GetProductById(int id);
        List<Product> GetUnverifiedProducts();
        void VerifyProduct(int id);
    }
}