$(document).ready(() => {

    $(".events").on("click", () => {
        console.log("Clicked")
        location.href = "./assets/Events.html"
    })

    $(".select").on("click", () => {
<<<<<<< HEAD
        var conceptName = $('.form-select').find(":selected").text();
        console.log(conceptName)
=======
        let dropDown = $(".form-select :selected").val();
        console.log(dropDown)
>>>>>>> 802132eaab1702db4defd8590ee756d443b28a11
    })

})