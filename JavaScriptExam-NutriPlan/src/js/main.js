/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */


import * as api from "./api/mealdb.js";
import { state, saveMealList, checkNewDay } from "./state/appState.js"
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
    history.pushState(null, "", "#meals") // Update URL for deep linking to the meals section


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
    history.pushState(null, "", "#products"); // Update URL for deep linking to the product scanner section
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
    history.pushState(null, "", "#foodlog") // Update URL for deep linking to the food log section
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
    history.back(); // Navigate back in history to restore the previous state (e.g., search results or category view)
}


elements.gridView.addEventListener("click", function () {
    state.currentView = "grid"
    elements.gridView.classList.add("bg-white", "rounded-md", "shadow-sm")
    elements.listView.classList.remove("bg-white", "rounded-md", "shadow-sm")
    ui.showMeals(openMealDetails)
});

elements.listView.addEventListener("click", function () {
    state.currentView = "list"
    elements.gridView.classList.remove("bg-white", "rounded-md", "shadow-sm")
    elements.listView.classList.add("bg-white", "rounded-md", "shadow-sm")
    ui.showMeals(openMealDetails)
});

function openMealDetails(mealId) {
    elements.search.classList.add("hidden")
    elements.mealCategories.classList.add("hidden")
    elements.allRecipes.classList.add("hidden")
    elements.mealDetails.classList.remove("hidden")
    elements.title.textContent = "Recipe Details"
    elements.caption.textContent = "View full recipe information and nutrition facts"
    loadMeal(mealId);
}

async function loadMeal(id) {
    let meal = await api.fetchMealById(id);
    state.currentFilterLabel ="" // Reset filter label when opening a meal
    ui.showDetails(meal);
    await loadMealNutrition(meal);
    //URL update for deep linking to a specific meal
    let mealSlug = meal.name.toLowerCase().replace(/\s+/g, '-');
    history.pushState(null, "", `#meal/${mealSlug}`);

}
async function loadMealNutrition(meal) {
    let nutrition = await api.fetchNutrition(meal);
    state.currentMeal = meal;
    state.currentNutrition = nutrition;

    document.getElementById("hero-servings").textContent= "1 serving";
    document.getElementById("hero-calories").textContent = `${nutrition.perServing.calories} kcal`;

    let slot = document.getElementById("meal-details-nutrition-slot");
    if (slot) slot.innerHTML = ui.showNutrition(nutrition);

    let logBtn = document.getElementById("log-meal-btn");
    logBtn.disabled = false;

    logBtn.classList.remove("opacity-60", "cursor-not-allowed");
    document.getElementById("log-meal-btn-spinner").classList.add("hidden");
    document.getElementById("log-meal-btn-icon-wrap").classList.remove("hidden");
    document.getElementById("log-meal-btn-icon-wrap").classList.add("flex");
    document.getElementById("log-meal-btn-text").textContent = "Log This Meal";

    logBtn.addEventListener("click", function () {
        state.currentValue = 1;
        input.value = 1;
        ui.showModal(nutrition, meal);
        logModal.classList.remove("hidden");
    })
    
}
async function getMeals(query) {
    state.dataMeals = await api.fetchMeals(query)
    ui.showMeals(openMealDetails);
}
getMeals("chicken");

allRecipesBtn.addEventListener("click", function () {
    state.currentFilterLabel = ""
    getMeals("chicken")
});