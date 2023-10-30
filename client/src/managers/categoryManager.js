
export const getExpenseCategories = () => {
    const _apiUrl = "/api/category/categories-expenses";
    return fetch(_apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch expense categories");
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Error fetching expense categories:", error);
        return [];
      });
  };
  
  export const getIncomeCategories = () => {
    const _apiUrl = "/api/category/categories-incomes";
    return fetch(_apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch income categories");
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Error fetching income categories:", error);
        return [];
      });
  };
  