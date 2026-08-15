FitCore Gym - Landing Page Project
This project is a recreation of a professional gym landing page, developed as part of a front-end development assignment. The goal was to replicate a specific design while adhering to strict architectural constraints.

Reference Application: FitCore Gym Live Demo>>https://fit-core-gym.vercel.app/

🚀 Project Overview
The FitCore Gym landing page is a clean, responsive-ready interface featuring sections for hero content, service highlights, member testimonials, statistics, and a registration form.

Technical Constraints & Requirements:
Layout Logic: Strictly used Float Display (float: left/right) for all structural positioning and column layouts, as per assignment requirements.

Typography: No external font families were imported; the project relies on system default fonts to maintain a lightweight footprint.

Styling Architecture: Implemented a utility-first CSS approach.

🛠️ Key Features
1. Utility-First CSS (utilities.css)
To improve maintainability and follow the DRY (Don't Repeat Yourself) principle, I created a comprehensive utilities.css file. This file contains reusable classes for:

Spacing: Margin and padding helpers (e.g., px-6, py-20, mb-30).
Layout: Float utilities (fl, fr) and clear-fix helpers (clr).
Typography: Sizing (text-7xl, text-lg) and alignment.
Colors: Background and text color classes based on the design palette.
Borders: Radius and border-width helpers.

Note: This utility file is designed to be a foundation for all upcoming tasks. By importing it, we ensure design consistency and significantly reduce the size of the main style.css.

2. Custom Layout
Used a container-based system to center content.
Implemented a manual grid system using percentage widths (e.g., w-30, w-43, w-25) combined with floats.
Ensured layout stability by using the .clr class to clear floats at the end of every row/section.

📁 File Structure
├── index.html          # Main structural markup
├── css/
│   ├── utilities.css   # Reusable utility classes (Global)
│   └── style.css       # Project-specific custom styles
└── images/             # Local assets and illustrations


💻 How to Use
Clone the repository.
Open index.html in any modern web browser.
For future tasks: Link the utilities.css in your new HTML files to utilize the pre-built spacing and layout system: <link rel="stylesheet" href="./css/utilities.css">

 🎓 About the Author
Noha Omar is a Quality-driven Front-End Developer and UX/UI designer certified by Google. A Computer Science Engineering graduate from the **Egypt-Japan University of Science and Technology (E-JUST)**, specializing in responsive web applications and AI-powered research.

LinkedIn: [nohaomar](https://www.linkedin.com/in/nohaomar/)
GitHub: [NohaOmar20](https://github.com/NohaOmar20)
Instagram:[noha.omar._](https://www.instagram.com/noha.omar._/)


Developed as part of the Web Development Assignment 2. Focus was placed on mastering the legacy Float layout system and CSS architecture.