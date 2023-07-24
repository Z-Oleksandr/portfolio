$("#password").keypress(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        logCheck();
    }
});

function logCheck() {
    let password = $("#password").val();

    if (password == aCode) {
        $(".loginPage").css("display", "none");
        $(".root").css("display", "flex");
    } else {
        $("#password").css("background-color", "#a62434");
        $("#password").effect("shake", { duration: 750 });
    }
}

$("#password").on("input", function () {
    $("#password").css("background-color", "white");
});

let aCode = "12345";
