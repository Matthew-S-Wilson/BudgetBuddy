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

        [HttpPost]
        public IActionResult PostIncome([FromBody] Income income)
        {
            UserProfile userProfile = _dbContext.UserProfiles.SingleOrDefault(u => u.Id == income.UserId);
            if (userProfile == null)
            {
                return BadRequest("User not found");
            }

            _dbContext.Incomes.Add(income);
            _dbContext.SaveChanges();
            return Created($"api/income/{income.Id}", income);
        }


    }
}

