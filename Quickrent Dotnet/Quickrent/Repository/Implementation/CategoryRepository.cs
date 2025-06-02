using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quickrent.Data;
using Quickrent.Model;
using Quickrent.Repository.Interface;

namespace Quickrent.Repository.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly QuickrentContext _context;

        public CategoryRepository(QuickrentContext context)
        {
            _context = context;
        }

        public List<Category> GetAllCategories()
        {
            return _context.Categories.ToList();
        }

        public Task<Category> GetProductsByCategoryIdAsync(int categoryId)
        {
            return _context.Categories
                    .Where(c => c.CategoryId == categoryId)
                    .Select(c => new Category
                    {
                    CategoryId = c.CategoryId,
                    CategoryName = c.CategoryName,
                    Products = c.Products.Where(p => p.IsApproved == true).ToList() // Filter products here
                    })
                    .FirstOrDefaultAsync();
        }
    }
}