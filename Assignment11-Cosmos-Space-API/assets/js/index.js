
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
   displayotherLaunches(data.results);
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
 let launchesHTML = ``;
 for (let i = 1; i < results.length; i++) {
    let info = prepareLaunch(results[i]);
    launchesHTML += `<div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
            <img src="${info.image}" alt="${info.name}" class="object-cover w-full h-full" />
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-${info.statusColor}-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${info.status}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${info.name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${info.provider}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${info.launchDate}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${info.launchTime}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${info.rocket}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${info.location}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>`;
            
}
document.getElementById("launches-grid").innerHTML = launchesHTML;
}


/* ************************ Plants section************************ */

/* Get All Planets*/
// const PLANETS_URL = `https://solar-system-opendata-proxy.vercel.app/api/planets`;
async function getPlanets() {
    let response = await fetch(PLANETS_URL);
    let data = await response.json();
    displayPlanets(data.bodies);
}
function preparePlanet(planet) {
    // const name = planet.englishName;
    // const semimajor = planet.semimajorAxis; 
    // const AU = (semimajor / 149597870.7).toFixed(2); 
    // const radius = planet.meanRadius; 
    // const massValue = planet.mass.massValue; 
    // const massExponent = planet.mass.massExponent;
    // const mass = `${massValue} x 10^${massExponent} kg`;
    
    // const volValue = planet.vol.volValue; 
    // const volExponent = planet.vol.volExponent;
    // const volume = `${volValue} x 10^${volExponent} km³`;

    // const density = planet.density;
    // const moons = planet.moons ? planet.moons.length : 0;
    // const gravity = planet.gravity; 
    // const orbitalPeriod = planet.sideralOrbit; 
    // const rotationPeriod = planet.sideralRotation; 

    // const discoveryDate = planet.discoveryDate || 'Ancient Times';
    // const discoveredBy = planet.discoveredBy || 'known Since antiquity';
    // const bodyType = planet.bodyType;
    // const axialTilt = planet.axialTilt;
    // return{
    //     name,
    //     semimajor,
    //     AU,
    //     radius,
    //     massValue,
    //     massExponent,
    //     mass,
    //     volValue,
    //     volExponent,
    //     volume,
    //     density,
    //     moons,
    //     gravity,
    //     orbitalPeriod,
    //     rotationPeriod,
    //     discoveryDate,
    //     discoveredBy,
    //     bodyType,
    //     axialTilt
    // }

   if (!planet) return null;

  // Destructure with default fallbacks
  const {
    id,
    englishName: name = 'Unknown Body',
    semimajorAxis = 0,
    meanRadius = 0,
    density = 0,
    gravity = 0,
    moons = null,
    sideralOrbit = 0,
    sideralRotation = 0,
    discoveredBy = '',
    discoveryDate = '',
    bodyType = 'Planet',
    type = 'Terrestrial',
    vol = {},
    mass = {},
    perihelion = 0,
    aphelion = 0,
    eccentricity = 0,
    inclination = 0,
    axialTilt = 0,
    avgTemp = 0,
    escape = 0,
    image = '',
    description = ''
  } = planet;

  // 1. Calculations & Conversions
  const distanceAU = (semimajorAxis / 149597870.7).toFixed(2);
  const semimajorInM = (semimajorAxis / 1000000).toFixed(1);
  const perihelionInM = (perihelion / 1000000).toFixed(1);
  const aphelionInM = (aphelion / 1000000).toFixed(1);
  const escapeKmPerSec = (escape / 1000).toFixed(2);

  // Temperature conversion (Kelvin to Celsius if necessary, or raw)
  const tempCelsius = avgTemp > 0 ? Math.round(avgTemp - 273.15) : 'N/A';

  // Format Scientific Notations
  const massFormatted = mass.massValue 
    ? `${mass.massValue} × 10^${mass.massExponent} kg` 
    : 'N/A';

  const volFormatted = vol.volValue 
    ? `${vol.volValue} × 10^${vol.volExponent} km³` 
    : 'N/A';

  return {
    id,
    name,
    type,
    bodyType,
    image,
    description,
    
    // Distances & Radii
    distanceAU: `${distanceAU} AU`,
    semimajorAxis: `${semimajorInM}M km`,
    perihelion: `${perihelionInM}M km`,
    aphelion: `${aphelionInM}M km`,
    radius: `${meanRadius.toLocaleString()} km`,
    diameter: `${(meanRadius * 2).toLocaleString()} km`,

    // Physical Characteristics
    mass: massFormatted,
    volume: volFormatted,
    density: `${density} g/cm³`,
    gravity: `${gravity} m/s²`,
    moonsCount: moons ? moons.length : 0,

    // Orbital & Rotational Periods
    orbitalPeriodDays: sideralOrbit ? `${sideralOrbit.toFixed(2)} days` : 'N/A',
    rotationPeriodHours: sideralRotation ? `${Math.abs(sideralRotation).toFixed(2)} hours` : 'N/A',

    // Discovery Information
    discoveredBy: discoveredBy || 'Known since antiquity',
    discoveryDate: discoveryDate || 'Ancient times',

    // Orbital Characteristics Sidebar
    eccentricity: eccentricity.toFixed(5),
    inclination: inclination ? `${inclination}°` : 'N/A',
    axialTilt: `${axialTilt}°`,
    avgTemp: `${avgTemp}K (${tempCelsius}°C)`,
    escapeVelocity: `${escapeKmPerSec} km/s`
  };
    

    
}
function displayPlanets(planets) {
    const colors={
        mercury:'#eab308',
        venus:'#f59e0b',
        earth:'#10b981',
        mars:'#ef4444',
        jupiter:'#f97316',
        saturn:'#fbbf24',
        uranus:'#60a5fa',
        neptune:'#3b82f6',
        pluto:'#a78bfa'
    }
    const image={
        mercury:'./assets/images/mercury.png',
        venus:'./assets/images/venus.png',
        earth:'./assets/images/earth.png',
        mars:'./assets/images/mars.png',
        jupiter:'./assets/images/jupiter.png',
        saturn:'./assets/images/saturn.png',
        uranus:'./assets/images/uranus.png',
        neptune:'./assets/images/neptune.png',
        pluto:'./assets/images/pluto.png',
    }
    let planetsHTML = '';
    for(let i = 0; i < planets.length; i++) {
        const planetInfo = preparePlanet(planets[i]);
        planetsHTML += `
             <div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id=${planets[i].englishName.toLowerCase()}
              style="--planet-color: ${colors[planets[i].englishName.toLowerCase()] || '#eab308'}"
              onmouseover="this.style.borderColor='${colors[planets[i].englishName.toLowerCase()] || '#eab308'}80'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="${image[planets[i].englishName.toLowerCase()]}"
                  alt="${planetInfo.englishName}"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">${planetInfo.englishName}</h4>
              <p class="text-xs text-slate-400 text-center">${planetInfo.distanceAU}</p>
            </div>
        `;
    }
    document.getElementById("planets-grid").innerHTML = planetsHTML;
}

/* ==========================================================================
           App Initialization
   ========================================================================== */


async function initApp() {
    await fetchAPOD();
    await getLaunches();
    await getPlanets();
}

initApp();