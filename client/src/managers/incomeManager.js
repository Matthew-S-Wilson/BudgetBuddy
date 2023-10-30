const _apiUrl = "/api/income";


export const createIncome = (incomeData) => {
    console.log(_apiUrl);
    return fetch(_apiUrl+"/create-income", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(incomeData),
  }).then((res) => {
    if (res.status !== 201) {
      return Promise.reject("Failed to create income");
    } else {
      return res.json();
    }
  });
};
export const getAllIncomes = (userId) => {
  const _apiUrl = `/api/income/${userId}`;
  return fetch(_apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch incomes");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching incomes:", error);
      throw error; // Rethrow the error to handle it in the component
    });
};
export const updateIncome = (incomeId, updatedData) => {
  const _apiUrl = `/api/income`; 

  return fetch(`${_apiUrl}/${incomeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  }).then((res) => {
    if (res.status !== 200) {
      return Promise.reject("Failed to update income");
    } else {
      return res.json();
    }
  });
};
