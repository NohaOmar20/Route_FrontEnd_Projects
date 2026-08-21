// =========== Loading Spinner Design ============
import { state, saveMealList, getKcalForDate, getItemsCountForDate } from "../state/appState.js"


export function getYoutubeEmbedUrl(url) {
    if (!url) return ""
    const videoId = url.split("v=")[1]?.split("&")[0]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : ""
}

export function getBarWidth(value, dailyValue) {
    let percentage = (value / dailyValue) * 100
    if (percentage > 100) percentage = 100
    if (percentage < 0 || isNaN(percentage)) percentage = 0
    return percentage.toFixed(0)
}

export function showToast(message) {
    let toast = document.getElementById("toast-notification")
    toast.textContent = message
    toast.style.display = "block"

    setTimeout(function () {
        toast.style.display = "none"
    }, 2000)
}
export function showTodayDate() {
    let dateToday = document.getElementById("foodlog-date")
    let today = new Date()

    let dayName = today.toLocaleDateString("en-US", { weekday: "long" })
    let monthDay = today.toLocaleDateString("en-US", { month: "short", day: "numeric" })

    dateToday.innerHTML = `${dayName}, ${monthDay}`
}
/*Show meals*/
export function showMeals(onCardClick) {
    //1. Header and Counter updates
    document.getElementById("recipes-count").textContent =`Showing ${state.dataMeals.length} ${state.currentFilterLabel} recipes`
    // 2. Empty State handeling >> Display a message if no recipes are found
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
    // 3. Toggel between grid and list view based on the currentView state
    if (state.currentView === "grid") {
        document.getElementById("recipes-grid").className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    } else {
        document.getElementById("recipes-grid").className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
    }
    //4. Loop and Render All Meal Cards (.map())
    let boxMeals = state.dataMeals.map(function(item){
      if (state.currentView === "grid") {
        return `<div
            class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            data-meal-id="${item.id}">
            <div class="relative h-48 overflow-hidden">
              <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="${item.thumbnail}" alt="${item.name}"
                loading="lazy" />
              <div class="absolute bottom-3 left-3 flex gap-2">
                <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                  ${item.category}
                </span>
                <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                  ${item.area ? item.area : "International"}
                </span>
              </div>
            </div>
            <div class="p-4">
              <h3
                class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                ${item.name}
              </h3>
              <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                ${item.instructions[0]}
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold text-gray-900">
                  <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                  ${item.category}
                </span>
                <span class="font-semibold text-gray-500">
                  <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                  ${item.area ? item.area : "International"}
                </span>
              </div>
            </div>
          </div>`
      } else {
        return ` 
        <div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group flex" data-meal-id="${item.id}">
                    <img class="w-40 h-32 object-cover shrink-0" src="${item.thumbnail}" alt="${item.name}" loading="lazy" />
                    <div class="p-4 flex-1">
                        <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">${item.name}</h3>
                        <p class="text-xs text-gray-600 mb-3 line-clamp-2">${item.instructions[0]}</p>
                        <div class="flex items-center justify-between text-xs">
                            <span class="font-semibold text-gray-900"><i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>${item.category}</span>
                            <span class="font-semibold text-gray-500"><i class="fa-solid fa-globe text-blue-500 mr-1"></i>${item.area ? item.area : "International"}</span>
                        </div>
                    </div>
                </div>
        `
      }
    }).join("");
    // 5. DOM Injection & Click attachment for each meal card
    document.getElementById("recipes-grid").innerHTML = boxMeals;
    let cards =document.querySelectorAll(".recipe-card");
    cards.forEach(card => {
        card.addEventListener("click", function () {
            let clickedId = card.getAttribute("data-meal-id");
            onCardClick(clickedId);
        });
    });
    
} 


/*Show area*/

export function showArea(areaList, onAreaClick){
  let boxArea =areaList.slice(0,10).map(function(item){
    return `
     <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all">
              ${item.name}
            </button>
    `;
  }).join("");
  document.getElementById("area-buttons").insertAdjacentHTML("beforeend", boxArea);
  let buttonsArea = document.querySelectorAll("#area-buttons button")
    buttonsArea.forEach(function (button) {
        button.addEventListener("click", function () {
            buttonsArea.forEach(function (btn) {
                btn.classList.remove("bg-emerald-600", "text-white")
                btn.classList.add("bg-gray-100", "text-gray-700")
            });

            button.classList.remove("bg-gray-100", "text-gray-700")
            button.classList.add("bg-emerald-600", "text-white")

            onAreaClick(button.textContent.trim())
        });
    });
}


