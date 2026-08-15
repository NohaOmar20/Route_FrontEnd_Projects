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
links.forEach((link)=> link.addEventListener('click', ()=>{
    sections.forEach((section)=> section.classList.add('hidden'));

    var targetSec = link.dataset.section;
    document.getElementById(targetSec).classList.remove('hidden');
}));


// API Key: fIfuAkQWlCsirW6lOilX80hBK9Kiifj2FCXb7NiN
const API_KEY = 'fIfuAkQWlCsirW6lOilX80hBK9Kiifj2FCXb7NiN';