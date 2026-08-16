
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
async function getLaunches() {
   const response = await fetch(`https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?format=json&limit=10`);
   const data = await response.json();
//    return data;
//    console.log(data);
   displayMainLaunch(data.results[0]);
   displayotherLaunches(data.results.slice(1));
}
function prepareLaunch(launch) {
    // from the results array
    const name = launch.name;
    const provider = launch.launch_service_provider.name;
    const rocket = launch.rocket.configuration.name;
    const tripDate = new Date(launch.net); 
    const diffDate = tripDate - new Date;
    const days = Math.ceil(diffDate / (1000 * 60 * 60 * 24));
    const launchDate = tripDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const launchTime = tripDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone:"UTC"
    }) +'UTC';
    const location = launch.pad.location.name;
    const country = launch.pad.location.country.name;
    const image = launch.image.image_url
    const discription = launch.mission.description;
    const status = launch.status.abbrev;
    const statusColor = {
        'GO': 'green',
        'TBD': 'red',
        'TBC': 'yellow'
    }[status] || 'gray';
    return {
        name,
        provider,
        rocket,
        tripDate,
        days,
        launchDate,
        launchTime,
        location,
        country,
        image,
        discription,
        status,
        statusColor
    };

}
function displayMainLaunch(data){
   let info = prepareLaunch(data);
    let main = ` <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-${info.statusColor}-500/20 text-${info.statusColor}-400 rounded-full text-sm font-semibold"
                      >
                        ${info.status}
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                        ${info.name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${info.provider}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${info.rocket}</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">${info.days}</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${info.launchDate}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${info.launchTime}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${info.location}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${info.country}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      ${info.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                    <div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                      <img src="${info.image}" alt="${info.name}" class="object-cover w-full h-full" />
                    </div>
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>`
            document.getElementById("featured-launch").innerHTML = main;
}
function displayotherLaunches(results) {

}


/* ************************ Plants section************************ */

/* Get All Planets*/
// const PLANETS_URL = `https://solar-system-opendata-proxy.vercel.app/api/planets`;


/* ==========================================================================
           App Initialization
   ========================================================================== */


async function initApp() {
    await fetchAPOD();
    await getLaunches();
}

initApp();