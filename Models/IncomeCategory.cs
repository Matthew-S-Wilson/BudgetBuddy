
using System.ComponentModel;

namespace BudgetBuddy.Models;
public class IncomeCategory
{
    public int Id { get; set; }
    public int IncomeId { get; set; }
    public int CategoryId { get; set; }
    public List<IncomeCategory> IncomeCategories { get; set; }
    public Income Income { get; set; }
    public Category Category { get; set; }
}