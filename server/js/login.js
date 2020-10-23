$(document).ready(function(){
    if (sessionStorage.getItem("admin") !== "0") {
        window.location.href = "../index.html"
    }
})