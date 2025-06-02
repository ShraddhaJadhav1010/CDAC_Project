using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quickrent.Model;

namespace Quickrent.Repository.Interface
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
        Task<Category> GetProductsByCategoryIdAsync(int categoryId);
    }
}