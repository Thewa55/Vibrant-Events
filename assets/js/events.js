$(document).ready(() => {

    $("#mainLogo").on("click", () => {
        location.href = "./index.html"
    });

    /*
    $('#viewMapMenu').on('click', () => {
        location.href = "./GoogleMaps/Maps.html"
    });
    */

    $('#viewMapMenu').attr('href', './GoogleMaps/Maps.html');



})