const categoryStyles = {
    "Beef": { bg: "from-red-50 to-rose-50", border: "border-red-200 hover:border-red-400", icon: "from-red-400 to-rose-500", faIcon: "fa-drumstick-bite" },
    "Chicken": { bg: "from-amber-50 to-orange-50", border: "border-amber-200 hover:border-amber-400", icon: "from-amber-400 to-orange-500", faIcon: "fa-drumstick-bite" },
    "Dessert": { bg: "from-pink-50 to-rose-50", border: "border-pink-200 hover:border-pink-400", icon: "from-pink-400 to-rose-500", faIcon: "fa-cake-candles" },
    "Lamb": { bg: "from-orange-50 to-amber-50", border: "border-orange-200 hover:border-orange-400", icon: "from-orange-400 to-amber-500", faIcon: "fa-drumstick-bite" },
    "Miscellaneous": { bg: "from-slate-50 to-gray-50", border: "border-slate-200 hover:border-slate-400", icon: "from-slate-400 to-gray-500", faIcon: "fa-bowl-rice" },
    "Pasta": { bg: "from-yellow-50 to-amber-50", border: "border-yellow-200 hover:border-yellow-400", icon: "from-yellow-400 to-amber-500", faIcon: "fa-bowl-food" },
    "Pork": { bg: "from-rose-50 to-red-50", border: "border-rose-200 hover:border-rose-400", icon: "from-rose-400 to-red-500", faIcon: "fa-bacon" },
    "Seafood": { bg: "from-cyan-50 to-blue-50", border: "border-cyan-200 hover:border-cyan-400", icon: "from-cyan-400 to-blue-500", faIcon: "fa-fish" },
    "Side": { bg: "from-green-50 to-emerald-50", border: "border-green-200 hover:border-green-400", icon: "from-green-400 to-emerald-500", faIcon: "fa-plate-wheat" },
    "Starter": { bg: "from-teal-50 to-cyan-50", border: "border-teal-200 hover:border-teal-400", icon: "from-teal-400 to-cyan-500", faIcon: "fa-utensils" },
    "Vegan": { bg: "from-emerald-50 to-green-50", border: "border-emerald-200 hover:border-emerald-400", icon: "from-emerald-400 to-green-500", faIcon: "fa-leaf" },
    "Vegetarian": { bg: "from-lime-50 to-green-50", border: "border-lime-200 hover:border-lime-400", icon: "from-lime-400 to-green-500", faIcon: "fa-seedling" }
}

export function showCategory(categoryList, onCategoryClick) {
  let boxCategory = categoryList.slice(0, 12).map(function(item){
        let style = categoryStyles[item.name] || { bg: "from-emerald-50 to-teal-50", border: "border-emerald-200 hover:border-emerald-400", icon: "from-emerald-400 to-green-500", faIcon: "fa-utensils" }
        return `
         <div class="category-card bg-gradient-to-br ${style.bg} rounded-xl p-3 border ${style.border} hover:shadow-md cursor-pointer transition-all group" data-category="${item.name}">
            <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 bg-gradient-to-br ${style.icon} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <i class="text-sm text-white fa-solid ${style.faIcon}"></i>
                </div>
                <div>
                    <h3 class="text-sm font-bold text-gray-900">${item.name}</h3>
                </div>
            </div>
        </div>
        `;

  }).join("");
  document.getElementById("categories-grid").innerHTML = boxCategory;
  
  let buttonsCategory = document.querySelectorAll("#categories-grid .category-card");
  buttonsCategory.forEach(function (button) {
        button.addEventListener("click", function () {
          onCategoryClick(button.dataset.category);
        });
  });

}


