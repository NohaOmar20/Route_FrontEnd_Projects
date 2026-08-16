
// Variables
var links = document.querySelectorAll('.nav-link');
var sections = document.querySelectorAll('.app-section');
var inputDate = document.getElementById("apod-date-input");
var spanDate = document.querySelector(".date-input-wrapper span");
var loadBtn= document.getElementById("load-date-btn");

const API_KEY = 'efVaodLkPR3HTSp8y0HRDzFJdGMeYNOlLIjltfZ1';
// Get all data

async function getAllData() {
    await getToday();
}
getAllData();



// 
/* Controling the aside sections in the aside bar 

To make a loop over them>> we can use the querySelectorAll ,
 it will return to me nodeList, to select all the links
 and then we can use the forEach method to loop over them
 and add an event listener to each link. 
 When a link is clicked>> 
 use the classList property to add and remove hidden class from the links.
*/

// Side bar 
links.forEach((link) => link.addEventListener('click', () => {
    // Show target section 
    sections.forEach((section) => section.classList.add('hidden'));
    var targetSec = link.dataset.section;
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








/* *** Start API Integration *** */
/* ************************ Today in Space section************************ */

// API Key: fIfuAkQWlCsirW6lOilX80hBK9Kiifj2FCXb7NiN
// efVaodLkPR3HTSp8y0HRDzFJdGMeYNOlLIjltfZ1  >>> واحد تاني
/* 
Get Today's APOD (Astronomy Picture of the Day) >> Params : API_KEY
*/



async function getToday() {
    //Use it only for Image display
    var APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    var response = await fetch(APOD_URL);
    var data = await response.json();
    // console.log(data);

    displayData(data);

}

/* Get APOD (Astronomy Picture of the Day) by Date >> params : API_KEY, date 
Fetches APOD for a specific date selected by the user via the custom date picker. 
Date must be in YYYY-MM-DD format and cannot be in the future or before June 16, 1995.
defaults to today
*/
async function getSpecificDay(date) {
    var APOD_BY_DATE_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;

     var response = await fetch(APOD_BY_DATE_URL);
    var data = await response.json();
    // console.log(data);

    displayData(data);
}
function formattedDate(date) {
     var newDate = new Date(date);
    var formattedDate = newDate.toLocaleDateString('en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return formattedDate;
}
inputDate.addEventListener("change", ()=> {
    var selectedDate = formattedDate(inputDate.value);
    spanDate.textContent = selectedDate;
});
loadBtn.addEventListener("click", async ()=> {
    await getSpecificDay(inputDate.value);
});

// display data in the UI today or selected date
function displayData(data) {
    var date = formattedDate(data.date);

    document.getElementById("apod-date").textContent = `Astronomy Picture of the Day - ${date}`;
    inputDate.value = data.date;
    spanDate.textContent = date;
    document.getElementById("apod-image").src = data.hdurl || data.url;
    document.getElementById("apod-title").textContent = data.title;
    document.getElementById("apod-date-detail").innerHTML =`<i class="far fa-calendar mr-2"></i>${data.date}`;
    document.getElementById("apod-explanation").textContent = data.explanation;
    document.getElementById("apod-copyright").textContent = data.copyright ? `© ${data.copyright}` : '';
    document.getElementById("apod-date-info").textContent = data.date;
    document.getElementById("apod-media-type").textContent = data.media_type;



}





/* ************************ Launches  section************************ */

/* Get Upcoming Launches >> Params: limit (10)*/


/* ************************ Plants section************************ */

/* Get All Planets*/
const PLANETS_URL = `https://solar-system-opendata-proxy.vercel.app/api/planets`;
