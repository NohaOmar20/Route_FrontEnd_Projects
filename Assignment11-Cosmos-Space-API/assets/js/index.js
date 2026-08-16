
/* ==========================================================================
     CONSTANTS & CONFIGURATION
   ========================================================================== */
// API Key: fIfuAkQWlCsirW6lOilX80hBK9Kiifj2FCXb7NiN
// efVaodLkPR3HTSp8y0HRDzFJdGMeYNOlLIjltfZ1  >>> واحد تاني
const API_KEY = 'efVaodLkPR3HTSp8y0HRDzFJdGMeYNOlLIjltfZ1';
const APOD_BASE_URL = 'https://api.nasa.gov/planetary/apod';
const PLANETS_URL = 'https://solar-system-opendata-proxy.vercel.app/api/planets';


/* ==========================================================================
    DOM ELEMENTS CACHING
   ========================================================================== */
const links = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.app-section');

// APOD UI Elements

const inputDate = document.getElementById("apod-date-input");
const spanDate = document.querySelector(".date-input-wrapper span");
const loadBtn = document.getElementById("load-date-btn");
const apodTitle = document.getElementById("apod-title");
const apodDate = document.getElementById("apod-date");
const apodImage = document.getElementById("apod-image");
const apodDetailDate = document.getElementById("apod-date-detail");
const apodExplanation = document.getElementById("apod-explanation");
const apodCopyright = document.getElementById("apod-copyright");
const apodDateInfo = document.getElementById("apod-date-info");
const apodMediaType = document.getElementById("apod-media-type");


/* ==========================================================================
   3. NAVIGATION LOGIC
   ========================================================================== */

// 


// Side bar 
links.forEach((link) => link.addEventListener('click', () => {
    // Show target section 
    sections.forEach((section) => section.classList.add('hidden'));
    const targetSec = link.dataset.section;
    document.getElementById(`${targetSec}`)?.classList.remove('hidden');

    // Reset all links to default state
    links.forEach((a) => {
        a.classList.remove("bg-blue-500/10", "text-blue-400");
        a.classList.add("text-slate-300", "hover:bg-slate-800");
    });

    // Set clicked link to active state
    link.classList.remove("text-slate-300", "hover:bg-slate-800");
    link.classList.add("bg-blue-500/10", "text-blue-400");
}));



/* ==========================================================================
    API INTEGRATION (ASTRONOMY PICTURE OF THE DAY)
   ========================================================================== */

/* 
Get Today's APOD (Astronomy Picture of the Day) >> Params : API_KEY
 Get APOD (Astronomy Picture of the Day) by Date >> params : API_KEY, date */


function formatDate(dateStr) {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
/**
 *  Putting 2 functions in one function to avoid code repetition and make it more efficient

 * Single function to fetch APOD (defaults to today if no date provided)
 */
async function fetchAPOD(date = null) {
    try {
        let url = `${APOD_BASE_URL}?api_key=${API_KEY}`;
        if (date) {
            url += `&date=${date}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error("Failed to fetch APOD data:", error);
    }
}


/**
 * display(Render) data in the UI today or selected date
 */
function displayData(data) {
    const formatted = formatDate(data.date);

    apodDate.textContent = `Astronomy Picture of the Day - ${formatted}`;
    inputDate.value = data.date;
    spanDate.textContent = formatted;
    
    // Set media source (fallback to url if hdurl isn't present)
    apodImage.src = data.hdurl || data.url;
    
    apodTitle.textContent = data.title;
    apodDetailDate.innerHTML = `<i class="far fa-calendar mr-2"></i>${data.date}`;
    apodExplanation.textContent = data.explanation;
    apodCopyright.textContent = data.copyright ? `© ${data.copyright}` : '';
    apodDateInfo.textContent = data.date;
    apodMediaType.textContent = data.media_type;
}

/* ==========================================================================
    EVENT LISTENERS & INITIALIZATION
   ========================================================================== */
inputDate?.addEventListener("change", () => {
    spanDate.textContent = formatDate(inputDate.value);
});

loadBtn?.addEventListener("click", () => {
    if (inputDate.value) {
        fetchAPOD(inputDate.value);
    }
});



/* ************************ Launches  section************************ */

/* Get Upcoming Launches >> Params: limit (10)*/


/* ************************ Plants section************************ */

/* Get All Planets*/
// const PLANETS_URL = `https://solar-system-opendata-proxy.vercel.app/api/planets`;


/* ==========================================================================
           App Initialization
   ========================================================================== */


async function initApp() {
    await fetchAPOD();
}

initApp();