export function showNutrition(nutrition) {
    return `
              <div class="space-y-6">
              <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
                  <p class="text-sm text-gray-500 mb-4">Per serving</p>

                  <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">${nutrition.perServing.calories}</p>
                    <p class="text-xs text-gray-500 mt-1">Total: ${nutrition.totals.calories}col</p>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutrition.perServing.protein}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-emerald-500 h-2 rounded-full" style="width: ${getBarWidth(nutrition.perServing.protein, 50)}%"></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutrition.perServing.carbs}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full" style="width: ${getBarWidth(nutrition.perServing.carbs, 275)}%"></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutrition.perServing.fat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-purple-500 h-2 rounded-full" style="width: ${getBarWidth(nutrition.perServing.fat, 78)}%"></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutrition.perServing.fiber}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-orange-500 h-2 rounded-full" style="width: ${getBarWidth(nutrition.perServing.fiber, 28)}%"></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutrition.perServing.sugar}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-pink-500 h-2 rounded-full" style="width: ${getBarWidth(nutrition.perServing.sugar, 50)}%"></div>
                    </div>
                  </div>

<div class="mt-6 pt-6 border-t border-gray-100">
                <h3 class="text-sm font-semibold text-gray-900 mb-3">Other</h3>
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Cholesterol</span>
                        <span class="font-medium">${nutrition.perServing.cholesterol}mg</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Sodium</span>
                        <span class="font-medium">${nutrition.perServing.sodium}mg</span>
                    </div>
                </div>
            </div>
                </div>
              </div>
            </div>
    `
}
export function showModal(nutrition, meal) {
    document.getElementById("modal-calories").textContent = nutrition.perServing.calories
    document.getElementById("modal-protein").textContent = `${nutrition.perServing.protein}g`
    document.getElementById("modal-carbs").textContent = `${nutrition.perServing.carbs}g`
    document.getElementById("modal-fat").textContent = `${nutrition.perServing.fat}g`
    document.getElementById("modal-image").src = meal.thumbnail
    document.getElementById("modal-image").alt = meal.name
    document.getElementById("modal-name").textContent = meal.name
}












// Show meal details >> that I can log from the meal details page
// export function showDetails(meal) {}
// Meal details
// `<div class="max-w-7xl mx-auto">
//         <!-- Back Button -->
//         <button id="back-to-meals-btn"
//           class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors">
//           <i class="fa-solid fa-arrow-left"></i>
//           <span>Back to Recipes</span>
//         </button>

//         <!-- Hero Section -->
//         <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
//           <div class="relative h-80 md:h-96">
//             <img src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
//               alt="Teriyaki Chicken Casserole" class="w-full h-full object-cover" />
//             <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
//             <div class="absolute bottom-0 left-0 right-0 p-8">
//               <div class="flex items-center gap-3 mb-3">
//                 <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">Chicken</span>
//                 <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">Japanese</span>
//                 <span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">Casserole</span>
//               </div>
//               <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
//                 Teriyaki Chicken Casserole
//               </h1>
//               <div class="flex items-center gap-6 text-white/90">
//                 <span class="flex items-center gap-2">
//                   <i class="fa-solid fa-clock"></i>
//                   <span>30 min</span>
//                 </span>
//                 <span class="flex items-center gap-2">
//                   <i class="fa-solid fa-utensils"></i>
//                   <span id="hero-servings">4 servings</span>
//                 </span>
//                 <span class="flex items-center gap-2">
//                   <i class="fa-solid fa-fire"></i>
//                   <span id="hero-calories">485 cal/serving</span>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <!-- Action Buttons -->
//         <div class="flex flex-wrap gap-3 mb-8">
//           <button id="log-meal-btn"
//             class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
//             data-meal-id="52772">
//             <i class="fa-solid fa-clipboard-list"></i>
//             <span>Log This Meal</span>
//           </button>
//         </div>

