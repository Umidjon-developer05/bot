export const productsGetAll = async () => {
  try {
    const response = await fetch(
      "http://localhost:8000/api/products/get?secret_key=umidjon",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return []; // Return an empty array to avoid map error
  }
};

export const categoryGetAll = async () => {
  try {
    const response = await fetch(
      "http://localhost:8000/api/category/get?secret_key=umidjon",
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
