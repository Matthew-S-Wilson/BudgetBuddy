import React, { useState, useEffect } from "react";
import { getAllExpenses, updateExpense } from "../../managers/expenseManager.js";
import { getAllIncomes, updateIncome } from "../../managers/incomeManager.js";
import { getExpenseCategories, getIncomeCategories } from "../../managers/categoryManager.js";
import { deleteExpense } from "../../managers/expenseManager.js";
import { deleteIncome } from "../../managers/incomeManager.js";

const ViewTotals = ({ loggedInUser }) => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingIncome, setEditingIncome] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedIncomeDescription, setUpdatedIncomeDescription] = useState("");
  const [updatedIncomeAmount, setUpdatedIncomeAmount] = useState("");
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [availableIncomeCategories, setAvailableIncomeCategories] = useState([]);
  const [selectedIncomeCategories, setSelectedIncomeCategories] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [difference, setDifference] = useState(0);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setUpdatedDescription(expense.description);
    setUpdatedAmount(expense.amount);
    setSelectedCategories(expense.categories);
  };

  const handleIncomeEdit = (income) => {
    setEditingIncome(income);
    setUpdatedIncomeDescription(income.description);
    setUpdatedIncomeAmount(income.amount);
    setSelectedIncomeCategories(income.categories);
  };

  const handleUpdate = () => {
    const updatedData = {
      ...editingExpense,
      description: updatedDescription,
      amount: updatedAmount,
      categories: selectedCategories,
    };

    updateExpense(editingExpense.id, updatedData)
      .then((res) => {
        console.log("Expense updated:", res);
        setEditingExpense(null);
        setUpdatedDescription("");
        setUpdatedAmount("");
        setSelectedCategories([]);
        getAllExpenses(loggedInUser.id)
          .then((data) => setExpenses(data || []))
          .catch((error) => console.error("Error fetching expenses:", error));
      })
      .catch((error) => console.error("Error updating expense:", error));
  };
  const handleExpenseDelete = (expenseId) => {
    deleteExpense(expenseId)
      .then((res) => {
        console.log("Expense deleted:", res);
        // Refresh the expenses list
        getAllExpenses(loggedInUser.id)
          .then((data) => setExpenses(data || []))
          .catch((error) => console.error("Error fetching expenses:", error));
      })
      .catch((error) => console.error("Error deleting expense:", error));
  };
  const handleIncomeDelete = (incomeId) => {
    deleteIncome(incomeId)
      .then((res) => {
        console.log("Income deleted:", res);
        getAllIncomes(loggedInUser.id)
          .then((data) => setIncomes(data || []))
          .catch((error) => console.error("Error fetching incomes:", error));
      })
      .catch((error) => console.error("Error deleting income:", error));
  };

  const handleIncomeUpdate = () => {
    const updatedData = {
      ...editingIncome,
      description: updatedIncomeDescription,
      amount: updatedIncomeAmount,
      categories: selectedIncomeCategories,
    };
    updateIncome(editingIncome.id, updatedData)
      .then((res) => {
        console.log("Income updated:", res);
        setEditingIncome(null);
        setUpdatedIncomeDescription("");
        setUpdatedIncomeAmount("");
        setSelectedIncomeCategories([]);
        getAllIncomes(loggedInUser.id)
          .then((data) => setIncomes(data || []))
          .catch((error) => console.error("Error fetching incomes:", error));
      })
      .catch((error) => console.error("Error updating income:", error));
  };
  const calculateNetIncome = () => {
    const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0);
    const updatedDifference = totalIncome - totalExpense;
    setTotalExpense(totalExpense);
    setTotalIncome(totalIncome);
    setDifference(updatedDifference);
  };

  useEffect(() => {
    if (loggedInUser) {
      Promise.all([
        getExpenseCategories(),
        getIncomeCategories(),
        getAllExpenses(loggedInUser.id),
        getAllIncomes(loggedInUser.id)
      ])
        .then(([expenseCategories, incomeCategories, expensesData, incomesData]) => {
          setAvailableCategories(expenseCategories || []);
          setAvailableIncomeCategories(incomeCategories || []);
          setExpenses(expensesData || []);
          setIncomes(incomesData || []);
  
          const totalExpense = expensesData.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
          const totalIncome = incomesData.reduce((acc, income) => acc + parseFloat(income.amount), 0);
  
          const updatedDifference = totalIncome - totalExpense;
          setTotalExpense(totalExpense);
          setTotalIncome(totalIncome);
          setDifference(updatedDifference);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [loggedInUser]);
  

  return (
    <div>
      <h1>View Totals</h1>
      <h2>Expenses</h2>
      {expenses && expenses.length > 0 ? (
        expenses.map((expense) => (
          <div key={expense.id}>
            {editingExpense && editingExpense.id === expense.id ? (
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
                <br />
                <label>Amount:</label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  value={updatedAmount}
                  onChange={(e) => {
                    const inputAmount = e.target.value;
                    if (inputAmount === "" || /^\d+$/.test(inputAmount)) {
                      setUpdatedAmount(inputAmount);
                    }
                  }}
                />
                <br />
                <label>Categories:</label>
                {availableCategories.map((category) => (
                  <label key={category.id}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.categoryName)}
                      onChange={(e) => {
                        const categoryName = category.categoryName;
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, categoryName]);
                        } else {
                          setSelectedCategories(selectedCategories.filter((cat) => cat !== categoryName));
                        }
                      }}
                    />
                    {category.categoryName}
                  </label>
                ))}
                <br />
                <button onClick={handleUpdate}>Save</button>
              </div>
            ) : (
              <div>
                <p>Description: {expense.description}</p>
                <p>Amount: {expense.amount}</p>
                <p>Categories: {expense.categories.join(", ")}</p>
                <button onClick={() => handleEdit(expense)}>Edit</button>
                <button onClick={() => handleExpenseDelete(expense.id)}>Delete</button> 
                
              </div>
            )}
            
          </div>
        ))
      ) : (
        <p>No expenses to display</p>
      )}
      <h2>Incomes</h2>
      {incomes && incomes.length > 0 ? (
        incomes.map((income) => (
          <div key={income.id}>
            {editingIncome && editingIncome.id === income.id ? (
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  value={updatedIncomeDescription}
                  onChange={(e) => setUpdatedIncomeDescription(e.target.value)}
                />
                <br />
                <label>Amount:</label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  value={updatedIncomeAmount}
                  onChange={(e) => {
                    const inputAmount = e.target.value;
                    if (inputAmount === "" || /^\d+$/.test(inputAmount)) {
                      setUpdatedIncomeAmount(inputAmount);
                    }
                  }}
                />
                <br />
                <label>Categories:</label>
                {availableIncomeCategories.map((category) => (
                  <label key={category.id}>
                    <input
                      type="checkbox"
                      checked={selectedIncomeCategories.includes(category.categoryName)}
                      onChange={(e) => {
                        const categoryName = category.categoryName;
                        if (e.target.checked) {
                          setSelectedIncomeCategories([...selectedIncomeCategories, categoryName]);
                        } else {
                          setSelectedIncomeCategories(selectedIncomeCategories.filter((cat) => cat !== categoryName));
                        }
                      }}
                    />
                    {category.categoryName}
                  </label>
                ))}
                <br />
                <button onClick={handleIncomeUpdate}>Save</button>
              </div>
            ) : (
              <div>
                <p>Description: {income.description}</p>
                <p>Amount: {income.amount}</p>
                <p>Categories: {income.categories.join(", ")}</p>
                <button onClick={() => handleIncomeEdit(income)}>Edit</button>
                <button onClick={() => handleIncomeDelete(income.id)}>Delete</button> 
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No incomes to display</p>
      )}
      <h2>Total Expenses: {totalExpense}</h2>
      <h2>Total Income: {totalIncome}</h2>
      <br></br>
      
      <h2>Net Income: {difference}</h2>
      <button onClick={calculateNetIncome}>Calculate Net Income</button>
    </div>
  );
};

export default ViewTotals;
