# 🇵🇰 Pakistan Web GIS

## Interactive Cities & Weather Monitoring System

A web-based Geographic Information System (Web GIS) developed to visualize major cities and weather stations across Pakistan using interactive maps, live weather information, and geospatial datasets.

---

## 🌐 Project Overview

Pakistan Web GIS is an interactive mapping application that combines geographic data with live weather information.

The system allows users to:

- Explore cities across Pakistan
- View weather stations on an interactive map
- Switch between OpenStreetMap and satellite imagery
- Search for individual cities
- View city and weather information through popups
- Select locations and view detailed information
- Monitor live weather conditions
- Compare temperature and precipitation
- Reset the map view
- Display all mapped cities
- Use the application on desktop and mobile devices

---

## ✨ Main Features

### 🗺️ Interactive Web Map

The application provides an interactive Leaflet map centered on Pakistan.

Users can:

- Zoom in and out
- Pan across the map
- Select geographic locations
- Switch map layers
- Toggle city and weather-station layers

### 🏙️ City Mapping

The project contains 20 mapped cities with attributes including:

- City name
- Province / region
- City type
- Geographic coordinates

### 🌦️ Weather Stations

The project contains 20 weather-station locations.

Weather information includes:

- Temperature
- Relative humidity
- Precipitation
- Wind speed
- Wind direction
- Weather condition

### 🔎 City Search

Users can search for a mapped city using the city search box.

Selecting a search result automatically focuses the map on the selected location.

### 📊 Weather Dashboard

The dashboard provides a summary of current weather conditions including:

- Average temperature
- Highest temperature
- Lowest temperature
- Average precipitation
- Hottest location
- Coolest location

### 📈 Weather Analysis

The weather analysis section provides an interactive Chart.js visualization.

Users can switch between:

- Temperature
- Precipitation

to compare weather conditions across mapped stations.

### 📍 Selected Location Panel

Clicking a city or weather station displays detailed information in the selected-location panel.

The panel shows:

- Location name
- Province / region
- Location type
- Temperature
- Humidity
- Precipitation
- Wind speed
- Geographic coordinates

### 🛰️ Multiple Basemaps

The application provides two basemap options:

1. OpenStreetMap
2. Esri World Imagery

### 📱 Responsive Design

The interface is designed to work across:

- Desktop computers
- Laptops
- Tablets
- Mobile devices

---

## 🧰 Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Web page structure |
| CSS3 | Interface design and responsive layout |
| JavaScript | Application logic and interaction |
| Leaflet.js | Interactive web mapping |
| GeoJSON | Geographic data format |
| Chart.js | Weather data visualization |
| Open-Meteo API | Live weather data |
| OpenStreetMap | Map basemap |
| Esri World Imagery | Satellite basemap |

---

## 📂 Project Structure

```text
Interactive_WEB
│
├── css
│   └── style.css
│
├── data
│   ├── cities.geojson
│   └── weather-stations.geojson
│
├── images
│   └── logo.png
│
├── js
│   ├── cities.js
│   ├── map.js
│   └── weather.js
│
├── index.html
└── README.md