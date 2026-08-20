// API_KEY: DDuEyFQ7sX89TaEhsGMasIOaA99hd9nmWaHEziap
const BASE_URL = "https://nutriplan-api.vercel.app/api";
const NUTRITION_API_KEY  = "DuEyFQ7sX89TaEhsGMasIOaA99hd9nmWaHEziap";

// FETCH MEALS BY SEARCH QUERY
export async function fetchMeals(query) {
  try {
    let response = await fetch(`${BASE_URL}/meals/search?q=${query}&page=1&limit=25`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    let data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch meals:", error);
    return null;
  }
}

// FETCH MEAL BY ID
export async function fetchMealById(id) {
  try {
    let response = await fetch(`${BASE_URL}/meals/${id}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    let data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Failed to fetch meal by ID:", error);
    return null;
  }
}

// FILTER BY AREA
export async function fetchMealsByArea(areaName) {
  try {
    let response = await fetch(`${BASE_URL}/meals/filter?area=${areaName}&page=1&limit=25`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    let data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch meals by area:", error);
    return null;
  }
}

//FILTER BY CATEGORY
export async function fetchMealsByCategory(categoryName) {
  try {
    let response = await fetch(`${BASE_URL}/meals/filter?category=${categoryName}&page=1&limit=25`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    let data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch meals by category:", error);
    return null;
  }
}

// ALL AREAS
export async function fetchAreas() {
  try {
    let response = await fetch(`${BASE_URL}/meals/areas`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    let data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch areas:", error);
    return null;
  }
}

// ALL CATEGORIES
export async function fetchCategories() {
  try {
    let response = await fetch(`${BASE_URL}/meals/categories`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    let data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return null;
  }
}

// FETCH NUTRITION INFO

// POST>>BASE_URL/nutrition/analyze

export async function fetchNutrition(meal) {
  try {
    let ingredientsList = meal.ingredients.map(function (item) {
      return `${item.measure} ${item.ingredient}`.trim();
    });

    let response = await fetch(`${BASE_URL}/nutrition/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": NUTRITION_API_KEY
      },
      body: JSON.stringify({
        recipeName: meal.name,
        ingredients: ingredientsList
      })
    });

    // Check if the server returned a 200-299 status code
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let result = await response.json();
    return result.data;

  } catch (error) {
    // Gracefully handle and log any errors (network offline, bad JSON, server error)
    console.error("Failed to fetch nutrition data:", error);
    return null; // Return null so caller knows the operation failed
  }
}

// FETCH PRODUCTS

export async function fetchProductsBySearch(query) {
  try {
    let response = await fetch(`${BASE_URL}/products/search?q=${query}&page=1&limit=24`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    let data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch products by search:", error);
    return null;
  }
}

export async function fetchProductByBarcode(barcode) {
  try {
    let response = await fetch(`${BASE_URL}/products/barcode/${barcode}`);
    if (!response.ok) return null;
    let data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Failed to fetch product by barcode:", error);
    return null;
  }
}

export async function fetchProductsByCategory(category) {
  try {
    let response = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!response.ok) return null;
    let data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    return null;
  }
}