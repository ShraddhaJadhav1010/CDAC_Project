using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quickrent.DTO.ProductDTO;
using Quickrent.Model;

namespace Quickrent.Service.Interface
{
    public interface IProductService
    {
        //ask AddProduct(SellerProductAddDTO productDTO);
        Task<ProductWithSellerDTO> GetProductById(int id);
        List<SellerProductAddDTO> GetUnverifiedProducts();
        string VerifyProduct(int id);
    }
}