using System.ComponentModel;
using System.Linq;

namespace BudgetBuddy.Models
{
    public class NetIncome
    {
        public int Id { get; set; }


        [DisplayName("Net Income")]
        public int NetIncomeValue 
        {
            get
            {
                // Calculate the net income by summing all the incomes and subtracting all the expenses
                int totalIncome = UserProfile.Incomes.Sum(i => i.Amount);
                int totalExpense = UserProfile.Expenses.Sum(e => e.Amount);
                return totalIncome - totalExpense;
            }
        }


        public UserProfile UserProfile { get; set; }
    }
}
