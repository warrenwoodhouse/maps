(function () {
    function installAmazonSilkFix(map, mapContainer) {
        if (!map || !mapContainer) {
            return;
        }

        function applyViewportFix() {
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 600;
            mapContainer.style.position = 'fixed';
            mapContainer.style.top = '0';
            mapContainer.style.left = '0';
            mapContainer.style.width = '100vw';
            mapContainer.style.height = viewportHeight + 'px';
            mapContainer.style.overflow = 'hidden';
            mapContainer.style.touchAction = 'none';
        }

        let isPointerDragging = false;
        let previousPointer = { x: 0, y: 0 };

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
            previousPointer = { x: event.clientX, y: event.clientY };

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

            const deltaX = event.clientX - previousPointer.x;
            const deltaY = event.clientY - previousPointer.y;

            map.panBy([deltaX, deltaY], { animate: false });
            previousPointer = { x: event.clientX, y: event.clientY };
        });

        mapContainer.addEventListener('pointerup', endPointerDrag);
        mapContainer.addEventListener('pointercancel', endPointerDrag);
        mapContainer.addEventListener('pointerleave', endPointerDrag);

        applyViewportFix();
        window.addEventListener('resize', applyViewportFix, { passive: true });
    }

    window.installAmazonSilkFix = installAmazonSilkFix;
})();
