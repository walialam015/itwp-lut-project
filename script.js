const API_KEYS = {
    openweathermap: "YOUR_API_KEY_HERE", 
    weatherapi: "YOUR_API_KEY_HERE"        
};

// API URLs
const API_URLS = {
    openweathermap: "https://api.openweathermap.org/data/2.5/",
    weatherapi: "http://api.weatherapi.com/v1/",
    openmeteo_forecast: "https://api.open-meteo.com/v1/forecast",
    openmeteo_geocode: "https://geocoding-api.open-meteo.com/v1/search"
};

// Global variables
let currentUnit = "celsius";
let currentCity = "";
let favorites = JSON.parse(localStorage.getItem("weatherFavorites")) || [];
let chart = null;

// Temperature conversion functions
function convertTemperature(temp, fromUnit, toUnit) {
    if (fromUnit === toUnit) return temp;
    
    let celsius = temp;
    if (fromUnit === "fahrenheit") {
        celsius = (temp - 32) * 5/9;
    } else if (fromUnit === "kelvin") {
        celsius = temp - 273.15;
    }
    
    if (toUnit === "fahrenheit") {
        return celsius * 9/5 + 32;
    } else if (toUnit === "kelvin") {
        return celsius + 273.15;
    }
    return celsius;
}

function formatTemperature(temp, unit) {
    const converted = convertTemperature(temp, "celsius", unit);
    if (unit === "kelvin") {
        return Math.round(converted) + "K";
    }
    return Math.round(converted);
}

function getUnitSuffix() {
    if (currentUnit === "fahrenheit") return "°F";
    if (currentUnit === "kelvin") return "K";
    return "°C";
}

// Enhanced weather icon mapping with better visual representations
function getWeatherIcon(weatherCode, provider = "openweathermap") {
    const iconMap = {
        "01": "fas fa-sun", // Clear sky
        "02": "fas fa-cloud-sun", // Few clouds
        "03": "fas fa-cloud", // Scattered clouds
        "04": "fas fa-cloud", // Broken clouds
        "09": "fas fa-cloud-rain", // Shower rain
        "10": "fas fa-cloud-rain", // Rain
        "11": "fas fa-bolt", // Thunderstorm
        "13": "fas fa-snowflake", // Snow
        "50": "fas fa-smog" // Mist
    };
    
    if (provider === "weatherapi") {
        const waIconMap = {
            "1000": "fas fa-sun",
            "1003": "fas fa-cloud-sun",
            "1006": "fas fa-cloud",
            "1009": "fas fa-cloud",
            "1030": "fas fa-smog",
            "1063": "fas fa-cloud-rain",
            "1066": "fas fa-snowflake",
            "1069": "fas fa-cloud-rain",
            "1072": "fas fa-cloud-rain",
            "1087": "fas fa-bolt",
            "1114": "fas fa-snowflake",
            "1117": "fas fa-snowflake",
            "1135": "fas fa-smog",
            "1147": "fas fa-smog",
            "1150": "fas fa-cloud-rain",
            "1153": "fas fa-cloud-rain",
            "1168": "fas fa-cloud-rain",
            "1171": "fas fa-cloud-rain",
            "1180": "fas fa-cloud-rain",
            "1183": "fas fa-cloud-rain",
            "1186": "fas fa-cloud-rain",
            "1189": "fas fa-cloud-rain",
            "1192": "fas fa-cloud-rain",
            "1195": "fas fa-cloud-rain",
            "1198": "fas fa-cloud-rain",
            "1201": "fas fa-cloud-rain",
            "1204": "fas fa-cloud-rain",
            "1207": "fas fa-cloud-rain",
            "1210": "fas fa-snowflake",
            "1213": "fas fa-snowflake",
            "1216": "fas fa-snowflake",
            "1219": "fas fa-snowflake",
            "1222": "fas fa-snowflake",
            "1225": "fas fa-snowflake",
            "1237": "fas fa-snowflake",
            "1240": "fas fa-cloud-rain",
            "1243": "fas fa-cloud-rain",
            "1246": "fas fa-cloud-rain",
            "1249": "fas fa-cloud-rain",
            "1252": "fas fa-cloud-rain",
            "1255": "fas fa-snowflake",
            "1258": "fas fa-snowflake",
            "1261": "fas fa-snowflake",
            "1264": "fas fa-snowflake",
            "1273": "fas fa-bolt",
            "1276": "fas fa-bolt",
            "1279": "fas fa-bolt",
            "1282": "fas fa-bolt"
        };
        return waIconMap[weatherCode] || "fas fa-sun";
    }
    
    if (provider === "openmeteo") {
        // Map Open-Meteo weather codes to Font Awesome
        const code = Number(weatherCode);
        if ([0].includes(code)) return "fas fa-sun"; // Clear
        if ([1,2,3].includes(code)) return "fas fa-cloud-sun"; // Mainly clear to overcast
        if ([45,48].includes(code)) return "fas fa-smog"; // Fog
        if ([51,53,55,61,63,65,80,81,82].includes(code)) return "fas fa-cloud-rain"; // Drizzle/Rain
        if ([56,57].includes(code)) return "fas fa-cloud-rain"; // Freezing drizzle
        if ([66,67].includes(code)) return "fas fa-cloud-rain"; // Freezing rain
        if ([71,73,75,77,85,86].includes(code)) return "fas fa-snowflake"; // Snow
        if ([95,96,99].includes(code)) return "fas fa-bolt"; // Thunderstorm
        return "fas fa-cloud";
    }
    
    return iconMap[weatherCode] || "fas fa-sun";
}