//         <!-- Main Content Grid -->
//         <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <!-- Left Column - Ingredients & Instructions -->
//           <div class="lg:col-span-2 space-y-8">
//             <!-- Ingredients -->
//             <div class="bg-white rounded-2xl shadow-lg p-6">
//               <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                 <i class="fa-solid fa-list-check text-emerald-600"></i>
//                 Ingredients
//                 <span class="text-sm font-normal text-gray-500 ml-auto">9 items</span>
//               </h2>
//               <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
//                   <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
//                   <span class="text-gray-700">
//                     <span class="font-medium text-gray-900">3/4 cup</span> soy
//                     sauce
//                   </span>
//                 </div>
//                 <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
//                   <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
//                   <span class="text-gray-700">
//                     <span class="font-medium text-gray-900">1/2 cup</span>
//                     water
//                   </span>
//                 </div>
//                 <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
//                   <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
//                   <span class="text-gray-700">
//                     <span class="font-medium text-gray-900">1/4 cup</span>
//                     brown sugar
//                   </span>
//                 </div>
//                 <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
//                   <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
//                   <span class="text-gray-700">
//                     <span class="font-medium text-gray-900">1/2 teaspoon</span>
//                     ground ginger
//                   </span>
//                 </div>
//                 <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
//                   <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
//                   <span class="text-gray-700">
//                     <span class="font-medium text-gray-900">1/2 teaspoon</span>
//                     minced garlic
//                   </span>
//                 </div>
//                 <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
//                   <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
//                   <span class="text-gray-700">
//                     <span class="font-medium text-gray-900">4 Tablespoons</span>
//                     cornstarch
//                   </span>
//                 </div>
//                 <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
//                   <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
//                   <span class="text-gray-700">
//                     <span class="font-medium text-gray-900">2</span> chicken
//                     breasts
//                   </span>
//                 </div>
//                 <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
//                   <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
//                   <span class="text-gray-700">
//                     <span class="font-medium text-gray-900">1 bag</span>
//                     stir-fry vegetables
//                   </span>
//                 </div>
//                 <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
//                   <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
//                   <span class="text-gray-700">
//                     <span class="font-medium text-gray-900">3 cups</span>
//                     brown rice
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <!-- Instructions -->
//             <div class="bg-white rounded-2xl shadow-lg p-6">
//               <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                 <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
//                 Instructions
//               </h2>
//               <div class="space-y-4">
//                 <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
//                   <div
//                     class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
//                     1
//                   </div>
//                   <p class="text-gray-700 leading-relaxed pt-2">
//                     Preheat oven to 350° F. Spray a 9x13-inch baking pan with
//                     non-stick spray.
//                   </p>
//                 </div>
//                 <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
//                   <div
//                     class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
//                     2
//                   </div>
//                   <p class="text-gray-700 leading-relaxed pt-2">
//                     Combine soy sauce, ½ cup water, brown sugar, ginger and
//                     garlic in a small saucepan and cover. Bring to a boil over
//                     medium heat. Remove lid and cook for one minute once
//                     boiling.
//                   </p>
//                 </div>
//                 <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
//                   <div
//                     class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
//                     3
//                   </div>
//                   <p class="text-gray-700 leading-relaxed pt-2">
//                     Meanwhile, stir together the cornstarch and 2 tablespoons
//                     of water in a separate dish until smooth. Once sauce is
//                     boiling, add mixture to the saucepan and stir to combine.
//                     Cook until the sauce starts to thicken then remove from
//                     heat.
//                   </p>
//                 </div>
//                 <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
//                   <div
//                     class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
//                     4
//                   </div>
//                   <p class="text-gray-700 leading-relaxed pt-2">
//                     Place the chicken breasts in the prepared pan. Pour one
//                     cup of the sauce over top of chicken. Place chicken in
//                     oven and bake 35 minutes or until cooked through. Remove
//                     from oven and shred chicken in the pan using two forks.
//                   </p>
//                 </div>
//                 <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
//                   <div
//                     class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
//                     5
//                   </div>
//                   <p class="text-gray-700 leading-relaxed pt-2">
//                     *Meanwhile, steam the vegetables according to package
//                     directions and stir together with the cooked brown rice.
//                     Add the remaining sauce to the mixture and stir to
//                     combine. Serve the chicken over the rice and veggie
//                     mixture.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <!-- Video Section -->
//             <div class="bg-white rounded-2xl shadow-lg p-6">
//               <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                 <i class="fa-solid fa-video text-red-500"></i>
//                 Video Tutorial
//               </h2>
//               <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
//                 <iframe src="https://www.youtube.com/embed/4aZr5hZXP_s" class="absolute inset-0 w-full h-full"
//                   frameborder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowfullscreen>
//                 </iframe>
//               </div>
//             </div>
//           </div>

