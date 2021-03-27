$(document).ready(() => {

    $(".events").on("click", () => {
        console.log("Clicked")
        location.href = "./assets/Events.html"
    })

    $(".select").on("click", () => {
        let location = $(".form-select")
        console.log(location)

    })

})