// Enhanced dynamic theming based on weather and time
function changeBackground(weatherCode, temp, description = "") {
    const body = document.body;
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;
    
    // Remove all weather classes
    body.classList.remove("cold", "hot", "night", "rainy", "snowy", "foggy", "stormy", "sunny", "cloudy");
    
    // Determine weather theme
    if (weatherCode.includes("09") || weatherCode.includes("10") || weatherCode.includes("11") || 
        description.toLowerCase().includes("rain") || description.toLowerCase().includes("shower")) {
        body.classList.add("rainy");
    } else if (weatherCode.includes("13") || description.toLowerCase().includes("snow")) {
        body.classList.add("snowy");
    } else if (weatherCode.includes("50") || description.toLowerCase().includes("fog") || 
               description.toLowerCase().includes("mist")) {
        body.classList.add("foggy");
    } else if (weatherCode.includes("11") || description.toLowerCase().includes("thunder")) {
        body.classList.add("stormy");
    } else if (weatherCode.includes("01") || description.toLowerCase().includes("clear")) {
        body.classList.add("sunny");
    } else if (weatherCode.includes("02") || weatherCode.includes("03") || weatherCode.includes("04") ||
               description.toLowerCase().includes("cloud")) {
        body.classList.add("cloudy");
    }
    
    // Temperature-based themes
    if (temp < 5) {
        body.classList.add("cold");
    } else if (temp > 30) {
        body.classList.add("hot");
    }
    
    // Time-based theme
    if (isNight) {
        body.classList.add("night");
    }
}

// Show/hide loading and error messages
function showLoading() {
    document.getElementById("loading").style.display = "block";
    document.getElementById("errorMessage").style.display = "none";
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
}

function showError(message) {
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("errorText").textContent = message;
    hideLoading();
}

function hideError() {
    document.getElementById("errorMessage").style.display = "none";
}

// OpenWeatherMap API functions
async function fetchOpenWeatherMap(city) {
    try {
        const response = await fetch(
            `${API_URLS.openweathermap}weather?q=${city}&appid=${API_KEYS.openweathermap}&units=metric`
        );
        if (!response.ok) throw new Error("OpenWeatherMap API error");
        return await response.json();
    } catch (error) {
        console.error("OpenWeatherMap error:", error);
        return null;
    }
}

