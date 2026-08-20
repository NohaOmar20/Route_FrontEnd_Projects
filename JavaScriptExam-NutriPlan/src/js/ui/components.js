// =========== Loading Spinner Design ============
import { state, saveMealList, getKcalForDate, getItemsCountForDate } from "../state/appState.js"

/*Show meals*/
export function showMeals(onCardClick) {
    //Showing the number of recipes found
    document.getElementById("recipes-count").textContent =`Showing ${state.dataMeals.length} ${state.currentFilterLabel} recipes`
    // Display a message if no recipes are found
     if (state.dataMeals.length === 0) {
        document.getElementById("recipes-grid").className = ""
        document.getElementById("recipes-grid").innerHTML = `
        <div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="text-2xl text-gray-400 fa-solid fa-magnifying-glass"></i>
            </div>
            <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
        </div>
        `
        return
    }
    // Grid or List toggle based on user preference
    if (state.currentView === "grid") {
        document.getElementById("recipes-grid").className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    } else {
        document.getElementById("recipes-grid").className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
    }
    // Show grid box or list box for each meal using map function
    

} 

// Meal details
`<div class="max-w-7xl mx-auto">
        <!-- Back Button -->
        <button id="back-to-meals-btn"
          class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors">
          <i class="fa-solid fa-arrow-left"></i>
          <span>Back to Recipes</span>
        </button>

        <!-- Hero Section -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div class="relative h-80 md:h-96">
            <img src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
              alt="Teriyaki Chicken Casserole" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-8">
              <div class="flex items-center gap-3 mb-3">
                <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">Chicken</span>
                <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">Japanese</span>
                <span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">Casserole</span>
              </div>
              <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                Teriyaki Chicken Casserole
              </h1>
              <div class="flex items-center gap-6 text-white/90">
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-clock"></i>
                  <span>30 min</span>
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-utensils"></i>
                  <span id="hero-servings">4 servings</span>
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-fire"></i>
                  <span id="hero-calories">485 cal/serving</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 mb-8">
          <button id="log-meal-btn"
            class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
            data-meal-id="52772">
            <i class="fa-solid fa-clipboard-list"></i>
            <span>Log This Meal</span>
          </button>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column - Ingredients & Instructions -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Ingredients -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-list-check text-emerald-600"></i>
                Ingredients
                <span class="text-sm font-normal text-gray-500 ml-auto">9 items</span>
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                  <span class="text-gray-700">
                    <span class="font-medium text-gray-900">3/4 cup</span> soy
                    sauce
                  </span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                  <span class="text-gray-700">
                    <span class="font-medium text-gray-900">1/2 cup</span>
                    water
                  </span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                  <span class="text-gray-700">
                    <span class="font-medium text-gray-900">1/4 cup</span>
                    brown sugar
                  </span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                  <span class="text-gray-700">
                    <span class="font-medium text-gray-900">1/2 teaspoon</span>
                    ground ginger
                  </span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                  <span class="text-gray-700">
                    <span class="font-medium text-gray-900">1/2 teaspoon</span>
                    minced garlic
                  </span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                  <span class="text-gray-700">
                    <span class="font-medium text-gray-900">4 Tablespoons</span>
                    cornstarch
                  </span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                  <span class="text-gray-700">
                    <span class="font-medium text-gray-900">2</span> chicken
                    breasts
                  </span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                  <span class="text-gray-700">
                    <span class="font-medium text-gray-900">1 bag</span>
                    stir-fry vegetables
                  </span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                  <span class="text-gray-700">
                    <span class="font-medium text-gray-900">3 cups</span>
                    brown rice
                  </span>
                </div>
              </div>
            </div>

            <!-- Instructions -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                Instructions
              </h2>
              <div class="space-y-4">
                <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div
                    class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <p class="text-gray-700 leading-relaxed pt-2">
                    Preheat oven to 350° F. Spray a 9x13-inch baking pan with
                    non-stick spray.
                  </p>
                </div>
                <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div
                    class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <p class="text-gray-700 leading-relaxed pt-2">
                    Combine soy sauce, ½ cup water, brown sugar, ginger and
                    garlic in a small saucepan and cover. Bring to a boil over
                    medium heat. Remove lid and cook for one minute once
                    boiling.
                  </p>
                </div>
                <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div
                    class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <p class="text-gray-700 leading-relaxed pt-2">
                    Meanwhile, stir together the cornstarch and 2 tablespoons
                    of water in a separate dish until smooth. Once sauce is
                    boiling, add mixture to the saucepan and stir to combine.
                    Cook until the sauce starts to thicken then remove from
                    heat.
                  </p>
                </div>
                <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div
                    class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    4
                  </div>
                  <p class="text-gray-700 leading-relaxed pt-2">
                    Place the chicken breasts in the prepared pan. Pour one
                    cup of the sauce over top of chicken. Place chicken in
                    oven and bake 35 minutes or until cooked through. Remove
                    from oven and shred chicken in the pan using two forks.
                  </p>
                </div>
                <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div
                    class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    5
                  </div>
                  <p class="text-gray-700 leading-relaxed pt-2">
                    *Meanwhile, steam the vegetables according to package
                    directions and stir together with the cooked brown rice.
                    Add the remaining sauce to the mixture and stir to
                    combine. Serve the chicken over the rice and veggie
                    mixture.
                  </p>
                </div>
              </div>
            </div>

            <!-- Video Section -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-video text-red-500"></i>
                Video Tutorial
              </h2>
              <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                <iframe src="https://www.youtube.com/embed/4aZr5hZXP_s" class="absolute inset-0 w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
                </iframe>
              </div>
            </div>
          </div>

          <!-- Right Column - Nutrition -->
          <div class="space-y-6">
            <!-- Nutrition Facts -->
            <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                Nutrition Facts
              </h2>
              <div id="nutrition-facts-container">
                <p class="text-sm text-gray-500 mb-4">Per serving</p>

                <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
                  <p class="text-sm text-gray-600">Calories per serving</p>
                  <p class="text-4xl font-bold text-emerald-600">485</p>
                  <p class="text-xs text-gray-500 mt-1">Total: 1940 cal</p>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span class="text-gray-700">Protein</span>
                    </div>
                    <span class="font-bold text-gray-900">42g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-emerald-500 h-2 rounded-full" style="width: 84%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span class="text-gray-700">Carbs</span>
                    </div>
                    <span class="font-bold text-gray-900">52g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: 17%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span class="text-gray-700">Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">8g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: 12%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span class="text-gray-700">Fiber</span>
                    </div>
                    <span class="font-bold text-gray-900">4g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-orange-500 h-2 rounded-full" style="width: 14%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                      <span class="text-gray-700">Sugar</span>
                    </div>
                    <span class="font-bold text-gray-900">12g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-pink-500 h-2 rounded-full" style="width: 24%"></div>
                  </div>
                </div>

                <div class="mt-6 pt-6 border-t border-gray-100">
                  <h3 class="text-sm font-semibold text-gray-900 mb-3">
                    Vitamins & Minerals (% Daily Value)
                  </h3>
                  <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Vitamin A</span>
                      <span class="font-medium">15%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Vitamin C</span>
                      <span class="font-medium">25%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Calcium</span>
                      <span class="font-medium">4%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Iron</span>
                      <span class="font-medium">12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`