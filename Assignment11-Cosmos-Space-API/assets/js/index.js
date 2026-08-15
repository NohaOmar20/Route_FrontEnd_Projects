/* Controling the nav linkes in the aside bar when clicked show it and hide the other links
To make a loop over them>> we can use the querySelectorAll , it will return to me nodeList, to select all the links
 and then we can use the forEach method to loop over them
 and add an event listener to each link. 
 When a link is clicked>> use the classList property to add and remove hidden class from the links.
*/ 



var links = document.querySelectorAll('.nav-link');
// console.log(links);
var sections = document.querySelectorAll('.app-section');
// console.log(sections);

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
//Use it only for Image display
const API_KEY = 'fIfuAkQWlCsirW6lOilX80hBK9Kiifj2FCXb7NiN';
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;




/* Get APOD (Astronomy Picture of the Day) by Date >> params : API_KEY, date 
Fetches APOD for a specific date selected by the user via the custom date picker. 
Date must be in YYYY-MM-DD format and cannot be in the future or before June 16, 1995.
defaults to today
*/ 
const APOD_BY_DATE_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=2025-12-01`;

/* ************************ Launches  section************************ */ 

/* Get Upcoming Launches >> Params: limit (10)*/ 


/* ************************ Plants section************************ */ 

/* Get All Planets*/  
const PLANETS_URL = `https://solar-system-opendata-proxy.vercel.app/api/planets`;
