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
    public class ExpenseController : ControllerBase
    {
        private readonly BudgetBuddyDbContext _dbContext;

        public ExpenseController(BudgetBuddyDbContext context)
        {
            _dbContext = context;
        }

        [HttpGet("{userId}")]
        public IActionResult GetExpenseByUserId(int userId)
        {
            var userExpense = _dbContext.Expenses
                .Where(i => i.UserId == userId)
                .ToList();

            if (userExpense == null)
            {
                return NotFound();
            }

            return Ok(userExpense);
        }

[HttpPost("create-expense")]
public IActionResult CreateExpense(Expense expense)
{
    UserProfile userProfile = _dbContext.UserProfiles.SingleOrDefault(u => u.Id == expense.UserId);
    if (userProfile == null)
    {
        return BadRequest("User not found");
    }

    _dbContext.Expenses.Add(expense);
    _dbContext.SaveChanges();


    foreach (var categoryName in expense.Categories)
    {
        var category = _dbContext.Categories.FirstOrDefault(c => c.CategoryName == categoryName);
        if (category != null)
        {
            var expenseCategory = new ExpenseCategory
            {
                ExpenseId = expense.Id,
                CategoryId = category.Id
            };
            _dbContext.ExpenseCategories.Add(expenseCategory);
        }
    }

    _dbContext.SaveChanges();

    return Created($"api/expense/{expense.Id}", expense);
}

        
[HttpGet("expenses")]
public IActionResult GetExpenses()
{
    var expenses = _dbContext.Expenses.Include(e => e.ExpenseCategories).ThenInclude(ec => ec.Category).ToList();
    return Ok(expenses);
}

[HttpPut("{id}")]
public IActionResult UpdateExpense(int id, [FromBody] Expense updatedExpense)
{
    var expense = _dbContext.Expenses.Include(e => e.ExpenseCategories).FirstOrDefault(e => e.Id == id);

    if (expense == null)
    {
        return NotFound();
    }

    expense.Description = updatedExpense.Description;
    expense.Amount = updatedExpense.Amount;

    // Clear existing categories
    expense.ExpenseCategories.Clear();

    // Add new categories
    foreach (var categoryName in updatedExpense.Categories)
    {
        var category = _dbContext.Categories.FirstOrDefault(c => c.CategoryName == categoryName);
        if (category != null)
        {
            var expenseCategory = new ExpenseCategory
            {
                ExpenseId = expense.Id,
                CategoryId = category.Id
            };
            expense.ExpenseCategories.Add(expenseCategory);
        }
    }

    // Update the categories array
    expense.Categories = updatedExpense.Categories;

    _dbContext.SaveChanges();

    return Ok(expense);
}



    }
}
