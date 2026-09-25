/* =========================================================
   PAKISTAN WEB GIS
   Cities GIS Layer
   ========================================================= */


/* =========================================================
   1. CUSTOM CITY MARKER
   ========================================================= */

const cityIcon = L.divIcon({
    className: "city-marker",

    html: `
        <div class="city-marker-inner">
            <span>●</span>
        </div>
    `,

    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
});
/* =========================================================
   CITY LOCATION PANEL
   ========================================================= */

function updateSelectedCityPanel(
    properties,
    latlng
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


    /* -----------------------------------------
       City information
    ----------------------------------------- */

    if (nameElement) {

        nameElement.textContent =
            properties.name;
    }


    if (subtitleElement) {

        subtitleElement.textContent =
            "City information selected from the map.";
    }


    if (provinceElement) {

        provinceElement.textContent =
            properties.province || "—";
    }


    if (typeElement) {

        typeElement.textContent =
            properties.type || "—";
    }


    /* -----------------------------------------
       Weather fields
       Not available for city selection yet
    ----------------------------------------- */

    if (temperatureElement) {
        temperatureElement.textContent = "—";
    }

    if (humidityElement) {
        humidityElement.textContent = "—";
    }

    if (precipitationElement) {
        precipitationElement.textContent = "—";
    }

    if (windElement) {
        windElement.textContent = "—";
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

/* =========================================================
   2. CITY POPUP
   ========================================================= */

function createCityPopup(properties) {

    return `
        <div class="city-popup">

            <div class="popup-title">
                <span class="popup-icon">🏙️</span>
                <strong>${properties.name}</strong>
            </div>

            <div class="popup-row">
                <span class="popup-label">
                    Province / Region
                </span>

                <span class="popup-value">
                    ${properties.province}
                </span>
            </div>

            <div class="popup-row">
                <span class="popup-label">
                    City Type
                </span>

                <span class="popup-value">
                    ${properties.type}
                </span>
            </div>

        </div>
    `;
}


/* =========================================================
   3. CITY SEARCH DATA
   ========================================================= */

let citySearchData = [];


/* =========================================================
   4. CITY LAYER
   ========================================================= */

let citiesLayer;


/* =========================================================
   5. LOAD CITY GEOJSON
   ========================================================= */

fetch("data/cities.geojson")

    .then(response => {

        if (!response.ok) {
            throw new Error(
                "Unable to load cities.geojson"
            );
        }

        return response.json();
    })

    .then(data => {

        /* -----------------------------------------
        Create city layer
        ----------------------------------------- */
citiesLayer = L.geoJSON(data, {

    pointToLayer: function (feature, latlng) {

        return L.marker(
            latlng,
            {
                icon: cityIcon
            }
        );
    },


    onEachFeature: function (feature, layer) {

        const properties =
            feature.properties;


        layer.bindPopup(
            createCityPopup(properties),
            {
                maxWidth: 300,
                className: "custom-city-popup"
            }
        );


        layer.on(
            "click",
            function () {

                updateSelectedCityPanel(
                    properties,
                    layer.getLatLng()
                );

            }
        );

    }

});
        /* -----------------------------------------
        Add cities to map
        ----------------------------------------- */

        citiesLayer.addTo(map);


        /* -----------------------------------------
           Add Cities to Layer Control
        ----------------------------------------- */

        registerOverlayLayer(
            "Cities",
            citiesLayer
        );


        /* -----------------------------------------
           Console message
        ----------------------------------------- */

        console.log(
            `Cities loaded successfully: ${data.features.length}`
        );


        /* -----------------------------------------
           Update statistics
        ----------------------------------------- */

        updateCityCount(
            data.features.length
        );

        updateProvinceCount(
            data.features
        );


        /* -----------------------------------------
           Prepare city search
        ----------------------------------------- */

        prepareCitySearch(
            data.features
        );

    })

    .catch(error => {

        console.error(
            "Error loading city data:",
            error
        );

    });


/* =========================================================
   6. UPDATE CITY COUNT
   ========================================================= */

function updateCityCount(count) {

    const cityCountElement =
        document.getElementById(
            "city-count"
        );

    if (cityCountElement) {

        cityCountElement.textContent =
            count;
    }
}


/* =========================================================
   7. UPDATE PROVINCE COUNT
   ========================================================= */

function updateProvinceCount(features) {

    const provinces = new Set();


    features.forEach(feature => {

        if (
            feature.properties &&
            feature.properties.province
        ) {

            provinces.add(
                feature.properties.province
            );
        }

    });


    const provinceCountElement =
        document.getElementById(
            "province-count"
        );


    if (provinceCountElement) {

        provinceCountElement.textContent =
            provinces.size;
    }
}


/* =========================================================
   8. PREPARE CITY SEARCH
   ========================================================= */

function prepareCitySearch(features) {

    citySearchData =
        features.map(feature => {

            return {

                name:
                    feature.properties.name,

                province:
                    feature.properties.province,

                type:
                    feature.properties.type,

                layer:
                    findCityLayer(
                        feature.properties.name
                    )

            };

        });


    console.log(
        `City search ready: ${citySearchData.length} cities`
    );
}


/* =========================================================
   9. FIND CITY LAYER
   ========================================================= */

function findCityLayer(cityName) {

    let foundLayer = null;


    if (!citiesLayer) {
        return null;
    }


    citiesLayer.eachLayer(layer => {

        if (
            layer.feature &&
            layer.feature.properties &&
            layer.feature.properties.name ===
            cityName
        ) {

            foundLayer = layer;
        }

    });


    return foundLayer;
}


/* =========================================================
   10. SEARCH ELEMENTS
   ========================================================= */

const citySearchInput =
    document.getElementById(
        "city-search"
    );


const searchResults =
    document.getElementById(
        "search-results"
    );


const clearSearchButton =
    document.getElementById(
        "clear-search"
    );


/* =========================================================
   11. CITY SEARCH INPUT
   ========================================================= */

if (citySearchInput) {

    citySearchInput.addEventListener(
        "input",
        function () {

            const query =
                this.value
                    .trim()
                    .toLowerCase();


            /* Show / hide clear button */

            if (clearSearchButton) {

                clearSearchButton.style.display =
                    query
                        ? "block"
                        : "none";
            }


            /* Empty search */

            if (!query) {

                if (searchResults) {

                    searchResults.style.display =
                        "none";
                }

                return;
            }


            /* Search cities */

            const matches =
                citySearchData
                    .filter(city =>
                        city.name
                            .toLowerCase()
                            .includes(query)
                    )
                    .slice(0, 6);


            displaySearchResults(
                matches
            );

        }
    );
}


/* =========================================================
   12. DISPLAY SEARCH RESULTS
   ========================================================= */

function displaySearchResults(matches) {

    if (!searchResults) {
        return;
    }


    /* No results */

    if (!matches.length) {

        searchResults.innerHTML = `
            <div class="search-no-result">
                No matching city found.
            </div>
        `;

        searchResults.style.display =
            "block";

        return;
    }


    /* Results */

    searchResults.innerHTML =
        matches
            .map((city, index) => {

                return `
                    <div
                        class="search-result"
                        data-index="${index}"
                    >

                        <div>

                            <div class="search-result-name">
                                🏙️ ${city.name}
                            </div>

                            <div class="search-result-province">
                                ${city.province}
                            </div>

                        </div>

                        <span>→</span>

                    </div>
                `;

            })
            .join("");


    searchResults.style.display =
        "block";


    /* Add click events */

    document
        .querySelectorAll(
            ".search-result"
        )
        .forEach(result => {

            result.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            this.dataset.index
                        );


                    selectCity(
                        matches[index]
                    );

                }
            );

        });
}


