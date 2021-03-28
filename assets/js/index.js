$(document).ready(() => {

    $(".events").on("click", () => {
        console.log("Clicked")
        location.href = "./assets/Events.html"
    })

    $(".select").on("click", () => {
        var conceptName = $('.form-select').find(":selected").text();
        console.log(conceptName)
    })

})