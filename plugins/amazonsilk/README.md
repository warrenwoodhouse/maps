# Amazon Silk Plugin for Leaflet
Welcome to the Amazon Silk Plugin for Leaflet.

Here, you can find installation instructions and documentations for implementing this useful plugin for making your map pages accessible on WebKit browsers and Amazon Silk browser on Fire TV.

* Plugin Launch Date & Time: 1st November 2026 at 8:52 am
* Plugin Author: Warren Woodhouse

# install
## this script line goes after the unpkg script
```
    <script src="https://warrenwoodhouse.github.io/maps/plugins/amazonsilk/plugin.js"></script>
```

## this data goes in the const map part
```
            dragging: true,
            scrollWheelZoom: true,
            tap: false
        });

        installAmazonSilk(map, document.getElementById('map'));
```

# support
If you run into any issues, please [CLICK HERE](https://github.com/warrenwoodhouse/forums/issues) to create a New Issue Ticket or to find solutions.
