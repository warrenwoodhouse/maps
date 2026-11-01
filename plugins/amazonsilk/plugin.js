<!-- Amazon Silk Plugin for Leaflet -->
<!-- Author: Warren Woodhouse - github.com/warrenwoodhouse -->
<!-- Documentation: warrenwoodhouse.github.io/maps/plugins/amazonsilk -->
(function () {
    function installAmazonSilk(map, mapContainer) {
        if (!map || !mapContainer) {
            return;
        }

        function applyViewport() {
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 600;
            mapContainer.style.position = 'fixed';
            mapContainer.style.top = '0';
            mapContainer.style.left = '0';
            mapContainer.style.width = '100vw';
            mapContainer.style.height = viewportHeight + 'px';
            mapContainer.style.overflow = 'hidden';
            mapContainer.style.touchAction = 'none';
            mapContainer.style.webkitTouchCallout = 'none';
            mapContainer.style.webkitUserSelect = 'none';
            mapContainer.style.userSelect = 'none';
        }

        let isPointerDragging = false;
        let previousPointer = { y: 0, x: 0 };

        function endPointerDrag() {
            if (!isPointerDragging) {
                return;
            }

            isPointerDragging = false;

            if (map && map.dragging) {
                map.dragging.enable();
            }
        }

        mapContainer.addEventListener('pointerdown', function (event) {
            event.preventDefault();
            isPointerDragging = true;
            previousPointer = { y: event.clientY, x: event.clientX };

            if (map && map.dragging) {
                map.dragging.disable();
            }

            if (mapContainer.setPointerCapture) {
                mapContainer.setPointerCapture(event.pointerId);
            }
        });

        mapContainer.addEventListener('pointermove', function (event) {
            if (!isPointerDragging || !map) {
                return;
            }

            const deltaY = event.clientY - previousPointer.y;
            const deltaX = event.clientX - previousPointer.x;

            map.panBy([deltaY, deltaX], { animate: false });
            previousPointer = { y: event.clientY, x: event.clientX };
        });

        mapContainer.addEventListener('pointerup', endPointerDrag);
        mapContainer.addEventListener('pointercancel', endPointerDrag);
        mapContainer.addEventListener('pointerleave', endPointerDrag);

        applyViewport();
        window.addEventListener('resize', applyViewport, { passive: true });
    }

    window.installAmazonSilk = installAmazonSilk;
})();
