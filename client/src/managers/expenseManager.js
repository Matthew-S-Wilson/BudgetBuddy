const _apiUrl = "/api/expense";


export const createExpense = (expenseData) => {
    console.log(_apiUrl);
  return fetch(_apiUrl, {
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
      throw error; // Rethrow the error to handle it in the component
    });
};
