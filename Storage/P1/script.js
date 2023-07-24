let colors = [
    "#FF5733",
    "#DAF7A6",
    "#C70039",
    "#900C3F",
    "#FFC300",
    "#581845",
    "#FDEDEC",
    "#FFA07A",
    "#F7DC6F",
    "#AF7AC5",
];
let aCodes = [55555, 12345, 19375, 79513];

logCheck();

function logCheck() {
    let logCheck = localStorage.getItem("log");
    if (logCheck == "yes") {
        $(".input").css("display", "none");
        $(".inputResult").css("display", "flex");
        $(".userData").css("display", "inline");
        $("#sumOut").css("display", "inline");

        username = localStorage.getItem("username");
        email = localStorage.getItem("email");
        $("#udt1").text(username);
        $("#udt2").text(email);
    }
}

$("#logOut").click(() => {
    localStorage.setItem("log", "no");
    $(".input").css("display", "flex");
    $(".inputResult").css("display", "none");
    $(".userData").css("display", "none");
    $("#sumOut").css("display", "none");
});

$("#submitMainInput").click(function () {
    let username = $("#username").val();
    let email = $("#email").val();
    let aCode = $("#aCode").val();
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);

    if (username == "" || email == "" || aCode == "") {
        alert("Fill in all the fields");
        return;
    } else if (!aCodes.includes(parseInt(aCode))) {
        $("#aCode").css("background-color", "#a62434");
        $("#aCode").effect("shake", { duration: 750 });
        return;
    }
    if (!checkEmail(email)) {
        alert("Invalid email adress");
        return;
    }
    $("#udt1").text(username);
    $("#udt2").text(email);

    $("#username").val("");
    $("#email").val("");
    $("#acode").val("");

    $(".input").css("display", "none");
    localStorage.setItem("log", "yes");
    $(".inputResult").css("display", "inline");
    $(".userData").css("display", "inline");
    $("#sumOut").css("display", "inline");
});

$(".mainInput").keypress(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#submitMainInput").click();
    }
});

let rCount = 0;

$("#addItemB").click(() => {
    if (!isNaN(parseInt($("#addItem").val()))) {
        if (rCount == 0) {
            $(".mainTable").append(
                "<tr class='table 2' id='tr00'>" +
                    "<td class='table1'>" +
                    "<input type='checkbox' name='r00' id='r00' class='check' />" +
                    "</td>" +
                    "<td class='table2' id='td00'>Select All</td></tr>"
            );
        }
        $(".mainTable").append(
            "<tr class='table2' id='tr" +
                rCount +
                "'><td class='table1'> <input type='checkbox' name='r" +
                rCount +
                "' id='r" +
                rCount +
                "' class='check' /></td><td class='table2' id='td" +
                rCount +
                "'>" +
                parseFloat($("#addItem").val()) +
                "</td></tr>"
        );
        rCount++;
        $("#addItem").val("");
    } else {
        $(".warning").fadeIn(1000).delay(3000).fadeOut(2000);
    }
    if (rCount >= 10) {
        $(".mainTableDiv").css("overflow-y", "scroll");
    }
});

$(document).on("change", "#r00", () => {
    if ($("#r00").is(":checked")) {
        $("input[type='checkbox']").prop("checked", true);
    } else {
        $("input[type='checkbox']").prop("checked", false);
    }
});

$("#addItem").keypress(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#addItemB").click();
    }
});

$("#del").click(() => {
    for (let i = 0; i <= rCount; i++) {
        if ($("#r" + i).prop("checked")) {
            $("#tr" + i).remove();
        }
    }
    if ($("input[type='checkbox']").prop("checked")) {
        $("#tr00").remove();
        rCount = 0;
    }
});

$("#sum").click(() => {
    $("#sumOut").empty();
    let sum = 0;
    for (let i = 0; i <= rCount; i++) {
        if ($("#r" + i).prop("checked")) {
            sum = sum + parseFloat($("#td" + i).text());
        }
    }
    $("#sumOut").append(sum);
});

$("#B1").click(function () {
    let random = Math.floor(Math.random() * colors.length);
    $("body").css("background-color", colors[random]);
});

function checkEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