//           <!-- Right Column - Nutrition -->
//           <div class="space-y-6">
//             <!-- Nutrition Facts -->
//             <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
//               <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                 <i class="fa-solid fa-chart-pie text-emerald-600"></i>
//                 Nutrition Facts
//               </h2>
//               <div id="nutrition-facts-container">
//                 <p class="text-sm text-gray-500 mb-4">Per serving</p>

//                 <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
//                   <p class="text-sm text-gray-600">Calories per serving</p>
//                   <p class="text-4xl font-bold text-emerald-600">485</p>
//                   <p class="text-xs text-gray-500 mt-1">Total: 1940 cal</p>
//                 </div>

//                 <div class="space-y-4">
//                   <div class="flex items-center justify-between">
//                     <div class="flex items-center gap-2">
//                       <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
//                       <span class="text-gray-700">Protein</span>
//                     </div>
//                     <span class="font-bold text-gray-900">42g</span>
//                   </div>
//                   <div class="w-full bg-gray-100 rounded-full h-2">
//                     <div class="bg-emerald-500 h-2 rounded-full" style="width: 84%"></div>
//                   </div>

//                   <div class="flex items-center justify-between">
//                     <div class="flex items-center gap-2">
//                       <div class="w-3 h-3 rounded-full bg-blue-500"></div>
//                       <span class="text-gray-700">Carbs</span>
//                     </div>
//                     <span class="font-bold text-gray-900">52g</span>
//                   </div>
//                   <div class="w-full bg-gray-100 rounded-full h-2">
//                     <div class="bg-blue-500 h-2 rounded-full" style="width: 17%"></div>
//                   </div>

//                   <div class="flex items-center justify-between">
//                     <div class="flex items-center gap-2">
//                       <div class="w-3 h-3 rounded-full bg-purple-500"></div>
//                       <span class="text-gray-700">Fat</span>
//                     </div>
//                     <span class="font-bold text-gray-900">8g</span>
//                   </div>
//                   <div class="w-full bg-gray-100 rounded-full h-2">
//                     <div class="bg-purple-500 h-2 rounded-full" style="width: 12%"></div>
//                   </div>

//                   <div class="flex items-center justify-between">
//                     <div class="flex items-center gap-2">
//                       <div class="w-3 h-3 rounded-full bg-orange-500"></div>
//                       <span class="text-gray-700">Fiber</span>
//                     </div>
//                     <span class="font-bold text-gray-900">4g</span>
//                   </div>
//                   <div class="w-full bg-gray-100 rounded-full h-2">
//                     <div class="bg-orange-500 h-2 rounded-full" style="width: 14%"></div>
//                   </div>

//                   <div class="flex items-center justify-between">
//                     <div class="flex items-center gap-2">
//                       <div class="w-3 h-3 rounded-full bg-pink-500"></div>
//                       <span class="text-gray-700">Sugar</span>
//                     </div>
//                     <span class="font-bold text-gray-900">12g</span>
//                   </div>
//                   <div class="w-full bg-gray-100 rounded-full h-2">
//                     <div class="bg-pink-500 h-2 rounded-full" style="width: 24%"></div>
//                   </div>
//                 </div>

//                 <div class="mt-6 pt-6 border-t border-gray-100">
//                   <h3 class="text-sm font-semibold text-gray-900 mb-3">
//                     Vitamins & Minerals (% Daily Value)
//                   </h3>
//                   <div class="grid grid-cols-2 gap-3 text-sm">
//                     <div class="flex justify-between">
//                       <span class="text-gray-600">Vitamin A</span>
//                       <span class="font-medium">15%</span>
//                     </div>
//                     <div class="flex justify-between">
//                       <span class="text-gray-600">Vitamin C</span>
//                       <span class="font-medium">25%</span>
//                     </div>
//                     <div class="flex justify-between">
//                       <span class="text-gray-600">Calcium</span>
//                       <span class="font-medium">4%</span>
//                     </div>
//                     <div class="flex justify-between">
//                       <span class="text-gray-600">Iron</span>
//                       <span class="font-medium">12%</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>`