const map = L.map("map", {
    center: [30.3753, 69.3451],
    zoom: 5,
    minZoom: 4,
    maxZoom: 18,
    zoomControl: true
});

const osmLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }
);

const satelliteLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        maxZoom: 19,
        attribution: "Tiles &copy; Esri"
    }
);

osmLayer.addTo(map);

const baseMaps = {
    "OpenStreetMap": osmLayer,
    "Satellite Imagery": satelliteLayer
};

const overlayMaps = {};

const layerControl = L.control.layers(
    baseMaps,
    overlayMaps,
    {
        collapsed: false,
        position: "topright"
    }
).addTo(map);

function registerOverlayLayer(name, layer) {
    layerControl.addOverlay(layer, name);
}

const resetButton = document.getElementById("reset-map");

resetButton.addEventListener("click", function () {
    map.setView([30.3753, 69.3451], 5);
});
// Map Legend
const legend = L.control({
    position: "bottomleft"
});

legend.onAdd = function () {
    const div = L.DomUtil.create("div", "map-legend");

    div.innerHTML = `
        <div class="legend-title">Map Legend</div>

        <div class="legend-item">
            <span class="legend-city">●</span>
            <span>City</span>
        </div>

        <div class="legend-item">
            <span class="legend-weather">☁</span>
            <span>Weather Station</span>
        </div>
    `;

    return div;
};

legend.addTo(map);
