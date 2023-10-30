using Microsoft.AspNetCore.Mvc;
using BudgetBuddy.Data;
using BudgetBuddy.Models;


namespace YourProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly BudgetBuddyDbContext _dbContext;

        public CategoryController(BudgetBuddyDbContext context)
        {
            _dbContext = context;
        }

[HttpGet("categories-expenses")]
public IActionResult GetExpenseCategories()
{
    var expenseCategories = _dbContext.Categories
        .Where(c => c.ExpenseOrIncome == "Expense")
        .ToList();

    if (expenseCategories == null)
    {
        return NotFound();
    }

    return Ok(expenseCategories);
}
[HttpGet("categories-incomes")]
public IActionResult GetIncomeCategories()
{
    var incomeCategories = _dbContext.Categories
        .Where(c => c.ExpenseOrIncome == "Income")
        .ToList();

    if (incomeCategories == null)
    {
        return NotFound();
    }

    return Ok(incomeCategories);
}

    }
}
