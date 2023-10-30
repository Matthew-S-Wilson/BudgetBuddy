
using System.ComponentModel;

namespace BudgetBuddy.Models;
public class Income
{
    public int Id { get; set; }
    public int Amount { get; set; }
    public string Description { get; set; }
    public int UserId { get; set; }
    public List<string> Categories { get; set; } 
    public UserProfile UserProfile { get; set; }
    public List<IncomeCategory> IncomeCategories { get; set; }
}