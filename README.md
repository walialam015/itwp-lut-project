# 🌦️ Super Weather App — ITWP Course Project

A modern, responsive weather application built using **HTML**, **CSS**, and **JavaScript** — without any large frameworks.  
The app integrates multiple weather APIs to deliver accurate forecasts, live weather data, and rich visualizations.

---

## 🎯 Project Overview

The **Super Weather App** was developed as part of the *ITWP course at LUT University (2025)*.  
Its main goal is to demonstrate how to integrate multiple APIs, handle asynchronous data, and build a fully interactive user experience with pure front-end technologies.

**Key Objectives:**
- Fetch weather data from **three different APIs** (OpenWeatherMap, WeatherAPI, Open-Meteo).
- Display **current, hourly, and 7-day forecasts**.
- Allow users to **search cities** or use **geolocation**.
- Include **dynamic visuals and temperature-based color themes**.
- Enable **favorites** and **unit conversions** (°C, °F, K).
- Present a **24-hour temperature comparison chart**.

---

## 🧱 Project Structure

weather-app/
│
├── index.html # Core structure and layout
├── styles.css # Styling and responsive design
├── script.js # JavaScript logic, API integration, event handling
├── README.md # Documentation (this file)
└── Weather_App_Report.docx # Written report for submission

css
Copy code

---

## ⚙️ Technical Workflow

```mermaid
flowchart TD
    A[User Input / Geolocation] --> B[Fetch Data from APIs]
    B --> C[Process & Merge Results]
    C --> D[Display Current Weather]
    C --> E[Render Hourly & Weekly Forecasts]
    D --> F[Dynamic Theme Update]
    E --> G[Chart.js 24-Hour Comparison]
    G --> H[Favorites & Unit Conversion Features]
🔧 Setup & Installation
1. Clone the Repository
bash
Copy code
git clone https://github.com/walialam015/itwp-lut-project.git
2. Navigate into the Project
bash
Copy code
cd itwp-lut-project
3. Insert Your API Keys
Open script.js and replace the placeholder keys:

javascript
Copy code
const API_KEYS = {
    openweathermap: "YOUR_OPENWEATHERMAP_KEY",
    weatherapi: "YOUR_WEATHERAPI_KEY"
};
4. Run the Application
Simply open index.html in your browser — no additional setup required.

💡 Usage Guide
Enter a city name in the search bar or click the location icon to use GPS.

View current weather, hourly forecast, and 7-day outlook.

Click the heart icon to save a city as a favorite.

Use the unit toggle buttons to switch between °C, °F, and K.

Open the Favorites menu to quickly access saved locations.

🎨 Design Highlights
Responsive Layout — works seamlessly on both desktop and mobile devices.

Dynamic Color Themes — background changes based on temperature, time of day, and weather condition.

Interactive Charts — powered by Chart.js for visual 24-hour comparison between APIs.

Smooth User Experience — includes loading indicators, animations, and detailed error handling.

🌍 Compatibility
The app has been tested successfully on:

Browser	Status
Google Chrome	✅
Mozilla Firefox	✅
Microsoft Edge	✅
Apple Safari	✅

🧩 Future Enhancements
Add Air Quality Index (AQI) information

Include sunrise/sunset times

Add weather alerts and radar maps

Introduce dark/light mode toggle

Support multiple languages

🧠 Technical Stack
Technology	Purpose
HTML5	Base structure and layout
CSS3	Styling, themes, responsiveness
JavaScript (ES6)	Logic, DOM manipulation, API calls
Chart.js	24-hour temperature comparison graph
OpenWeatherMap API	Current and forecast weather data
WeatherAPI	Alternative data source for comparison
Open-Meteo API	Free global 7-day and hourly forecast

🧑‍💻 Author
Name: Wali Alam
Course: ITWP — LUT University
Year: 2025
GitHub Repository: github.com/walialam015/itwp-lut-project

🪶 License
This project was developed for educational purposes under the LUT University ITWP course.
All APIs used are public and free within their respective license terms.
