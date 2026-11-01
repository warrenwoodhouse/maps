# Amazon Silk Browser Compatibility

This page documents the standard fix used for Leaflet-powered map pages when they are viewed in Amazon Silk, especially on Fire TV and embedded browser-based devices.

## Why this is needed

Amazon Silk can behave differently from desktop browsers when a page is fixed to the viewport, when the pointer event model differs from standard mouse handling, or when the browser handles pan/drag interactions in a way that interferes with Leaflet's dragging logic.

The common symptoms are:

- the map scrolls the page instead of panning the map
- the map does not respond correctly to D-pad or remote navigation
- pointer drag events cause erratic movement or freeze the viewport
- the map is clipped or renders at the wrong height

## Standard fix

Use the following helper on every map page:

```html
<script src="https://warrenwoodhouse.github.io/maps/plugins/amazon-silk-map-fix.js"></script>
<script>
    const map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -1,
        maxZoom: 3,
        dragging: true,
        scrollWheelZoom: true,
        tap: false
    });

    installAmazonSilkFix(map, document.getElementById('map'));
</script>
```

## Browser-safe CSS

Keep the body and viewport fixed:

```css
html, body {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #000000;
}

#map {
    width: 100vw;
    height: 100vh;
    background-color: #111;
    font-size: 20px;
    touch-action: none;
}
```

## Notes

- `pointerdown` / `pointermove` / `pointerup` are used instead of mouse events so the browser remains compatible with remote-controller and stylus input.
- Leaflet dragging is temporarily disabled while the custom pan logic is active to avoid conflicting input handling.
- `map.panBy([deltaX, deltaY], { animate: false })` is the correct call for incremental panning in Leaflet.
- The helper also prevents the viewport from collapsing or scrolling incorrectly on Amazon Silk.

## Recommended implementation pattern

1. Load Leaflet.
2. Create the map with `dragging: true` and `tap: false`.
3. Load the Amazon Silk helper script.
4. Call `installAmazonSilkFix(map, document.getElementById('map'))` immediately after the map is created.
5. Keep the page body fixed and prevent default document scrolling.

## Example

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>My Map</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
        html, body {
            overflow: hidden;
            position: fixed;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #000000;
        }

        #map {
            width: 100vw;
            height: 100vh;
            background-color: #111;
            touch-action: none;
        }
    </style>
</head>
<body>
    <div id="map"></div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="https://warrenwoodhouse.github.io/maps/plugins/amazon-silk-map-fix.js"></script>
    <script>
        const map = L.map('map', {
            crs: L.CRS.Simple,
            minZoom: -1,
            maxZoom: 3,
            dragging: true,
            scrollWheelZoom: true,
            tap: false
        });

        installAmazonSilkFix(map, document.getElementById('map'));
        const bounds = [[0, 0], [3000, 1900]];
        L.imageOverlay('https://raw.githubusercontent.com/warrenwoodhouse/maps/main/gta/iv/map.png', bounds).addTo(map);
        map.fitBounds(bounds);
    </script>
</body>
</html>
```
