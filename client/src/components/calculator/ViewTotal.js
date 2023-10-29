import React, { useState, useEffect } from "react";
import { getAllExpenses } from "../../managers/expenseManager.js";
import { getAllIncomes } from "../../managers/incomeManagaer.js";

const ViewTotals = ({ loggedInUser }) => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      getAllExpenses(loggedInUser.id)
        .then((data) => setExpenses(data || [])) // Ensure data is not undefined
        .catch((error) => console.error("Error fetching expenses:", error));
      getAllIncomes(loggedInUser.id)
        .then((data) => setIncomes(data || [])) // Ensure data is not undefined
        .catch((error) => console.error("Error fetching incomes:", error));
    }
  }, [loggedInUser]);

  return (
    <div>
      <h1>View Totals</h1>
      <h2>Expenses</h2>
      {expenses && expenses.length > 0 ? (
        expenses.map((expense) => (
          <div key={expense.id}>
            <p>Description: {expense.description}</p>
            <p>Amount: {expense.amount}</p>
            {/* Add more details here as needed */}
          </div>
        ))
      ) : (
        <p>No expenses to display</p>
      )}
      <h2>Incomes</h2>
      {incomes && incomes.length > 0 ? (
        incomes.map((income) => (
          <div key={income.id}>
            <p>Description: {income.description}</p>
            <p>Amount: {income.amount}</p>
            {/* Add more details here as needed */}
          </div>
        ))
      ) : (
        <p>No incomes to display</p>
      )}
    </div>
  );
};

export default ViewTotals;
