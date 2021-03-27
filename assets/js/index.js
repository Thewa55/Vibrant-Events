$(document).ready(() => {

    $(".events").on("click", () => {
        console.log("Clicked")
        location.href = "./assets/Events.html"
    })

    $(".select").on("click", () => {
        let dropDown = $(".form-select :selected").val();
        console.log(dropDown)
    })

})