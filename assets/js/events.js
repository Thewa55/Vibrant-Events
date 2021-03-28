$(document).ready(() => {

    $("#mainLogo").on("click", () => {
        location.href = "./index.html"
    });

    $('.vewMap a').attr('href', './Maps.html');

    $('.vewSchedule a').attr('href', './EventsPage.html');

    $('.eventSection').on("click", function(){
        location.href = "./Maps.html";
    });
})