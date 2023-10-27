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