// WeatherAPI functions
async function fetchWeatherAPI(city) {
    try {
        const response = await fetch(
            `${API_URLS.weatherapi}current.json?key=${API_KEYS.weatherapi}&q=${city}&aqi=no`
        );
        if (!response.ok) throw new Error("WeatherAPI error");
        return await response.json();
    } catch (error) {
        console.error("WeatherAPI error:", error);
        return null;
    }
}

// Open-Meteo (FREE, no API key): geocoding + forecast
async function fetchOpenMeteo(city) {
    try {
        const geoRes = await fetch(`${API_URLS.openmeteo_geocode}?name=${encodeURIComponent(city)}&count=1`);
        if (!geoRes.ok) throw new Error("Open-Meteo geocoding error");
        const geo = await geoRes.json();
        const loc = geo.results && geo.results[0];
        if (!loc) throw new Error("City not found in geocoding");

        const lat = loc.latitude;
        const lon = loc.longitude;

        const params = new URLSearchParams({
            latitude: String(lat),
            longitude: String(lon),
            current_weather: "true",
            hourly: "temperature_2m,weathercode",
            daily: "temperature_2m_max,temperature_2m_min,weathercode",
            timezone: "auto"
        });

        const fcRes = await fetch(`${API_URLS.openmeteo_forecast}?${params.toString()}`);
        if (!fcRes.ok) throw new Error("Open-Meteo forecast error");
        const fc = await fcRes.json();

        return {
            city: loc.name,
            temperature: fc.current_weather?.temperature,
            description: "", // Open-Meteo lacks text; we keep empty
            humidity: undefined,
            windSpeed: fc.current_weather?.windspeed,
            visibility: undefined,
            weatherCode: fc.current_weather?.weathercode,
            icon: fc.current_weather?.weathercode,
            days: fc.daily || {},
            hours: fc.hourly || {}
        };
    } catch (error) {
        console.error("Open-Meteo error:", error);
        return null;
    }
}

// Display weather data for each provider
function displayOpenWeatherMapData(data) {
    if (!data) return;
    
    document.getElementById("owIcon").className = getWeatherIcon(data.weather[0].icon.substring(0, 2));
    const owTempEl = document.getElementById("owTemp");
    owTempEl.dataset.tempC = String(data.main.temp);
    owTempEl.textContent = formatTemperature(parseFloat(owTempEl.dataset.tempC), currentUnit);
    document.getElementById("owDescription").textContent = data.weather[0].description;
    document.getElementById("owVisibility").textContent = (data.visibility / 1000).toFixed(1) + " km";
    document.getElementById("owWind").textContent = data.wind.speed + " m/s";
    document.getElementById("owHumidity").textContent = data.main.humidity + "%";
    
    // Update unit symbol
    updateUnitSymbols();
}

function displayWeatherAPIData(data) {
    if (!data) return;
    
    document.getElementById("waIcon").className = getWeatherIcon(data.current.condition.code.toString(), "weatherapi");
    const waTempEl = document.getElementById("waTemp");
    waTempEl.dataset.tempC = String(data.current.temp_c);
    waTempEl.textContent = formatTemperature(parseFloat(waTempEl.dataset.tempC), currentUnit);
    document.getElementById("waDescription").textContent = data.current.condition.text;
    document.getElementById("waVisibility").textContent = data.current.vis_km + " km";
    document.getElementById("waWind").textContent = data.current.wind_kph / 3.6 + " m/s";
    document.getElementById("waHumidity").textContent = data.current.humidity + "%";
    
    // Update unit symbol
    updateUnitSymbols();
}

function displayOpenMeteoData(data) {
    if (!data) return;
    
    document.getElementById("awIcon").className = getWeatherIcon(data.weatherCode, "openmeteo");
    const awTempEl = document.getElementById("awTemp");
    if (typeof data.temperature === "number") {
        awTempEl.dataset.tempC = String(data.temperature);
        awTempEl.textContent = formatTemperature(parseFloat(awTempEl.dataset.tempC), currentUnit);
    }
    document.getElementById("awDescription").textContent = data.description || "";
    document.getElementById("awVisibility").textContent = (data.visibility ?? "--") + " km";
    document.getElementById("awWind").textContent = (data.windSpeed ?? "--") + " m/s";
    document.getElementById("awHumidity").textContent = (data.humidity ?? "--") + "%";
    
    // Update unit symbol
    updateUnitSymbols();
}

