var nextBtn = document.getElementById("next-testimonial");
var prevBtn = document.getElementById("prev-testimonial");
var testimonialContainer = document.getElementById("testimonials-carousel");
var cardWidth = testimonialContainer.querySelector(".testimonial-card").offsetWidth;

var links = document.querySelectorAll("nav a");
// console.log(links);
var sections = document.querySelectorAll("section");

const filterButtons = document.querySelectorAll("[data-filter]");
const portfolioItems = document.querySelectorAll(".portfolio-item");

const themeBtn = document.getElementById("theme-toggle-button");


// ===================
//Start  dark mode toggle 
// ===================
themeBtn.addEventListener("click", () => {
  // Toggle 'dark' class on <html> element
  const isDark = document.documentElement.classList.toggle("dark");

  // Update accessibility attribute
  themeBtn.setAttribute("aria-pressed", isDark);

  // Save preference to localStorage
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Sync button aria-pressed state on initial load (if theme was previously saved)
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  themeBtn.setAttribute("aria-pressed", "true");
}
// ===================
//End  dark mode toggle 
// ===================

// ===================
//Start  Scroll spy 
// ===================

// when the scroll is happeneing i will check the lenght of every section (offset top) and if the scroll is in that section i will add the active class to the link of that section
window.addEventListener("scroll", changeLinkState);
function changeLinkState() {
    var currentSectionId = "";
    for (var i = 0; i < links.length; i++) {
        if (scrollY >= sections[i].offsetTop - 100) {
            currentSectionId = sections[i].getAttribute("id");
        }
        for (var j = 0; j < links.length; j++) {
            if (links[j].getAttribute("href").substring(1) === currentSectionId) {
                links[j].classList.add("active");
            } else {
                links[j].classList.remove("active");
            }
        }
    }
}
// ===================
//End  Scroll spy 
// ===================



// ===================
//Start  Navs and Taps  
// ===================

//if  data filter == data category for the portfolio section

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.getAttribute("data-filter");
        portfolioItems.forEach((item) => {
            const itemCategory = item.getAttribute("data-category");
            const isMatch = selectedFilter === "all" || selectedFilter === itemCategory;
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            if (isMatch) {
                // 1. Show element in layout
                item.style.display = "block";

                // 2. Trigger smooth entry animation on next paint frame
                requestAnimationFrame(() => {
                    item.style.transition = "opacity 0.3s, transform 0.3s";
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                });
            } else {
                // 1. Trigger smooth exit animation
                item.style.transition = "opacity 0.3s, transform 0.3s";
                item.style.opacity = "0";
                item.style.transform = "scale(0.8)";
                setTimeout(() => {
                    if (item.style.opacity === "0") {
                        item.style.display = "none";
                    }
                }, 300);
            }

        });
    });
});


// ===================
//End  Navs and Taps  
// ====================





// ===================
//Start Slider (carousel)
// ===================
var index = 0;
nextBtn.addEventListener("click", function () {
    index++;
    if (index == 4) {
        index = 0;
    }
    slide();
});
prevBtn.addEventListener("click", function () {
    index--;
    if (index < 0) {
        index = 3;
    }
    slide();
});
function slide() {
    testimonialContainer.style.transform = `translateX(${cardWidth * index}px)`;
}
// ===================
//End Slider (carousel)
// ===================


// Call the function to set the initial state of the links(hero section) when the page loads
changeLinkState();