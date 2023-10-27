const _apiUrl = "/api/income";


export const createIncome = (incomeData) => {
    console.log(_apiUrl);
  return fetch(_apiUrl, {
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