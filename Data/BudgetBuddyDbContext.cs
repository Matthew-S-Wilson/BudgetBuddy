using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using BudgetBuddy.Models;
using Microsoft.AspNetCore.Identity;

namespace BudgetBuddy.Data;
public class BudgetBuddyDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Expense> Expenses { get; set; } // Add this line
    public DbSet<Income> Incomes { get; set; } // Add this line
    public DbSet<Category> Categories { get; set; } // Add this line
    public DbSet<IncomeCategory> IncomeCategories { get; set; }
    public DbSet<ExpenseCategory> ExpenseCategories { get; set; }

    public BudgetBuddyDbContext(DbContextOptions<BudgetBuddyDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admin255@gmail.com",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Matthew",
            LastName = "Wilson",
            Address = "101 Main Street",
        });
        modelBuilder.Entity<Expense>().HasData(new Expense[]
{
            new Expense
            {
            Id = 1,
            Amount = 900,
            Description = "Rent for my apartment",
            UserId = 1,
            },
            new Expense
            {
            Id = 2,
            Amount = 200,
            Description = "Groceries",
            UserId = 1,
            },

});
        modelBuilder.Entity<Income>().HasData(new Income[]
    {
            new Income
            {
            Id = 1,
            Amount =4000 ,
            Description = "Paycheck at Disney for month",
            UserId = 1,
            },
            new Income
            {
            Id = 2,
            Amount = 200,
            Description = "Monthly Disney Dividend",
            UserId = 1,
            },

    });
        modelBuilder.Entity<Category>().HasData(new Category[]
    {
            new Category
            {
            Id = 1,
            CategoryName = "Housing",
            ExpenseOrIncome = "Expense",

            },
            new Category
            {
            Id = 2,
            CategoryName = "Food",
            ExpenseOrIncome = "Expense"
            },


            new Category
            {
            Id = 3,
            CategoryName = "Rent",
            ExpenseOrIncome = "Income"
            },
            new Category
            {
            Id = 4,
            CategoryName = "Part-Time Job",
            ExpenseOrIncome = "Income"
            },

    });

    }
}