/* =========================================================
   13. SELECT CITY
   ========================================================= */

function selectCity(city) {

    if (!city || !city.layer) {

        console.warn(
            "City layer not found:",
            city
        );

        return;
    }


    const latLng =
        city.layer.getLatLng();


    /* Zoom to city */

    map.setView(
        latLng,
        10,
        {
            animate: true
        }
    );


    /* Open popup */

    setTimeout(() => {

        city.layer.openPopup();

    }, 500);


    /* Update search input */

    if (citySearchInput) {

        citySearchInput.value =
            city.name;
    }


    /* Hide results */

    if (searchResults) {

        searchResults.style.display =
            "none";
    }


    /* Keep clear button visible */

    if (clearSearchButton) {

        clearSearchButton.style.display =
            "block";
    }
}


/* =========================================================
   14. CLEAR SEARCH
   ========================================================= */

if (clearSearchButton) {

    clearSearchButton.addEventListener(
        "click",
        function () {

            if (citySearchInput) {

                citySearchInput.value =
                    "";
            }


            if (searchResults) {

                searchResults.style.display =
                    "none";
            }


            clearSearchButton.style.display =
                "none";


            if (citySearchInput) {

                citySearchInput.focus();
            }

        }
    );
}
/* =========================================================
   SHOW ALL CITIES
   ========================================================= */

const showAllCitiesButton =
    document.getElementById(
        "show-all-cities"
    );

if (showAllCitiesButton) {

    showAllCitiesButton.addEventListener(
        "click",
        function () {

            if (!citiesLayer) {
                return;
            }

            map.fitBounds(
                citiesLayer.getBounds(),
                {
                    padding: [30, 30]
                }
            );

            const searchInput =
                document.getElementById(
                    "city-search"
                );

            const searchResults =
                document.getElementById(
                    "search-results"
                );

            if (searchInput) {
                searchInput.value = "";
            }

            if (searchResults) {
                searchResults.innerHTML = "";
            }

        }
    );

}