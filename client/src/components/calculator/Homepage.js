import React, { useState, useEffect } from "react";
import { createExpense } from "../../managers/expenseManager.js";
import { createIncome } from "../../managers/incomeManager.js";
import { getIncomeCategories, getExpenseCategories } from "../../managers/categoryManager.js";

export const HomePage = ({ loggedInUser }) => {
  const [showExpenseInput, setShowExpenseInput] = useState(false);
  const [showIncomeInput, setShowIncomeInput] = useState(false);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedExpenseCategories, setSelectedExpenseCategories] = useState([]);
  const [incomeDescription, setIncomeDescription] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [selectedIncomeCategories, setSelectedIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);

  useEffect(() => {
    // Fetch both expense and income categories
    getExpenseCategories()
      .then((data) => setExpenseCategories(data || []))
      .catch((error) => console.error("Error fetching expense categories:", error));

    getIncomeCategories()
      .then((data) => setIncomeCategories(data || []))
      .catch((error) => console.error("Error fetching income categories:", error));
  }, []);

  const handleNewExpense = () => {
    setShowExpenseInput(true);
  };

  const handleNewIncome = () => {
    setShowIncomeInput(true);
  };

  const handleDescriptionChange = (e, type) => {
    if (type === "expense") {
      setExpenseDescription(e.target.value);
    } else {
      setIncomeDescription(e.target.value);
    }
  };

  const handleAmountChange = (e, type) => {
    const inputAmount = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(inputAmount) || inputAmount === "") {
      if (type === "expense") {
        setExpenseAmount(inputAmount);
      } else {
        setIncomeAmount(inputAmount);
      }
    }
  };

  const handleExpenseCategoryChange = (e) => {
    const { value } = e.target;
    if (selectedExpenseCategories.includes(value)) {
      setSelectedExpenseCategories(selectedExpenseCategories.filter((category) => category !== value));
    } else {
      setSelectedExpenseCategories([...selectedExpenseCategories, value]);
    }
  };

  const handleIncomeCategoryChange = (e) => {
    const { value } = e.target;
    if (selectedIncomeCategories.includes(value)) {
      setSelectedIncomeCategories(selectedIncomeCategories.filter((category) => category !== value));
    } else {
      setSelectedIncomeCategories([...selectedIncomeCategories, value]);
    }
  };

  const handleExpenseSubmit = () => {
    const newExpense = {
      userId: loggedInUser.id,   
      description: expenseDescription,
      amount: expenseAmount,
      categories: selectedExpenseCategories,
    };
    
    createExpense(newExpense) // Call the createExpense function to save the expense
      .then((res) => {
        console.log("Expense successfully created:", res);
        setExpenseDescription("");
        setExpenseAmount("");
        setSelectedExpenseCategories([]);
        setShowExpenseInput(false);
      })
      .catch((error) => {
        console.error("Failed to create expense:", error);
        // Handle error here
      });
  };

  const handleIncomeSubmit = () => {
    const newIncome = {
      userId: loggedInUser.id,  
      description: incomeDescription,
      amount: incomeAmount,
      categories: selectedIncomeCategories,
    };
    console.log("Saving the following income: ", newIncome);

    
    createIncome(newIncome) // Call the createIncome function to save the income
    .then((res) => {
      console.log("Income successfully created:", res);
      setIncomeDescription("");
      setIncomeAmount("");
      setSelectedIncomeCategories([]);
      setShowIncomeInput(false);
    })
    .catch((error) => {
      console.error("Failed to create income:", error);
      // Handle error here
    });
  };

  return (
    <div>
      <div>Welcome to the Home Page!</div>
      <button onClick={handleNewExpense}>Create New Expense</button>
      <button onClick={handleNewIncome}>Create New Income</button>
      {showExpenseInput && (
        <div>
          <input
            type="text"
            placeholder="Enter expense description"
            value={expenseDescription}
            onChange={(e) => handleDescriptionChange(e, "expense")}
          />
          <br />
          <input
            type="text"
            placeholder="Enter expense amount"
            value={expenseAmount}
            onChange={(e) => handleAmountChange(e, "expense")}
          />

          <br />
          <div>
            <label>Expense Categories:</label>
            <br />
            {expenseCategories
              .filter((category) => category.expenseOrIncome === "Expense")
              .map((category) => (
                <div key={category.id}>
                  <input
                    type="checkbox"
                    value={category.categoryName}
                    checked={selectedExpenseCategories.includes(category.categoryName)}
                    onChange={handleExpenseCategoryChange}
                  />
                  <label>{category.categoryName}</label>
                  <br />
                </div>
              ))}
          </div>

          <br />
          <button onClick={handleExpenseSubmit}>Submit Expense</button>
        </div>
      )}

      {showIncomeInput && (
        <div>
          <input
            type="text"
            placeholder="Enter income description"
            value={incomeDescription}
            onChange={(e) => handleDescriptionChange(e, "income")}
          />
          <br />
          <input
            type="text"
            placeholder="Enter income amount"
            value={incomeAmount}
            onChange={(e) => handleAmountChange(e, "income")}
          />
          <br />
          <div>
            <label>Income Categories:</label>
            <br />
            {incomeCategories
              .filter((category) => category.expenseOrIncome === "Income")
              .map((category) => (
                <div key={category.id}>
                  <input
                    type="checkbox"
                    value={category.categoryName}
                    checked={selectedIncomeCategories.includes(category.categoryName)}
                    onChange={handleIncomeCategoryChange}
                  />
                  <label>{category.categoryName}</label>
                  <br />
                </div>
              ))}
          </div>
          <br />
          <button onClick={handleIncomeSubmit}>Submit Income</button>
        </div>
      )}
    </div>
  );
}