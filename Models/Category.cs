
using System.ComponentModel;

namespace BudgetBuddy.Models;
public class Category
{
    public int Id { get; set; }
    public string CategoryName { get; set; }
    public string ExpenseOrIncome { get; set; }
    public List<ExpenseCategory> ExpenseCategories { get; set; }
    public List<IncomeCategory> IncomeCategories { get; set; }
    
}