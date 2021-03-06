let map, infoWindow;
let loadedMarkers = [];

const AREAS = "Areas";
const PRIZE = "Prize";
const AMENITIES = "Amenities";


const LEGEND_GARBAGE = "legendGarbage";
const LEGEND_CAN = "legendCan";
const LEGEND_INFO = "legendInfo";
const LEGEND_MEDICAL = "legendMedical";
const LEGEND_PRESENT = "legendPresent";
const LEGEND_RESTROOM = "legendRestRoom";

const markers = [
    {
        "lat": null,
        "lng": null,
        "image": null,
        "type": AREAS,
        "name": "Main Stage",
        "style": null
    },
    {
        "lat": null,
        "lng": null,
        "image": "assets/images/Legend_Present.png",
        "type": AREAS,
        "name": "Blue Stage",
        "style": null
    },
    {
        "lat": null,
        "lng": null,
        "image": null,
        "type": AREAS,
        "name": "Pink Stage",
        "style": null
    },
    {
        "lat": null,
        "lng": null,
        "image": null,
        "type": AREAS,
        "name": "Booths/Exibits",
        "style": null
    },
    {
        "lat": null,
        "lng": null,
        "image": null,
        "type": AREAS,
        "name": "Food/Beverage",
        "style": null
    },
    {
        "lat": null,
        "lng": null,
        "image": null,
        "type": AREAS,
        "name": "Parking",
        "style": null
    },
    {
        "lat": null,
        "lng": null,
        "image": null,
        "type": AREAS,
        "name": "Smoking Area",
        "style": null
    },


    {
        "lat": 40.6242009555238,
        "lng": -74.24627618067619,
        "image": "assets/images/Legend_Present.png",
        "type": PRIZE,
        "name": "Art Work Exhibit",
        "style": LEGEND_PRESENT
    },
    {
        "lat": 40.626554283654315,
        "lng": -74.24678043595631,
        "image": "assets/images/Legend_Present.png",
        "type": PRIZE,
        "name": "Big Glasses Shop",
        "style": LEGEND_PRESENT
    },
    {
        "lat": 40.626407712005395,
        "lng": -74.24436644791314,
        "image": "assets/images/Legend_Present.png",
        "type": PRIZE,
        "name": "Paint Booth",
        "style": LEGEND_PRESENT
    },


    {
        "lat": 40.624998979198935,
        "lng": -74.2466195034201,
        "image": "assets/images/Legend_Info.png",
        "type": AMENITIES,
        "name": "Information Desk",
        "style": LEGEND_INFO
    },
    {
        "lat": 40.625788850385774,
        "lng": -74.2451925682657,
        "image": "assets/images/Legend_Can.png",
        "type": AMENITIES,
        "name": "Box Office",
        "style": LEGEND_CAN
    },
    {
        "lat": 40.624062521874976,
        "lng": -74.24720958938623,
        "image": "assets/images/Legend_RestRoom.png",
        "type": AMENITIES,
        "name": "Restrooms",
        "style": LEGEND_RESTROOM
    },
    {
        "lat": 40.62699399667107,
        "lng": -74.24495653387925,
        "image": "assets/images/Legend_Medical.png",
        "type": AMENITIES,
        "name": "First Aid Station",
        "style": LEGEND_MEDICAL
    },
    {
        "lat": 40.62536541544722,
        "lng": -74.24759582747315,
        "image": "assets/images/Legend_Garbage.png",
        "type": AMENITIES,
        "name": "Garbage Station",
        "style": LEGEND_GARBAGE
    }

];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16.7,
        //40.6253422819969, -74.24640370742502
        center: { lat: 40.6253422819969, lng: -74.24640370742502 },
        mapTypeId: "roadmap",
    });

    const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(40.62289089686685, -74.24958816174413), //South West
        new google.maps.LatLng(40.62726177970077, -74.24345641746564) //North East
    );


    // The photograph is courtesy of the U.S. Geological Survey.
    let image = "../assets/images/MapOverlay.png";

    /**
     * The custom overlay object contains the USGS image,
     * the bounds of the image, and a reference to the map.
     */
    class EventOverlay extends google.maps.OverlayView {
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
    const overlay = new EventOverlay(bounds, image);
    overlay.setMap(map);
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle";
    toggleButton.classList.add("custom-map-control-button");
    toggleButton.addEventListener("click", () => {overlay.toggle(); });
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
    }
    , () => {handleLocationError(true, infoWindow, map.getCenter()); } );
    }
    else {
            infoWindow.setContent("Geolocation is not supported.");
        }
    });

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed. "
                : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
    }

    setupLegends();
}


function setupLegends() {
    markers.forEach(function(value, index, array){
        let markerSize = new google.maps.Size(25, 25, 'pixels', 'pixels');
        if (value.lat) {
            let curMarker = new google.maps.Marker({
                                position: {lat: value.lat, lng: value.lng},
                                map,
                                icon: value.image,
                                size: markerSize
                            });

            loadedMarkers.push(value);

            /*
            const infowindow = new google.maps.InfoWindow({
                content: value.name,
            });
            */

            curMarker.setTitle('' + (loadedMarkers.length -1 ));
            curMarker.addListener("click", () => {
                //infowindow.open(map, curMarker);
                mapMarkerClicked(curMarker.getTitle());
        });
        }
    });

}

$( function() {
    accordion.init({
        id: 'accordion'
    });

    //<li><span>Test1</span></li>

    markers.forEach(function(value, index, array) {
            let legend;
            legend = $('<li class="' + value.style + '"><span data-name="' + value.name + '" data-icon="' + value.image + '">' + value.name + '</span></li>');

            if (value.type == AREAS) {
                $('#legendsAreas').append(legend);
            }

            if (value.type == PRIZE) {
                $('#legendsPrize').append(legend);
            }

            if (value.type == AMENITIES) {
                $('#legendsAmenities').append(legend);
            }
        }
    );

    $('.legendsSection span').on('click',function(){
        //showDetailPopup({"image": $(this).attr("data-icon"), "name": this.attr("data=ma,e")});
        showDetailPopup({"object": this});
    });


});

function showDetailPopup(options){

    if ($('#detailPopup').css('opacity') == '0') {
        $('#detailPopup').css('opacity', '1').css('z-index', '99');
    }

    let title, icon;

    try {
        title = loadedMarkers[options.index].name;
        icon = loadedMarkers[options.index].image;

    } catch(err) {
        try {
            title = $(options.object).attr('data-name');
            icon = $(options.object).attr('data-icon');
        } catch(err) {}
    }

    let currentAcc = $('#accordion .active').attr('data-accordian');

    if (currentAcc == 1) {
        $('#detailPopup').css('left', '0px');
    } else if (currentAcc == 2) {
        $('#detailPopup').css('left', '40px');
    } else {
        $('#detailPopup').css('left', '80px');
    }

    $('#detailTitleText').text(title);
    $('#detailIcon').attr('src', icon);
}

function mapMarkerClicked(index){
    showDetailPopup({"index": index});
};