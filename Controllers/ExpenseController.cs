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

[HttpPost]
public IActionResult PostExpense([FromBody] Expense expense)
{
UserProfile userProfile = _dbContext.UserProfiles.SingleOrDefault((u)=>u.Id == expense.UserId);
    if (userProfile == null)
    {
        return BadRequest("User not found");
    }

    _dbContext.Expenses.Add(expense);
    _dbContext.SaveChanges();
    return Created($"api/expense/{expense.Id}", expense);
}
        [HttpGet("expenses")]
        public IActionResult GetExpenses()
        {
            var expenses = _dbContext.Expenses.ToList();
            return Ok(expenses);
        }
    }
}
