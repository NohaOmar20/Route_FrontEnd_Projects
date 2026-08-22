/*The state object initialization */
export let state = {
    dataMeals: [],              // Temporary API meals array
    currentFilterLabel: "",     // Tracks active category/area filter string
    currentView: "grid",        // UI mode toggle ("grid" or "list")

    //  Persistence fields (load from browser storage or use default fallbacks)
    mealList: JSON.parse(localStorage.getItem("mealList")) || [], // User's saved meals
    dailyHistory: JSON.parse(localStorage.getItem("dailyHistory")) || {}, // User's daily food log
    weekStartDate: localStorage.getItem("weekStartDate") || new Date().toDateString(), // Start date of the current week

    currentMeal: null,    // Meal object currently open in modal/details >> Currently selected meal for detailed view
    currentNutrition: null, // Nutrition data for the current meal >> Analyzed nutrition facts for active meal
    currentValue: 1,       // Active serving size multiplier

    allProducts: [], // All products fetched from API
    selectedGrade: ""           // Active Eco/Nutri-score filter string
}
/* Storage Initialization check*/

if (!localStorage.getItem("weekStartDate")) {
    localStorage.setItem("weekStartDate", state.weekStartDate); // Initialize weekStartDate in localStorage if not present(in the first run, user visits the site)
}

/* Local Storage Initialization (Helper Functions) */
/* allow other modules to save state changes to localStorage without repeating JSON.parse/stringify logic. 
These functions can be called whenever the corresponding state property is updated.*/
export function saveMealList() {
    localStorage.setItem("mealList", JSON.stringify(state.mealList))
}

export function saveDailyHistory() {
    localStorage.setItem("dailyHistory", JSON.stringify(state.dailyHistory))
}

export function saveWeekStartDate() {
    localStorage.setItem("weekStartDate", state.weekStartDate)
}

/*The Day Transition & Reset Logic (checkNewDay)*/
export function checkNewDay() {
    let lastActiveDate = localStorage.getItem("lastActiveDate");
    let today = new Date().toDateString();

    // If it's a new day since the user last used the app , do && for a brand-new user and attempts to archive non-existent food logs before the app has even initialized properly. 
    if (lastActiveDate && lastActiveDate !== today) {
        let totalKcal = 0;
        state.mealList.forEach(function (item) {
            totalKcal += item.nutrition.perServing.calories;
        })

        // Archive yesterday's total calories and item count into dailyHistory
        state.dailyHistory[lastActiveDate] = {
            calories: Math.round(totalKcal),
            items: state.mealList.length
        }
        saveDailyHistory(); // Persist the updated dailyHistory to localStorage
        
        // Clear today's active meal list for a fresh start
        state.mealList = []
        saveMealList();
       //  Check if a full week (7 days) has passed to clear old history
       let start = new Date(state.weekStartDate);
       let now = new Date(today);
       let diffDays = Math.floor((new Date(today) - start) / (1000 * 60 * 60 * 24));

       if (diffDays >= 7) {
            state.dailyHistory = {}; // Clear the entire daily history
            saveDailyHistory(); // Persist the cleared dailyHistory to localStorage
            state.weekStartDate = today; // Reset the week start date to today
       }
    }
    // Always update lastActiveDate to today
    localStorage.setItem("lastActiveDate", today);
}

/* Data Query Helper Functions */ 
export function getKcalForDate(date) {
    let dateStr  = date.toDateString();
    let today = new Date().toDateString();

    if (dateStr === today) {
        // Return the total calories for today from the current mealList
        let total = 0;
        for(let i = 0; i < state.mealList.length; i++) {
            total += state.mealList[i].nutrition.perServing.calories;
        }
        return Math.round(total);
    }
    // If past date, retrieve from dailyHistory archive
    let entry = state.dailyHistory[dateStr];
    if(!entry) return 0; // No entry found for that date
    return typeof entry === "object"? entry.calories : entry; // Return calories if entry exists else return 0
}

export function getItemsCountForDate(date) {
    let dateStr  = date.toDateString();
    let today = new Date().toDateString();
    if (dateStr === today) {
        return state.mealList.length; // Return the count of meals for today
    }
    // If past date, retrieve from dailyHistory archive
    let entry = state.dailyHistory[dateStr];
    if(!entry || typeof entry !== "object") return 0; // No entry found for that date
    return entry.items || 0; // Return item count if entry exists else return 0
}