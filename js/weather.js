// ==========================================
// REAL-TIME WEATHER SYSTEM
// Data source: Open-Meteo API
// ==========================================
/* =========================================================
WEATHER DATA CACHE
   ========================================================= */
const weatherCache = new Map();
const weatherIcon = L.divIcon({
    className: "weather-marker",
    html: `
        <div class="weather-marker-inner">
            <span>☁</span>
        </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
});


// ==========================================
// WEATHER CONDITION
// ==========================================

function getWeatherCondition(code) {

    const conditions = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Slight snow",
        73: "Moderate snow",
        75: "Heavy snow",
        80: "Rain showers",
        81: "Moderate rain showers",
        82: "Heavy rain showers",
        95: "Thunderstorm",
        96: "Thunderstorm with hail",
        99: "Thunderstorm with heavy hail"
    };

    return conditions[code] || "Unknown conditions";
}


// ==========================================
// WEATHER ICON
// ==========================================

function getWeatherEmoji(code) {

    if (code === 0) return "☀️";
    if (code === 1) return "🌤️";
    if (code === 2) return "⛅";
    if (code === 3) return "☁️";

    if ([45, 48].includes(code)) return "🌫️";

    if ([51, 53, 55].includes(code)) return "🌦️";

    if ([61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";

    if ([71, 73, 75].includes(code)) return "❄️";

    if ([95, 96, 99].includes(code)) return "⛈️";

    return "🌦️";
}

// ==========================================
// SELECTED WEATHER LOCATION PANEL
// ==========================================

function updateSelectedWeatherPanel(
    properties,
    latlng,
    weather
) {

    const nameElement =
        document.getElementById(
            "selected-location-name"
        );

    const subtitleElement =
        document.getElementById(
            "selected-location-subtitle"
        );

    const provinceElement =
        document.getElementById(
            "selected-province"
        );

    const typeElement =
        document.getElementById(
            "selected-type"
        );

    const temperatureElement =
        document.getElementById(
            "selected-temperature"
        );

    const humidityElement =
        document.getElementById(
            "selected-humidity"
        );

    const precipitationElement =
        document.getElementById(
            "selected-precipitation"
        );

    const windElement =
        document.getElementById(
            "selected-wind"
        );

    const coordinatesElement =
        document.getElementById(
            "selected-coordinates"
        );


    const current =
        weather.current;


    /* -----------------------------------------
    Station information
    ----------------------------------------- */

    if (nameElement) {

        nameElement.textContent =
            properties.name;
    }


    if (subtitleElement) {

        subtitleElement.textContent =
            "Live weather information from Open-Meteo.";
    }


    if (provinceElement) {

        provinceElement.textContent =
            "Weather Station";
    }


    if (typeElement) {

        typeElement.textContent =
            "Live Monitoring";
    }


    /* -----------------------------------------
    Live weather
    ----------------------------------------- */

    if (temperatureElement) {

        temperatureElement.textContent =
            `${current.temperature_2m} °C`;
    }


    if (humidityElement) {

        humidityElement.textContent =
            `${current.relative_humidity_2m} %`;
    }


    if (precipitationElement) {

        precipitationElement.textContent =
            `${current.precipitation} mm`;
    }


    if (windElement) {

        windElement.textContent =
            `${current.wind_speed_10m} km/h`;
    }


    /* -----------------------------------------
    Coordinates
    ----------------------------------------- */

    if (coordinatesElement) {

        coordinatesElement.textContent =
            `${latlng.lat.toFixed(4)}° N, ` +
            `${latlng.lng.toFixed(4)}° E`;
    }

}
// ==========================================
// WEATHER POPUP
// ==========================================

function createWeatherPopup(properties, weather) {

    const current = weather.current;

    const temperature = current.temperature_2m;
    const humidity = current.relative_humidity_2m;
    const precipitation = current.precipitation;
    const windSpeed = current.wind_speed_10m;
    const windDirection = current.wind_direction_10m;
    const weatherCode = current.weather_code;

    const condition = getWeatherCondition(weatherCode);
    const emoji = getWeatherEmoji(weatherCode);

    return `
        <div class="weather-popup">
        <div class="live-weather-badge">
    <span class="live-dot"></span>
    LIVE WEATHER
</div>
            <div class="weather-popup-title">
                <span class="weather-popup-icon">${emoji}</span>

                <div>
                    <strong>${properties.name}</strong>

                    <small class="weather-condition">
                        ${condition}
                    </small>
                </div>
            </div>


            <div class="weather-data">

                <div class="weather-data-item">
                    <span class="weather-data-icon">🌡️</span>

                    <div>
                        <span class="weather-label">
                            Temperature
                        </span>

                        <strong class="weather-value">
                            ${temperature} °C
                        </strong>
                    </div>
                </div>


                <div class="weather-data-item">
                    <span class="weather-data-icon">💧</span>

                    <div>
                        <span class="weather-label">
                            Humidity
                        </span>

                        <strong class="weather-value">
                            ${humidity} %
                        </strong>
                    </div>
                </div>


                <div class="weather-data-item">
                    <span class="weather-data-icon">🌧️</span>

                    <div>
                        <span class="weather-label">
                            Precipitation
                        </span>

                        <strong class="weather-value">
                            ${precipitation} mm
                        </strong>
                    </div>
                </div>


                <div class="weather-data-item">
                    <span class="weather-data-icon">💨</span>

                    <div>
                        <span class="weather-label">
                            Wind Speed
                        </span>

                        <strong class="weather-value">
                            ${windSpeed} km/h
                        </strong>
                    </div>
                </div>


                <div class="weather-data-item">
                    <span class="weather-data-icon">🧭</span>

                    <div>
                        <span class="weather-label">
                            Wind Direction
                        </span>

                        <strong class="weather-value">
                            ${windDirection}°
                        </strong>
                    </div>
                </div>


                <div class="weather-data-item">
                    <span class="weather-data-icon">☁️</span>

                    <div>
                        <span class="weather-label">
                            Conditions
                        </span>

                        <strong class="weather-value">
                            ${condition}
                        </strong>
                    </div>
                </div>

            </div>


            <div class="weather-source">

                <span>● Live weather data</span>

                <span>
                    Source:
                    <a
                        href="https://open-meteo.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open-Meteo
                    </a>
                </span>

            </div>

        </div>
    `;
}


// ==========================================
// LOAD WEATHER FROM API
// ==========================================

async function getWeatherData(
    latitude,
    longitude
) {

    const cacheKey =
        `${latitude.toFixed(4)},${longitude.toFixed(4)}`;

    /* Return cached data if available */
    if (weatherCache.has(cacheKey)) {

        return weatherCache.get(cacheKey);

    }

    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m` +
        `&temperature_unit=celsius` +
        `&wind_speed_unit=kmh` +
        `&precipitation_unit=mm` +
        `&timezone=auto`;

    const response =
        await fetch(url);

    if (!response.ok) {

        throw new Error(
            "Weather API request failed."
        );

    }

    const data =
        await response.json();

    /* Store result in cache */
    weatherCache.set(
        cacheKey,
        data
    );

    return data;
}

// ==========================================
// WEATHER STATION LAYER
// ==========================================

let weatherStationsLayer;

fetch("data/weather-stations.geojson")

    .then(response => {

        if (!response.ok) {
            throw new Error(
                "Unable to load weather-stations.geojson"
            );
        }

        return response.json();
    })

    .then(async data => {

        weatherStationsLayer = L.geoJSON(data, {

            pointToLayer: function (feature, latlng) {

                const offsetLatLng = L.latLng(
                    latlng.lat + 0.08,
                    latlng.lng + 0.08
                );

                return L.marker(offsetLatLng, {
                    icon: weatherIcon
                });
            },


            onEachFeature: async function (feature, layer) {

    const properties =
        feature.properties;


    /* -----------------------------------------
    Temporary popup while API loads
    ----------------------------------------- */

    layer.bindPopup(`
        <div class="weather-loading">

            <strong>
                Loading weather...
            </strong>

            <span>
                Please wait.
            </span>

        </div>
    `, {
        maxWidth: 340,
        className: "custom-weather-popup"
    });


    /* -----------------------------------------
    Get original GeoJSON coordinates
    ----------------------------------------- */

    const [
        longitude,
        latitude
    ] =
        feature.geometry.coordinates;


    try {

        /* -------------------------------------
        Get live weather
        ------------------------------------- */

        const weather =
            await getWeatherData(
                latitude,
                longitude
            );


        /* -------------------------------------
        Update popup
        ------------------------------------- */

        layer.setPopupContent(
            createWeatherPopup(
                properties,
                weather
            )
        );


        /* -------------------------------------
        Update selected location panel
        when marker is clicked
        ------------------------------------- */

        layer.on(
            "click",
            function () {

                updateSelectedWeatherPanel(
    properties,
    L.latLng(
        latitude,
        longitude
    ),
    weather
    );

            }
        );


    } catch (error) {

        console.error(
            `Weather error for ${properties.name}:`,
            error
        );


        layer.setPopupContent(`
            <div class="weather-error">

                <strong>
                    Weather data unavailable
                </strong>

                <p>
                    Unable to retrieve current
                    weather information.
                </p>

                <small>
                    Please try again later.
                </small>

            </div>
        `);


        /* -------------------------------------
        Still allow station selection
        ------------------------------------- */

        layer.on(
            "click",
            function () {

                const coordinates =
                    layer.getLatLng();


                const nameElement =
                    document.getElementById(
                        "selected-location-name"
                    );


                const subtitleElement =
                    document.getElementById(
                        "selected-location-subtitle"
                    );


                const coordinatesElement =
                    document.getElementById(
                        "selected-coordinates"
                    );


                if (nameElement) {

                    nameElement.textContent =
                        properties.name;
                }


                if (subtitleElement) {

                    subtitleElement.textContent =
                        "Weather data is currently unavailable.";
                }


                if (coordinatesElement) {

                    coordinatesElement.textContent =
                        `${coordinates.lat.toFixed(4)}° N, ` +
                        `${coordinates.lng.toFixed(4)}° E`;
                }

            }
        );

    }

}

        });


        weatherStationsLayer.addTo(map);

        registerOverlayLayer(
            "Weather Stations",
            weatherStationsLayer
        );


        console.log(
            `Weather stations loaded successfully: ${data.features.length}`
        );


        updateWeatherCount(
            data.features.length
        );
        updateWeatherDashboard(data.features);
        loadWeatherAnalysis();
    })
    .catch(error => {

        console.error(
            "Error loading weather station data:",
            error
        );

    });


// ==========================================
// UPDATE WEATHER COUNT
// ==========================================

function updateWeatherCount(count) {

    const stationCountElement =
        document.getElementById("station-count");

    if (stationCountElement) {

        stationCountElement.textContent =
            count;
    }
}
const statusDot =
    document.querySelector(
        ".status-dot"
    );

if (statusDot) {

    statusDot.style.background =
        "#16a34a";

    statusDot.style.boxShadow =
        "0 0 0 4px rgba(22, 163, 74, 0.12)";

    statusDot.style.animation =
        "none";
}
// ==========================================
// WEATHER DASHBOARD STATISTICS
// ==========================================

async function updateWeatherDashboard(features) {

    const temperatures = [];
    const precipitationValues = [];

    let hottest = null;
    let coolest = null;


    for (const feature of features) {

        try {

            const [longitude, latitude] =
                feature.geometry.coordinates;

            const weather =
                await getWeatherData(
                    latitude,
                    longitude
                );

            const current = weather.current;

            const temperature =
                current.temperature_2m;

            const precipitation =
                current.precipitation;

            temperatures.push(temperature);
            precipitationValues.push(precipitation);


            if (!hottest || temperature > hottest.temperature) {

                hottest = {
                    temperature: temperature,
                    name: feature.properties.name
                };
            }


            if (!coolest || temperature < coolest.temperature) {

                coolest = {
                    temperature: temperature,
                    name: feature.properties.name
                };
            }


        } catch (error) {

            console.error(
                `Dashboard weather error for ${feature.properties.name}`,
                error
            );
        }
    }


    if (temperatures.length === 0) {

        document.getElementById(
            "weather-status-text"
        ).textContent = "Weather unavailable";

        return;
    }


    const averageTemperature =
        temperatures.reduce(
            (sum, value) => sum + value,
            0
        ) / temperatures.length;


    const averagePrecipitation =
        precipitationValues.reduce(
            (sum, value) => sum + value,
            0
        ) / precipitationValues.length;


    document.getElementById(
        "average-temperature"
    ).textContent =
        `${averageTemperature.toFixed(1)} °C`;


    document.getElementById(
        "highest-temperature"
    ).textContent =
        `${hottest.temperature.toFixed(1)} °C`;


    document.getElementById(
        "hottest-location"
    ).textContent =
        hottest.name;


    document.getElementById(
        "lowest-temperature"
    ).textContent =
        `${coolest.temperature.toFixed(1)} °C`;


    document.getElementById(
        "coolest-location"
    ).textContent =
        coolest.name;


    document.getElementById(
        "average-precipitation"
    ).textContent =
        `${averagePrecipitation.toFixed(1)} mm`;


    document.getElementById(
        "weather-status-text"
    ).textContent =
        `Updated ${new Date().toLocaleTimeString()}`;
}
/* =========================================================
WEATHER ANALYSIS CHART
   ========================================================= */

let weatherChart = null;


/* =========================================================
STORE WEATHER DATA
   ========================================================= */

let weatherAnalysisData = [];


/* =========================================================
CREATE WEATHER CHART
   ========================================================= */

function createWeatherChart() {

    const canvas =
        document.getElementById("weather-chart");

    const chartType =
        document.getElementById("weather-chart-type");


    if (!canvas || !chartType) {
        return;
    }


    /* Destroy previous chart */

    if (weatherChart) {

        weatherChart.destroy();

        weatherChart = null;
    }


    const metric =
        chartType.value;


    const labels =
        weatherAnalysisData.map(
            station => station.name
        );


    const values =
        weatherAnalysisData.map(
            station =>
                metric === "temperature"
                    ? station.temperature
                    : station.precipitation
        );


    const label =
        metric === "temperature"
            ? "Temperature (°C)"
            : "Precipitation (mm)";


    weatherChart =
        new Chart(
            canvas,
            {
                type: "bar",

                data: {

                    labels: labels,

                    datasets: [

                        {
                            label: label,

                            data: values,

                            borderWidth: 1,

                            borderRadius: 5,

                            backgroundColor:
                                metric === "temperature"
                                    ? "rgba(239, 68, 68, 0.65)"
                                    : "rgba(37, 99, 235, 0.65)",

                            borderColor:
                                metric === "temperature"
                                    ? "rgb(239, 68, 68)"
                                    : "rgb(37, 99, 235)"
                        }

                    ]
                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,


                    interaction: {

                        mode: "index",

                        intersect: false
                    },


                    plugins: {

                        legend: {

                            display: true,

                            position: "top"
                        },


                        tooltip: {

                            callbacks: {

                                label: function(context) {

                                    return `${context.dataset.label}: ${context.parsed.y}`;

                                }

                            }

                        }

                    },


                    scales: {

                        x: {

                            ticks: {

                                maxRotation: 60,

                                minRotation: 45,

                                font: {
                                    size: 9
                                }
                            }

                        },


                        y: {

                            beginAtZero:
                                metric === "precipitation",

                            title: {

                                display: true,

                                text: label
                            }

                        }

                    }

                }

            }
        );
}


/* =========================================================
LOAD WEATHER DATA FOR CHART
   ========================================================= */

async function loadWeatherAnalysis() {

    if (!weatherStationsLayer) {
        console.warn(
            "Weather station layer is not ready yet."
        );

        return;
    }


    const stations = [];


    weatherStationsLayer.eachLayer(
        layer => {

            if (!layer.feature) {
                return;
            }


            stations.push(
                layer.feature
            );

        }
    );


    if (!stations.length) {

        console.warn(
            "No weather stations found."
        );

        return;
    }


    weatherAnalysisData = [];


    for (const station of stations) {

        try {

            const [
                longitude,
                latitude
            ] =
                station.geometry.coordinates;


            const weather =
                await getWeatherData(
                    latitude,
                    longitude
                );


            const current =
                weather.current;


            weatherAnalysisData.push({

                name:
                    station.properties.name,

                temperature:
                    current.temperature_2m,

                precipitation:
                    current.precipitation

            });


        } catch (error) {

            console.error(
                `Chart weather error for ${station.properties.name}:`,
                error
            );

        }

    }


    if (!weatherAnalysisData.length) {

        console.warn(
            "Unable to retrieve weather analysis data."
        );

        return;
    }


    createWeatherChart();


    console.log(
        `Weather chart loaded: ${weatherAnalysisData.length} stations`
    );
}


/* =========================================================
CHART METRIC SWITCH
   ========================================================= */

const weatherChartType =
    document.getElementById(
        "weather-chart-type"
    );


if (weatherChartType) {

    weatherChartType.addEventListener(
        "change",
        function () {

            createWeatherChart();

        }
    );
}
/* =========================================================
   REFRESH WEATHER
   ========================================================= */

const refreshWeatherButton =
    document.getElementById(
        "refresh-weather"
    );

if (refreshWeatherButton) {

    refreshWeatherButton.addEventListener(
        "click",
        async function () {

            refreshWeatherButton.disabled =
                true;

            refreshWeatherButton.textContent =
                "↻ Updating...";

            const statusText =
                document.getElementById(
                    "weather-status-text"
                );

            if (statusText) {
                statusText.textContent =
                    "Refreshing live weather...";
            }

            /* Clear existing cached weather */
            weatherCache.clear();

            /* Reload dashboard */
            if (weatherStationsLayer) {

                const features = [];

                weatherStationsLayer.eachLayer(
                    function (layer) {

                        if (layer.feature) {
                            features.push(
                                layer.feature
                            );
                        }

                    }
                );

                if (features.length) {

                    await updateWeatherDashboard(
                        features
                    );

                }
            }

            /* Reload chart data */
            await loadWeatherAnalysis();

            refreshWeatherButton.disabled =
                false;

            refreshWeatherButton.textContent =
                "↻ Refresh";

        }
    );

}