// Re-render all temperatures from baseline Celsius stored in data attributes
function renderAllTemperatures() {
    // Provider cards (separate unit spans)
    ["owTemp", "waTemp", "awTemp"].forEach(id => {
        const el = document.getElementById(id);
        if (el && el.dataset.tempC) {
            el.textContent = formatTemperature(parseFloat(el.dataset.tempC), currentUnit);
        }
    });
    updateUnitSymbols();

    // Hourly and weekly forecast cards (unit included in text)
    document.querySelectorAll(".hourly-card .temp, .weekly-card .temp").forEach(el => {
        const base = el.dataset.tempC;
        if (base !== undefined) {
            const val = formatTemperature(parseFloat(base), currentUnit);
            el.textContent = `${val}${getUnitSuffix()}`;
        }
    });
}

// Create comparison chart
function createComparisonChart(owData, waData) {
    const ctx = document.getElementById("temperatureChart").getContext("2d");
    
    if (chart) {
        chart.destroy();
    }
    
    const labels = [];
    const owTemps = [];
    const waTemps = [];
    
    for (let i = 0; i < 24; i++) {
        const hour = new Date();
        hour.setHours(hour.getHours() + i);
        labels.push(hour.getHours() + ":00");
        
        const baseTemp = 20;
        const variation = Math.sin(i * Math.PI / 12) * 5;
        owTemps.push(Math.round(baseTemp + variation + Math.random() * 2));
        waTemps.push(Math.round(baseTemp + variation + Math.random() * 2 - 1));
    }
    
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "OpenWeatherMap",
                    data: owTemps,
                    borderColor: "#74b9ff",
                    backgroundColor: "rgba(116, 185, 255, 0.1)",
                    tension: 0.4
                },
                {
                    label: "WeatherAPI",
                    data: waTemps,
                    borderColor: "#00b894",
                    backgroundColor: "rgba(0, 184, 148, 0.1)",
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "white"
                    },
                    grid: {
                        color: "rgba(255, 255, 255, 0.1)"
                    }
                },
                y: {
                    ticks: {
                        color: "white"
                    },
                    grid: {
                        color: "rgba(255, 255, 255, 0.1)"
                    }
                }
            }
        }
    });
}

// Display hourly forecast
function displayHourlyForecast(omData) {
    const container = document.getElementById("hourlyForecast");
    container.innerHTML = "";
    
    if (!omData || !omData.hours || !Array.isArray(omData.hours.time)) {
        return;
    }

    const times = omData.hours.time;            // array of timestamps
    const temps = omData.hours.temperature_2m;  // array of temps (C)
    const codes = omData.hours.weathercode;     // array of weather codes

    for (let i = 0; i < Math.min(24, times.length); i += 3) {
        const hourISO = times[i];
        const d = new Date(hourISO);
        const hourText = isNaN(d.getTime()) ? hourISO.toString().slice(11,16) : `${String(d.getHours()).padStart(2,'0')}:00`;
        const tempC = typeof temps?.[i] === "number" ? temps[i] : null;
        const code = codes?.[i];

        const card = document.createElement("div");
        card.className = "hourly-card";
        card.innerHTML = `
            <h4>${hourText}</h4>
            <div class="weather-icon">
                <i class="${getWeatherIcon(code, "openmeteo")}"></i>
            </div>
            <div class="temp" ${tempC !== null ? `data-temp-c="${tempC}"` : ""}></div>
            <p></p>
        `;
        container.appendChild(card);
    }
    renderAllTemperatures();
}

