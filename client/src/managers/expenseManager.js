const _apiUrl = "/api/expense";


export const createExpense = (expenseData) => {
    console.log(_apiUrl);
  return fetch(_apiUrl+"/create-expense", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenseData),
  }).then((res) => {
    if (res.status !== 201) {
      return Promise.reject("Failed to create expense");
    } else {
      return res.json();
    }
  });
};
export const getAllExpenses = (userId) => {
  const _apiUrl = `/api/expense/${userId}`;
  return fetch(_apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch expenses");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching expenses:", error);
      throw error; 
    });
};
export const updateExpense = (expenseId, updatedData) => {
  const _apiUrl = `/api/expense`; 

  return fetch(`${_apiUrl}/${expenseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  }).then((res) => {
    if (res.status !== 200) {
      return Promise.reject("Failed to update expense");
    } else {
      return res.json();
    }
  });

  
};
export const deleteExpense = (expenseId) => {
  const _apiUrl = `/api/expense`;

  return fetch(`${_apiUrl}/${expenseId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 204) {
      return "Expense deleted successfully";
    } else {
      return Promise.reject("Failed to delete expense");
    }
  });
};



