```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Warren Woodhouse: Mad Max (2015) Interactive Map - Regions</title>
    <link rel="icon" type="image/x-icon" href="https://warrenwoodhouse.blogspot.com/favicon.ico">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #a58843;
        }
        #map {
            width: 100vw;
            height: 100vh;
            background-color: #111; /* Dark background for off-map areas */
        }
        .leaflet-popup-content-wrapper {
            background: #a58843;
            color: #000000;
            border: 1px solid #000000;
            border-radius: 4px;
        }
        .leaflet-popup-tip {
            background: #a58843;
        }
    </style>
</head>
<body>
    <p style="color:white;">This map is a work in progress.</p>
    <p style="color:white;">If the map isn't loading, give it 5-10 minutes for the mapping data to sync after an update that I've made.</p>
    <p style="color:white;"><a href="https://warrenwoodhouse.blogspot.com/maps/interactive">CLICK HERE</a> to see more Interactive Maps by Warren Woodhouse.</p>

    <div id="map"></div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
        // 1. Define Map Dimensions
        const mapWidth = 1080;
        const mapHeight = 1150;

        // 2. Initialize Map with CRS.Simple (for flat images instead of globes)
        const map = L.map('map', {
            crs: L.CRS.Simple,
            minZoom: -1,  // Allows zooming out further than the image
            maxZoom: 3
        });

        // 3. Set Bounds [Bottom-Left, Top-Right]
        const bounds = [[0, 0], [mapHeight, mapWidth]];

        // 4. Load the 1080x1150 Image Overlay
        // IMPORTANT: Replace 'maps-madmax2015-regions.jpeg' with your actual image file name
        L.imageOverlay('maps-madmax2015-regions.jpeg', bounds).addTo(map);
        map.fitBounds(bounds);

        // 5. Create Layer Groups for Filters
        const regions = L.layerGroup();

        // 6. Location Database
        // Y = Vertical axis (0 is bottom, 1080 is top)
        // X = Horizontal axis (0 is left, 1150 is right)
        // These coordinates are estimates to show you the scaling on a 1150 grid.
        const locations = [
            // Regions
            { id: "1", name: "Great White", type: "regions", y: 0, x: 0 },
            { id: "2", name: "Dead Barrens", type: "regions", y: 100, x: 100 },
            { id: "3", name: "Dump", type: "regions", y: 200, x: 200 },
            { id: "4", name: "The Dune's Region", type: "regions", y: 300, x: 300 }
        ];

        // 7. Loop Through Data to Create Markers
        locations.forEach(loc => {
            // Leaflet requires [Y, X] for marker placement
            const marker = L.marker([loc.y, loc.x])
                .bindPopup(`<strong>${loc.name}</strong><br>Location ID: ${loc.id}`);
            
            // Route the marker to the correct filter group based on its type
            if (loc.type === "regions") {
                marker.addTo(regions);
            }
        });

        // 8. Add Default Layers to the Map
        regions.addTo(map);

        // 9. Build the Filter Control Menu
        const filterControls = {
            "Regions": regions
        };

        // Add the toggle menu to the top right of the map
        L.control.layers(null, filterControls, { collapsed: false }).addTo(map);

    </script>
</body>
</html>
```
