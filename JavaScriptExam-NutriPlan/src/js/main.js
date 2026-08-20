/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */


import * as api from "./api/mealdb.js";
import * as ui from "./ui/components.js";

// Helper function to select by ID
const $ = (id) => document.getElementById(id);

export const elements = {
  // Navigation Buttons
  btnMeals: $("btn-meals"),
  btnProduct: $("btn-product"),
  btnFoodLog: $("btn-food-log"),

  // Layout & Sections
  search: $("search-filters-section"),
  mealCategories: $("meal-categories-section"),
  allRecipes: $("all-recipes-section"),
  mealDetails: $("meal-details"),
  products: $("products-section"),
  foodLog: $("foodlog-section"),

  // Text Elements
  title: $("title"),
  caption: $("caption"),

  // Controls & Inputs
  mealSearchInput: $("search-input"),
  gridView: $("grid-view-btn"),
  listView: $("list-view-btn"),
  allRecipesBtn: $("all-recipes"),
  btnClear: $("clear-foodlog"),
  logModal: $("log-meal-modal"),
  input: $("meal-servings"),
  BackToMealsBtn: $("back-to-meals-btn")
};


// Event Listerners
/*Control nav links open pages*/
elements.btnMeals.addEventListener("click", function (e) {
    e.preventDefault();
     elements.mealCategories.classList.remove("hidden");
    elements.search.classList.remove("hidden");
    elements.allRecipes.classList.remove("hidden");
    elements.products.classList.add("hidden");
    elements.foodLog.classList.add("hidden");

    elements.btnProduct.classList.remove("bg-emerald-50", "text-emerald-700");
    elements.btnProduct.classList.add("text-gray-600", "hover:bg-gray-50");
    elements.btnMeals.classList.add("bg-emerald-50", "text-emerald-700");
    elements.btnMeals.classList.remove("text-gray-600", "hover:bg-gray-50");
    elements.btnFoodLog.classList.remove("bg-emerald-50", "text-emerald-700");
    elements.btnFoodLog.classList.add("text-gray-600", "hover:bg-gray-50");
    elements.title.textContent = "Meals & Recipes"
    elements.caption.textContent = "Discover delicious and nutritious recipes tailored for you"
    // history.pushState(null, "", "#meals")


});
elements.btnProduct.addEventListener("click", function (e) {
    e.preventDefault()
    elements.mealCategories.classList.add("hidden")
    elements.search.classList.add("hidden")
    elements.allRecipes.classList.add("hidden")
    elements.products.classList.remove("hidden")
    elements.foodLog.classList.add("hidden")
    elements.mealDetails.classList.add("hidden")
    elements.btnProduct.classList.add("bg-emerald-50", "text-emerald-700")
    elements.btnProduct.classList.remove("text-gray-600", "hover:bg-gray-50")
    elements.btnMeals.classList.remove("bg-emerald-50", "text-emerald-700")
    elements.btnMeals.classList.add("text-gray-600", "hover:bg-gray-50")
    elements.btnFoodLog.classList.remove("bg-emerald-50", "text-emerald-700")
    elements.btnFoodLog.classList.add("text-gray-600", "hover:bg-gray-50")
    elements.title.textContent = "Product Scanner"
    elements.caption.textContent = "Search packaged foods by name or barcode"
    // history.pushState(null, "", "#products");
});

elements.btnFoodLog.addEventListener("click", function (e) {
    e.preventDefault()
    elements.mealCategories.classList.add("hidden")
    elements.search.classList.add("hidden")
    elements.allRecipes.classList.add("hidden")
    elements.products.classList.add("hidden")
    elements.foodLog.classList.remove("hidden")
    elements.mealDetails.classList.add("hidden")
    elements.btnProduct.classList.remove("bg-emerald-50", "text-emerald-700")
    elements.btnProduct.classList.add("text-gray-600", "hover:bg-gray-50")
    elements.btnMeals.classList.remove("bg-emerald-50", "text-emerald-700")
    elements.btnMeals.classList.add("text-gray-600", "hover:bg-gray-50")
    elements.btnFoodLog.classList.add("bg-emerald-50", "text-emerald-700")
    elements.btnFoodLog.classList.remove("text-gray-600", "hover:bg-gray-50")
    elements.title.textContent = "Food Log"
    elements.caption.textContent = "Track your daily nutrition and food intake"
    // history.pushState(null, "", "#foodlog")
}) ;

elements.BackToMealsBtn?.addEventListener("click", goBackToMeals)
elements.mealDetails.addEventListener("click", function (e) {
    if (e.target.closest("#back-to-meals-btn")) goBackToMeals()
});

function goBackToMeals() {
    elements.search.classList.remove("hidden");
    elements.mealCategories.classList.remove("hidden");
    elements.allRecipes.classList.remove("hidden");
    elements.mealDetails.classList.add("hidden");
    elements.title.textContent = "Meals & Recipes"
    elements.caption.textContent = "Discover delicious and nutritious recipes tailored for you"
    // history.back();
}
