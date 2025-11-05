# 🌦️ Super Weather App — ITWP Course Project

A modern, responsive weather application built using **HTML**, **CSS**, and **JavaScript** — without any large frameworks.  
The app integrates multiple weather APIs to deliver accurate forecasts, live weather data, and rich visualizations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)
![HTML5](https://img.shields.io/badge/HTML5-supported-orange.svg)
![CSS3](https://img.shields.io/badge/CSS3-styled-blue.svg)

## 🎯 Project Overview

The **Super Weather App** was developed as part of the *ITWP course at LUT University (2025)*.  
Its main goal is to demonstrate how to integrate multiple APIs, handle asynchronous data, and build a fully interactive user experience with pure front-end technologies.

**Key Objectives:**
- ✅ Fetch weather data from **three different APIs** (OpenWeatherMap, WeatherAPI, Open-Meteo)
- ✅ Display **current, hourly, and 7-day forecasts**
- ✅ Allow users to **search cities** or use **geolocation**
- ✅ Include **dynamic visuals and temperature-based color themes**
- ✅ Enable **favorites** and **unit conversions** (°C, °F, K)
- ✅ Present a **24-hour temperature comparison chart**

## 🧱 Project Structure
weather-app/
│
├── index.html # Core structure and layout
├── styles.css # Styling and responsive design
├── script.js # JavaScript logic, API integration, event handling
├── README.md # Documentation (this file)
└── Weather_App_Report.docx # Written report for submission

text

## ⚙️ Technical Workflow

1. **User Input** → User enters city or uses geolocation
2. **API Integration** → Fetch data from multiple weather APIs
3. **Data Processing** → Process and merge API results
4. **UI Update** → Display current weather, forecasts, and charts
5. **Theme Adaptation** → Update colors based on weather conditions
6. **User Features** → Enable favorites and unit conversions

## 🔧 Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/walialam015/itwp-lut-project.git
2. Navigate into the Project
bash
cd itwp-lut-project
3. Insert Your API Keys
Open script.js and replace the placeholder keys:

javascript
const API_KEYS = {
    openweathermap: "YOUR_OPENWEATHERMAP_KEY",
    weatherapi: "YOUR_WEATHERAPI_KEY"
};
4. Run the Application
Simply open index.html in your browser — no additional setup required.

💡 Usage Guide
Search: Enter a city name in the search bar

Location: Click the location icon to use GPS

Forecasts: View current weather, hourly forecast, and 7-day outlook

Favorites: Click the heart icon to save cities

Units: Use toggle buttons to switch between °C, °F, and K

Favorites Menu: Access saved locations quickly

🎨 Design Highlights
Responsive Layout — works seamlessly on both desktop and mobile devices

Dynamic Color Themes — background changes based on temperature, time of day, and weather condition

Interactive Charts — powered by Chart.js for visual 24-hour comparison between APIs

Smooth User Experience — includes loading indicators, animations, and detailed error handling

🌍 Browser Compatibility
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
GitHub: github.com/walialam015

🪶 License
This project was developed for educational purposes under the LUT University ITWP course.
All APIs used are public and free within their respective license terms.
