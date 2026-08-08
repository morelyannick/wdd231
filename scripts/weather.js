// ===================================
// ABIDJAN CHAMBER OF COMMERCE
// Weather Module
// ===================================

const WeatherModule = {
    // API key for OpenWeatherMap (Free tier)
    API_KEY: "302d10f518679491f653175d8c71f123",
    CITY: "Abidjan",
    COUNTRY_CODE: "CI",

    // Initialize weather display
    async init() {
        try {
            const weatherContainer = document.getElementById("weather");
            if (!weatherContainer) {
                console.log("Weather container not found, skipping weather module");
                return;
            }

            // Get weather from localStorage first (cache for 1 hour)
            const cachedWeather = this.getFromCache();
            if (cachedWeather) {
                this.displayWeather(cachedWeather);
                return;
            }

            // If no cache or API key not set, display demo weather
            this.displayDemoWeather();
        } catch (error) {
            console.error("Weather module error:", error);
            this.displayDemoWeather();
        }
    },

    // Fetch weather from API
    async fetchWeather() {
        try {
            if (this.API_KEY === "YOUR_API_KEY_HERE") {
                console.log(
                    "API key not configured, using demo weather. Visit openweathermap.org to get a free API key."
                );
                return null;
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.CITY},${this.COUNTRY_CODE}&appid=${this.API_KEY}&units=metric&lang=en`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching weather:", error);
            return null;
        }
    },

    // Display weather data
    displayWeather(data) {
        const weatherContainer = document.getElementById("weather");
        if (!weatherContainer) return;

        const temp = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        const description = data.weather[0].description;
        const feelsLike = Math.round(data.main.feels_like);
        const windSpeed = Math.round(data.wind.speed);

        const weatherHTML = `
      <div class="weather-item">
        <div class="label">Temperature</div>
        <div class="value">${temp}&deg;C</div>
        <div class="description">${description}</div>
      </div>
      <div class="weather-item">
        <div class="label">Feels Like</div>
        <div class="value">${feelsLike}&deg;C</div>
        <div class="description">Apparent temperature</div>
      </div>
      <div class="weather-item">
        <div class="label">Humidity</div>
        <div class="value">${humidity}%</div>
        <div class="description">Relative humidity</div>
      </div>
      <div class="weather-item">
        <div class="label">Wind</div>
        <div class="value">${windSpeed} km/h</div>
        <div class="description">Wind speed</div>
      </div>
    `;

        weatherContainer.innerHTML = weatherHTML;

        // Save to cache
        this.saveToCache(data);
    },

    // Display demo weather for Abidjan
    displayDemoWeather() {
        const weatherContainer = document.getElementById("weather");
        if (!weatherContainer) return;

        // Demo data: Typical Abidjan weather
        const weatherHTML = `
      <div class="weather-item">
        <div class="label">Temperature</div>
        <div class="value">28&deg;C</div>
        <div class="description">Cloudy</div>
      </div>
      <div class="weather-item">
        <div class="label">Feels Like</div>
        <div class="value">32&deg;C</div>
        <div class="description">Apparent temperature</div>
      </div>
      <div class="weather-item">
        <div class="label">Humidity</div>
        <div class="value">72%</div>
        <div class="description">Relative humidity</div>
      </div>
      <div class="weather-item">
        <div class="label">Wind</div>
        <div class="value">15 km/h</div>
        <div class="description">Ocean breeze</div>
      </div>
    `;

        weatherContainer.innerHTML = weatherHTML;
    },

    // Cache management (1 hour = 3600000 ms)
    CACHE_DURATION: 3600000,

    saveToCache(data) {
        try {
            localStorage.setItem(
                "abidjanWeather",
                JSON.stringify({
                    data: data,
                    timestamp: new Date().getTime(),
                })
            );
        } catch (error) {
            console.error("Error saving to cache:", error);
        }
    },

    getFromCache() {
        try {
            const cached = localStorage.getItem("abidjanWeather");
            if (!cached) return null;

            const { data, timestamp } = JSON.parse(cached);
            const now = new Date().getTime();

            // Check if cache is still valid
            if (now - timestamp < this.CACHE_DURATION) {
                return data;
            }

            // Cache expired
            localStorage.removeItem("abidjanWeather");
            return null;
        } catch (error) {
            console.error("Error reading cache:", error);
            return null;
        }
    },
};

// Initialize weather module when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    WeatherModule.init();
});
