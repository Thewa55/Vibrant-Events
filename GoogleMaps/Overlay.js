/**
 * Created by Horo on 3/26/2021.
 */
// This example creates a custom overlay called USGSOverlay, containing
// a U.S. Geological Survey (USGS) image of the relevant area on the map.
// Set the custom overlay object's prototype to a new instance
// of OverlayView. In effect, this will subclass the overlay class therefore
// it's simpler to load the API synchronously, using
// google.maps.event.addDomListener().
// Note that we set the prototype to an instance, rather than the
// parent class itself, because we do not wish to modify the parent class.
// Initialize the map and the custom overlay.

/*
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: { lat: -25.344, lng: 131.036 },
        mapTypeId: "satellite",
    });
    const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-25.344, 131.036),
        new google.maps.LatLng(-25.744, 131.536)
    );
    // The photograph is courtesy of the U.S. Geological Survey.
    debugger;
    const srcImage = "../Images/Map.jpg";

    // The custom USGSOverlay object contains the USGS image,
    // the bounds of the image, and a reference to the map.
    class MapOverlay extends google.maps.OverlayView {
        constructor(bounds, image) {
            super();
            // Initialize all properties.
            this.bounds_ = bounds;
            this.image_ = image;
            // Define a property to hold the image's div. We'll
            // actually create this div upon receipt of the onAdd()
            // method so we'll leave it null for now.
            this.div_ = null;
        }
 //
//         * onAdd is called when the map's panes are ready and the overlay has been
   //      * added to the map.

        onAdd() {
            this.div_ = document.createElement("div");
            this.div_.style.borderStyle = "none";
            this.div_.style.borderWidth = "0px";
            this.div_.style.position = "absolute";
            // Create the img element and attach it to the div.
            const img = document.createElement("img");
            img.src = this.image_;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.position = "absolute";
            this.div_.appendChild(img);
            // Add the element to the "overlayLayer" pane.
            const panes = this.getPanes();
            panes.overlayLayer.appendChild(this.div_);
        }
        draw() {
            // We use the south-west and north-east
            // coordinates of the overlay to peg it to the correct position and size.
            // To do this, we need to retrieve the projection from the overlay.
            const overlayProjection = this.getProjection();
            // Retrieve the south-west and north-east coordinates of this overlay
            // in LatLngs and convert them to pixel coordinates.
            // We'll use these coordinates to resize the div.
            const sw = overlayProjection.fromLatLngToDivPixel(
                this.bounds_.getSouthWest()
            );
            const ne = overlayProjection.fromLatLngToDivPixel(
                this.bounds_.getNorthEast()
            );

            // Resize the image's div to fit the indicated dimensions.
            if (this.div_) {
                this.div_.style.left = sw.x + "px";
                this.div_.style.top = ne.y + "px";
                this.div_.style.width = ne.x - sw.x + "px";
                this.div_.style.height = sw.y - ne.y + "px";
            }
        }

         //* The onRemove() method will be called automatically from the API if
         //* we ever set the overlay's map property to 'null'.

        onRemove() {
            if (this.div_) {
                this.div_.parentNode.removeChild(this.div_);
                this.div_ = null;
            }
        }
    }
    const overlay = new MapOverlay(bounds, srcImage);
    overlay.setMap(map);
}
*/

// This example adds hide() and show() methods to a custom overlay's prototype.
// These methods toggle the visibility of the container <div>.
// overlay to or from the map.
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: { lat: 62.323907, lng: -150.109291 },
        mapTypeId: "satellite",
    });
    const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(62.281819, -150.287132),
        new google.maps.LatLng(62.400471, -150.005608)
    );
    // The photograph is courtesy of the U.S. Geological Survey.
    let image = "Images/Map.jpg";

    /**
     * The custom USGSOverlay object contains the USGS image,
     * the bounds of the image, and a reference to the map.
     */
    class USGSOverlay extends google.maps.OverlayView {
        constructor(bounds, image) {
            super();
            this.bounds = bounds;
            this.image = image;
        }
        /**
         * onAdd is called when the map's panes are ready and the overlay has been
         * added to the map.
         */
        onAdd() {
            this.div = document.createElement("div");
            this.div.style.borderStyle = "none";
            this.div.style.borderWidth = "0px";
            this.div.style.position = "absolute";
            // Create the img element and attach it to the div.
            const img = document.createElement("img");
            img.src = this.image;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.position = "absolute";
            this.div.appendChild(img);
            // Add the element to the "overlayLayer" pane.
            const panes = this.getPanes();
            panes.overlayLayer.appendChild(this.div);
        }
        draw() {
            // We use the south-west and north-east
            // coordinates of the overlay to peg it to the correct position and size.
            // To do this, we need to retrieve the projection from the overlay.
            const overlayProjection = this.getProjection();
            // Retrieve the south-west and north-east coordinates of this overlay
            // in LatLngs and convert them to pixel coordinates.
            // We'll use these coordinates to resize the div.
            const sw = overlayProjection.fromLatLngToDivPixel(
                this.bounds.getSouthWest()
            );
            const ne = overlayProjection.fromLatLngToDivPixel(
                this.bounds.getNorthEast()
            );

            // Resize the image's div to fit the indicated dimensions.
            if (this.div) {
                this.div.style.left = sw.x + "px";
                this.div.style.top = ne.y + "px";
                this.div.style.width = ne.x - sw.x + "px";
                this.div.style.height = sw.y - ne.y + "px";
            }
        }
        /**
         * The onRemove() method will be called automatically from the API if
         * we ever set the overlay's map property to 'null'.
         */
        onRemove() {
            if (this.div) {
                this.div.parentNode.removeChild(this.div);
                delete this.div;
            }
        }
        /**
         *  Set the visibility to 'hidden' or 'visible'.
         */
        hide() {
            if (this.div) {
                this.div.style.visibility = "hidden";
            }
        }
        show() {
            if (this.div) {
                this.div.style.visibility = "visible";
            }
        }
        toggle() {
            if (this.div) {
                if (this.div.style.visibility === "hidden") {
                    this.show();
                } else {
                    this.hide();
                }
            }
        }
        toggleDOM(map) {
            if (this.getMap()) {
                this.setMap(null);
            } else {
                this.setMap(map);
            }
        }
    }
    const overlay = new USGSOverlay(bounds, image);
    overlay.setMap(map);
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle";
    toggleButton.classList.add("custom-map-control-button");
    const toggleDOMButton = document.createElement("button");
    toggleDOMButton.textContent = "Toggle DOM Attachment";
    toggleDOMButton.classList.add("custom-map-control-button");
    toggleButton.addEventListener("click", () => {
        overlay.toggle();
});
    toggleDOMButton.addEventListener("click", () => {
        overlay.toggleDOM(map);
});
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(toggleDOMButton);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(toggleButton);


    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(pos);
    },
        () => {
            handleLocationError(true, infoWindow, map.getCenter());
        }
    );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    });

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
    }

}

