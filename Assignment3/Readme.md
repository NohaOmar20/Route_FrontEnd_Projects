
## 🚁 DJI Mavic 4 Pro - Premium Landing Page
A high-performance, single-page landing page built to showcase the DJI Mavic 4 Pro drone. This project highlights modern layout techniques, smooth micro-interactions, and a fully custom responsive architecture.

Reference Application: DJI Mavic 4 Pro (https://drone-product-page.vercel.app/)
## 📱 Architecture & Responsiveness
This project uses a Desktop-First Responsive Web Design (RWD) strategy. The structure is built to look optimal on large display screens first, then scales down using targeted CSS Media Queries to adjust layouts for tablets, landscape viewports, and mobile devices.
## 🛠️ Tech Stack & Resources

* HTML5: Semantic markup structure.
* CSS3: Custom styles, layouts, and animations.
* Font Awesome: Scalable vector icons used for UI elements (ratings, buttons, navbar states).
* Vercel: Cloud platform used for production deployment.

------------------------------
## 📂 CSS File Structure
To keep code maintainable, modular, and to avoid repetition, the styling is split across three distinct files:

   1. style.css
   * Contains global CSS resets, typography setups, variables, and structural base components.
   2. utilities.css
   * Houses highly reusable utility-first classes (e.g., .flex, .justify-between, .p-20, .w-100).
   3. media.css
   * Dedicated entirely to responsive logic. Cleans up screen boundaries by shifting horizontal desktop sections into vertical layouts using @media breakpoints.
   
------------------------------
## 📐 Layout Control
This project avoids complex grid libraries or third-party frameworks. Layouts are managed using native CSS properties:

* CSS Flexbox: Used for alignment, element gaps (gap), dynamic scaling (flex-grow), and row-to-column axis transitions.
* CSS Positioning: Strategic use of position: relative, position: absolute for overlay badges (e.g., discount alerts, tags), and position: fixed or position: static transitions for navigation bars.

------------------------------
## ✨ Micro-Interactions & Animations
The site includes smooth, performance-optimized visual feedback for user interactions:

* Animated Underlines: Navigation links feature custom pseudo-element (::after) hover lines that expand smoothly from 0% to 100% width.
* Hover Scaling: Interactive product cards and CTA buttons elevate slightly (transform: scale / translateY) to boost engagement.
* State Retention: The .active page utility class locks essential branding colors on load while maintaining structural entry animations.

------------------------------
## 🚀 How to Use & Deploy## Running the Project Locally
You do not need to compile code or run a local server environment to test this website.

   1. Clone or Download this repository directly to your local computer.
   2. Ensure your project folder layout keeps the CSS files and images grouped together:
   
   ├── index.html
   ├── style.css
   ├── utilities.css
   ├── media.css
   └── images/
       └── [all drone and avatar assets]
   
   3. Double-click the index.html file to launch the page inside any modern web browser (Chrome, Edge, Firefox, or Safari).
   4. To test the responsive web design features, right-click anywhere on the page, select Inspect, and toggle the Device Toolbar to simulate mobile phone or tablet screens.

------------------------------
## ✍️ About the Author
Hello I'm Noha Omar is a Quality-driven Front-End Developer and UX/UI designer certified by Google. A Computer Science Engineering graduate from the **Egypt-Japan University of Science and Technology (E-JUST)**, specializing in responsive web applications and AI-powered research.

LinkedIn: [nohaomar](https://www.linkedin.com/in/nohaomar/)
GitHub: [NohaOmar20](https://github.com/NohaOmar20)
Instagram:[noha.omar._](https://www.instagram.com/noha.omar._/)


This project is developed as part of the Web Development Assignment 3. Focus was placed on mastering the legacy flex layout system and CSS architecture.
* Core Focus: Clean code design patterns, utility-first styling structures, and responsive layouts built using pure CSS foundations.
------------------------------


