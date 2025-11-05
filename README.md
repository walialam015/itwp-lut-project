# 🌦️ Weather App

[![HTML](https://img.shields.io/badge/HTML-5-orange?logo=html5&logoColor=white)](#)
[![CSS](https://img.shields.io/badge/CSS-3-blue?logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript&logoColor=white)](#)
[![Chart.js](https://img.shields.io/badge/Chart.js-Data%20Visualization-ff6384?logo=chartdotjs&logoColor=white)](#)
[![OpenWeatherMap](https://img.shields.io/badge/API-OpenWeatherMap-orange?logo=openstreetmap&logoColor=white)](#)
[![WeatherAPI](https://img.shields.io/badge/API-WeatherAPI-blueviolet?logo=cloudflare&logoColor=white)](#)
[![Open-Meteo](https://img.shields.io/badge/API-OpenMeteo-green?logo=databricks&logoColor=white)](#)

A responsive, feature-rich weather web application built using **HTML**, **CSS**, and **Vanilla JavaScript**, without large frameworks.  
It combines multiple data sources to deliver reliable, real-time weather information with a modern, dynamic interface.  

---

## 🧩 Features

| Feature | Description |
|----------|--------------|
| 🔍 **Location Search** | Search weather for any city worldwide |
| 📍 **Geolocation** | Detect and show weather using GPS |
| 🌐 **Multi-Provider Data** | Uses **OpenWeatherMap**, **WeatherAPI**, and **Open-Meteo** |
| ☀️ **Current Weather** | Temperature, humidity, visibility, wind, and description |
| 🕒 **24-Hour Forecast** | Hourly weather data with Chart.js visualization |
| 📅 **7-Day Forecast** | Extended daily forecast with weather icons |
| 🎨 **Dynamic Theme** | Background color and visuals adapt to conditions (hot, cold, night, etc.) |
| 📊 **Temperature Comparison Graph** | 24-hour dual-source temperature visualization |
| ⭐ **Favorites System** | Save, view, and manage favorite locations |
| 🌡️ **Unit Conversion** | Toggle between °C, °F, and K |
| 📱 **Responsive Design** | Works seamlessly on desktop and mobile |
| 🧭 **Cross-Browser Support** | Tested on Chrome, Edge, Firefox, and Safari |

---

## 🧱 Project Structure
```
├── index.html # Core structure and layout
├── styles.css # Styling and responsive design
├── script.js # JavaScript logic, API integration, event handling
├── README.md # Documentation (this file)
└── Weather_App_Report.docx # Written report for submission
```

---

## 🔧 Setup & Installation

1. Clone the Repository
```
git clone https://github.com/walialam015/itwp-lut-project.git
```

2. Navigate into the Project
```
cd itwp-lut-project
```

3. Insert Your API Keys --> Open script.js and replace the placeholders

```
const API_KEYS = {
    openweathermap: "YOUR_OPENWEATHERMAP_KEY",
    weatherapi: "YOUR_WEATHERAPI_KEY"
};
```

4. Run the Application --> Simply open index.html in your browser — no server setup required.


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





