using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using Quickrent.Data;
using Quickrent.DTO;
using Quickrent.Model;
using Quickrent.Repository.Interface;
using Quickrent.Service.Interface;

namespace Quickrent.Service.Implementation
{
    public class CategoryService: ICategoryService
    {
        IMapper _mapper;

        private readonly ICategoryRepository _repository;
        private readonly IDistributedCache _cache;


        public CategoryService(QuickrentContext context, IMapper mapper, ICategoryRepository categoryRepository, IDistributedCache cache)
        {
            _mapper = mapper;
            _repository = categoryRepository;
            _cache = cache;

        }

        public async Task<List<ResponseCategoryDto>> GetProductsByCategoryIdAsync(int categoryId)
        {
            // Retrieve the category with its products
            Category category = await _repository.GetProductsByCategoryIdAsync(categoryId);

            // Handle case where category is not found
            if (category == null)
            {
                throw new KeyNotFoundException($"Category with ID {categoryId} not found.");
            }

            List<Product> products = category.Products.ToList(); // Return the products list
            return _mapper.Map<List<ResponseCategoryDto>>(products);
        }

        public List<Category> getAllCategories()
        {
            if (_cache.GetString("categories") != null)
            {
                List<Category> categorydata = JsonConvert.DeserializeObject<List<Category>>(_cache.GetString("categories"));
                return categorydata;
            }
            else 
            {
                List<Category> categories = _repository.GetAllCategories();

                if (categories == null)
                {
                    throw new ApplicationException("No Categories present into the database");
                }

                string categoryData = JsonConvert.SerializeObject(categories);
                var options = new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                };
                _cache.SetString("categories", categoryData, options);
                return categories;
            }
        }
    }
}