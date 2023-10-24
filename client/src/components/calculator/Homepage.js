import React, { useState } from "react";

export const HomePage = () => {
  const [showExpenseInput, setShowExpenseInput] = useState(false);
  const [showIncomeInput, setShowIncomeInput] = useState(false);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedExpenseCategories, setSelectedExpenseCategories] = useState([]);
  const [incomeDescription, setIncomeDescription] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [selectedIncomeCategories, setSelectedIncomeCategories] = useState([]);

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
      description: expenseDescription,
      amount: expenseAmount,
      categories: selectedExpenseCategories,
    };
    console.log("Saving the following expense: ", newExpense);
    setExpenseDescription("");
    setExpenseAmount("");
    setSelectedExpenseCategories([]);
    setShowExpenseInput(false);
  };

  const handleIncomeSubmit = () => {
    const newIncome = {
      description: incomeDescription,
      amount: incomeAmount,
      categories: selectedIncomeCategories,
    };
    console.log("Saving the following income: ", newIncome);
    setIncomeDescription("");
    setIncomeAmount("");
    setSelectedIncomeCategories([]);
    setShowIncomeInput(false);
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
            <input
              type="checkbox"
              value="housing"
              checked={selectedExpenseCategories.includes("housing")}
              onChange={handleExpenseCategoryChange}
            />
            <label>Housing</label>
            <br />
            <input
              type="checkbox"
              value="groceries"
              checked={selectedExpenseCategories.includes("groceries")}
              onChange={handleExpenseCategoryChange}
            />
            <label>Groceries</label>
            <br />
            <input
              type="checkbox"
              value="education"
              checked={selectedExpenseCategories.includes("education")}
              onChange={handleExpenseCategoryChange}
            />
            <label>Education</label>
            <br />
            <input
              type="checkbox"
              value="childcare"
              checked={selectedExpenseCategories.includes("childcare")}
              onChange={handleExpenseCategoryChange}
            />
            <label>Childcare</label>
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
            <input
              type="checkbox"
              value="full-time job"
              checked={selectedIncomeCategories.includes("full-time job")}
              onChange={handleIncomeCategoryChange}
            />
            <label>Full-time Job</label>
            <br />
            <input
              type="checkbox"
              value="part-time job"
              checked={selectedIncomeCategories.includes("part-time job")}
              onChange={handleIncomeCategoryChange}
            />
            <label>Part-time Job</label>
            <br />
            <input
              type="checkbox"
              value="investments"
              checked={selectedIncomeCategories.includes("investments")}
              onChange={handleIncomeCategoryChange}
            />
            <label>Investments</label>
            <br />
            <input
              type="checkbox"
              value="rent"
              checked={selectedIncomeCategories.includes("rent")}
              onChange={handleIncomeCategoryChange}
            />
            <label>Rent</label>
            <br />
            <input
              type="checkbox"
              value="misc"
              checked={selectedIncomeCategories.includes("misc")}
              onChange={handleIncomeCategoryChange}
            />
            <label>Misc</label>
          </div>
          <br />
          <button onClick={handleIncomeSubmit}>Submit Income</button>
        </div>
      )}
    </div>
  );
};