// Display 7-day forecast
function displayWeeklyForecast(omData) {
    const container = document.getElementById("weeklyForecast");
    container.innerHTML = "";
    
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    if (!omData || !omData.days || !Array.isArray(omData.days.time)) {
        return;
    }

    const times = omData.days.time;               // ISO dates
    const tempsMax = omData.days.temperature_2m_max; // C
    const codes = omData.days.weathercode;          // codes

    const count = Math.min(7, times.length);
    for (let i = 0; i < count; i++) {
        const iso = times[i];
        const date = new Date(iso);
        const label = isNaN(date.getTime()) ? iso : days[date.getDay()];
        const tempC = typeof tempsMax?.[i] === "number" ? tempsMax[i] : null;
        const code = codes?.[i];

        const card = document.createElement("div");
        card.className = "weekly-card";
        card.innerHTML = `
            <h4>${label}</h4>
            <div class="weather-icon">
                <i class="${getWeatherIcon(code, "openmeteo")}"></i>
            </div>
            <div class="temp" ${tempC !== null ? `data-temp-c="${tempC}"` : ""}></div>
            <p></p>
        `;
        container.appendChild(card);
    }
    renderAllTemperatures();
}

// Main function to fetch and display all weather data
async function fetchAllWeatherData(city) {
    try {
        showLoading();
        hideError();
        
        currentCity = city;
        document.getElementById("cityName").textContent = city;
        
        const [owData, waData, omData] = await Promise.all([
            fetchOpenWeatherMap(city),
            fetchWeatherAPI(city),
            fetchOpenMeteo(city)
        ]);
        
        displayOpenWeatherMapData(owData);
        displayWeatherAPIData(waData);
        displayOpenMeteoData(omData);
        
        createComparisonChart(owData, waData);
        
        displayHourlyForecast(omData);
        displayWeeklyForecast(omData);
        
        if (owData) {
            changeBackground(owData.weather[0].icon.substring(0, 2), owData.main.temp, owData.weather[0].description);
        }
        
        hideLoading();
        
    } catch (error) {
        showError("Sorry, could not fetch weather data. Please check your API keys and try again.");
        console.error("Error:", error);
    }
}

// Enhanced Geolocation function with fallback
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async function(position) {
                try {
                    showLoading();
                    hideError();
                    
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    
                    // Reverse geocode via OpenWeatherMap to get city name, then feed Open-Meteo
                    
                    // Fallback to OpenWeatherMap if API key is available
                    if (API_KEYS.openweathermap && API_KEYS.openweathermap !== "YOUR_OPENWEATHERMAP_KEY_HERE") {
                        const response = await fetch(
                            `${API_URLS.openweathermap}weather?lat=${lat}&lon=${lon}&appid=${API_KEYS.openweathermap}&units=metric`
                        );
                        
                        if (response.ok) {
                            const data = await response.json();
                            await fetchAllWeatherData(data.name);
                            return;
                        }
                    }
                    
                    // If both fail, show error
                    throw new Error("Could not get weather for your location");
                    
                } catch (error) {
                    showError("Sorry, could not get weather for your location. Please search for a city manually.");
                    console.error("Error:", error);
                }
            },
            function(error) {
                let errorMessage = "Sorry, could not access your location. Please search for a city instead.";
                
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location access denied. Please allow location access or search for a city.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information unavailable. Please search for a city.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out. Please search for a city.";
                        break;
                }
                
                showError(errorMessage);
                console.error("Geolocation error:", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    } else {
        showError("Geolocation is not supported by this browser. Please search for a city.");
    }
}

// Enhanced Favorites functionality
function addToFavorites() {
    if (!currentCity) {
        showError("Please search for a city first before adding to favorites.");
        return;
    }
    
    if (!favorites.includes(currentCity)) {
        favorites.push(currentCity);
        localStorage.setItem("weatherFavorites", JSON.stringify(favorites));
        updateFavoritesDisplay();
        
        // Show success feedback
        const btn = document.getElementById("addToFavorites");
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Added!';
        btn.style.background = 'rgba(0, 184, 148, 0.3)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
        
        console.log(`Added "${currentCity}" to favorites`);
    } else {
        showError(`${currentCity} is already in your favorites!`);
    }
}

