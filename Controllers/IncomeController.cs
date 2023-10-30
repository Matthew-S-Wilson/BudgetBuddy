using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using BudgetBuddy.Data;
using BudgetBuddy.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;


namespace YourProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IncomeController : ControllerBase
    {
        private readonly BudgetBuddyDbContext _dbContext;

        public IncomeController(BudgetBuddyDbContext context)
        {
            _dbContext = context;
        }

        [HttpGet("{userId}")]
        public IActionResult GetIncomeByUserId(int userId)
        {
            var userIncome = _dbContext.Incomes
                .Where(i => i.UserId == userId)
                .ToList();

            if (userIncome == null)
            {
                return NotFound();
            }

            return Ok(userIncome);
        }

        [HttpPost("create-income")]
        public IActionResult CreateIncome(Income income)
        {
            UserProfile userProfile = _dbContext.UserProfiles.SingleOrDefault(u => u.Id == income.UserId);
            if (userProfile == null)
            {
                return BadRequest("User not found");
            }

            _dbContext.Incomes.Add(income);
            _dbContext.SaveChanges();


            foreach (var categoryName in income.Categories)
            {
                var category = _dbContext.Categories.FirstOrDefault(c => c.CategoryName == categoryName);
                if (category != null)
                {
                    var incomeCategory = new IncomeCategory
                    {
                        IncomeId = income.Id,
                        CategoryId = category.Id
                    };
                    _dbContext.IncomeCategories.Add(incomeCategory);
                }
            }

            _dbContext.SaveChanges();

            return Created($"api/income/{income.Id}", income);
        }

        [HttpGet("incomes")] // Updated route to specify incomes
        public IActionResult GetIncomes()
        {
            var incomes = _dbContext.Incomes.Include(e => e.IncomeCategories).ThenInclude(ec => ec.Category).ToList();
            return Ok(incomes);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateIncome(int id, [FromBody] Income updatedIncome)
        {
            var income = _dbContext.Incomes.Include(e => e.IncomeCategories).FirstOrDefault(e => e.Id == id);

            if (income == null)
            {
                return NotFound();
            }

            income.Description = updatedIncome.Description;
            income.Amount = updatedIncome.Amount;

            // Clear existing categories
            income.IncomeCategories.Clear();

            // Add new categories
            foreach (var categoryName in updatedIncome.Categories)
            {
                var category = _dbContext.Categories.FirstOrDefault(c => c.CategoryName == categoryName);
                if (category != null)
                {
                    var incomeCategory = new IncomeCategory
                    {
                        IncomeId = income.Id,
                        CategoryId = category.Id
                    };
                    income.IncomeCategories.Add(incomeCategory);
                }
            }

            // Update the categories array
            income.Categories = updatedIncome.Categories;

            _dbContext.SaveChanges();

            return Ok(income);
        }
    }

}

