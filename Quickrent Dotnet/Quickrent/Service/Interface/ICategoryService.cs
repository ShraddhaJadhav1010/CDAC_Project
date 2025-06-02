using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quickrent.DTO;
using Quickrent.Model;

namespace Quickrent.Service.Interface
{
    public interface ICategoryService
    {
        List<Category> getAllCategories();
        Task<List<ResponseCategoryDto>> GetProductsByCategoryIdAsync(int categoryId);
    }
}