function removeFromFavorites(city) {
    favorites = favorites.filter(fav => fav !== city);
    localStorage.setItem("weatherFavorites", JSON.stringify(favorites));
    updateFavoritesDisplay();
    console.log(`Removed "${city}" from favorites`);
}

function updateFavoritesDisplay() {
    const container = document.getElementById("favoritesList");
    if (!container) {
        console.error("Favorites container not found!");
        return;
    }
    
    container.innerHTML = "";
    
    if (favorites.length === 0) {
        container.innerHTML = '<p style="text-align: center; opacity: 0.7; padding: 20px;">No favorite cities yet. Search for a city and add it to favorites!</p>';
        return;
    }
    
    favorites.forEach(city => {
        const item = document.createElement("div");
        item.className = "favorite-item";
        item.innerHTML = `
            <span>${city}</span>
            <div>
                <button onclick="fetchAllWeatherData('${city}')" class="load-btn">Load</button>
                <button onclick="removeFromFavorites('${city}')" class="remove-btn">Remove</button>
            </div>
        `;
        container.appendChild(item);
    });
}

// Update unit symbols in the UI
function updateUnitSymbols() {
    const unitSymbols = document.querySelectorAll(".unit");
    unitSymbols.forEach(symbol => {
        if (currentUnit === "fahrenheit") {
            symbol.textContent = "°F";
        } else if (currentUnit === "kelvin") {
            symbol.textContent = "K";
        } else {
            symbol.textContent = "°C";
        }
    });
}

// Temperature unit change
function changeTemperatureUnit(unit) {
    currentUnit = unit;
    
    document.querySelectorAll(".unit-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    document.querySelector(`[data-unit="${unit}"]`).classList.add("active");
    
    // Re-render all temps from baselines
    renderAllTemperatures();
    
    if (chart) {
        createComparisonChart(null, null);
    }
}

// Event handlers
function handleSearch() {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();
    
    if (city === "") {
        showError("Please enter a city name");
        return;
    }
    
    fetchAllWeatherData(city);
}

function handleEnterKey(event) {
    if (event.key === "Enter") {
        handleSearch();
    }
}

// Initialize app
document.addEventListener("DOMContentLoaded", function() {
    console.log("Initializing Weather App...");
    
    // Check if all required elements exist
    const requiredElements = [
        "searchButton", "locationButton", "cityInput", "addToFavorites", 
        "favoritesBtn", "closeFavorites", "favoritesModal", "favoritesList"
    ];
    
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    if (missingElements.length > 0) {
        console.error("Missing elements:", missingElements);
    }
    
    // Event listeners
    document.getElementById("searchButton").addEventListener("click", handleSearch);
    document.getElementById("locationButton").addEventListener("click", getUserLocation);
    document.getElementById("cityInput").addEventListener("keypress", handleEnterKey);
    document.getElementById("addToFavorites").addEventListener("click", addToFavorites);
    document.getElementById("favoritesBtn").addEventListener("click", () => {
        document.getElementById("favoritesModal").style.display = "block";
        console.log("Opening favorites modal");
    });
    document.getElementById("closeFavorites").addEventListener("click", () => {
        document.getElementById("favoritesModal").style.display = "none";
        console.log("Closing favorites modal");
    });
    
    document.querySelectorAll(".unit-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            changeTemperatureUnit(btn.dataset.unit);
        });
    });
    
    window.addEventListener("click", (event) => {
        const modal = document.getElementById("favoritesModal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
    
    updateFavoritesDisplay();
    
    console.log("Enhanced Weather App loaded successfully!");
    console.log("Available APIs:");
    console.log("- Visual Crossing: FREE (no API key needed)");
    console.log("- OpenWeatherMap: Requires API key");
    console.log("- WeatherAPI: Requires API key");
    console.log("Favorites count:", favorites.length);
});
