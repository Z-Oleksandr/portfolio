let archive = [];
let arcCount = 0;
let db;

const openRequest = indexedDB.open("archive1", 1);

openRequest.onupgradeneeded = function (event) {
    db = event.target.result;

    //Create an object store
    if (!db.objectStoreNames.contains("logs")) {
        const objectStore = db.createObjectStore("logs", {
            keyPath: "id",
            autoIncrement: true,
        });
    }

    //Additional indexes can be defined
};

openRequest.onsuccess = function (event) {
    db = event.target.result;
    console.log("openRequest success");

    retrieveLogs();
};

openRequest.onerror = function (event) {
    console.log("openRequest error");
};

//Crerate new divs and save text from the input
$("#submit1").click(() => {
    let textHolder = $(".input1").val();

    //new
    const transaction = db.transaction(["logs"], "readwrite");
    const objectStore = transaction.objectStore("logs");

    const logEntry = {
        text: textHolder,
        timestamp: new Date().getTime(),
    };

    const addRequest = objectStore.add(logEntry);

    addRequest.onsuccess = function (event) {
        const itemId = addRequest.result;

        $(".arcContent").prepend(
            "<div class='archiveItem' id='A" +
                addRequest.result +
                "'><p>" +
                logEntry.text +
                "</p><p class='logTimestamp'>" +
                formatDate(logEntry.timestamp) +
                "</p><img class='delArcIt' id='D" +
                itemId +
                "' src='Media/icons8-delete-65.png' alt='delArcIt'></div>"
        );
        console.log("log added successfully");
        $(".input1").val("");

        //Add event listener to the delete button
        $("#D" + itemId).click(function () {
            const itemId = $(this).attr("id").substr(1); // Extract the ID of the archive item
            deleteArchiveItem(itemId);
        });
    };

    addRequest.onerror = function (event) {
        console.log("error log addition");
    };

    //old

    archive.push(textHolder);

    // //append to initial parent
    // $(".arcContent").append("<div class='archiveItem' id='A" + arcCount + "'>");

    // //append to child with text
    // $("#A" + arcCount).append("<p>" + textHolder + "</p>");

    // $("#A" + arcCount).append(
    //     "<img class='delArcIt' id='D" +
    //         arcCount +
    //         "' src='Media/icons8-delete-65.png' alt='delArcIt'>"
    // );
    arcCount++;
});

//Retrieve logs from database
function retrieveLogs() {
    const transaction = db.transaction(["logs"], "readonly");
    const objectStore = transaction.objectStore("logs");

    const getAllRequest = objectStore.getAll();

    getAllRequest.onsuccess = function (event) {
        const logs = event.target.result;

        // Loop through the logs and append them to the archive
        logs.forEach((log) => {
            const itemId = log.id;

            $(".arcContent").prepend(
                "<div class='archiveItem' id='A" +
                    itemId +
                    "'><p>" +
                    log.text +
                    "</p><p class='logTimestamp'>" +
                    formatDate(log.timestamp) +
                    "</p><img class='delArcIt' id='D" +
                    itemId +
                    "' src='Media/icons8-delete-65.png' alt='delArcIt'></div>"
            );

            $("#D" + itemId).click(function () {
                const itemId = $(this).attr("id").substr(1); // Extract the ID of the archive item
                deleteArchiveItem(itemId);
            });
        });
        console.log("logs retrieved successfully");
    };

    getAllRequest.onerror = function (event) {
        console.log("Error retrieveing logs");
    };
}

//clear DB and the Archive
$("#clearLC").click(() => {
    console.log("clear click");

    const confirmation = confirm(
        "Are you sure you want to clear the Prodigy archive?"
    );

    if (confirmation) {
        const deleteRequest = indexedDB.deleteDatabase("archive1");

        // deleteRequest.onsuccess = function () {
        //     arcCount = 0;
        //     $(".arcContent").empty();
        //     console.log("clearLC " + arcCount);
        //     console.log("Cleared successfully");
        // };

        alert("Archive cleared. Please reload the page.");
    } else {
        return;
    }

    deleteRequest.onerror = function () {
        console.log("Error clearing indexedDB");
    };
});

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}

// Function to delete an archive item
function deleteArchiveItem(itemId) {
    const transaction = db.transaction(["logs"], "readwrite");
    const objectStore = transaction.objectStore("logs");

    const deleteRequest = objectStore.delete(parseInt(itemId));

    deleteRequest.onsuccess = function () {
        // Remove the corresponding archive item from the DOM
        $("#A" + itemId).remove();
        console.log("Archive item deleted successfully");
    };

    deleteRequest.onerror = function () {
        console.log("Error deleting archive item");
    };
}

function updateTime() {
    const currentDate = new Date();
    const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
    const timeoptions = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };
    const formattedDate = currentDate.toLocaleDateString(
        undefined,
        dateOptions
    );
    const formattedTime = currentDate.toLocaleTimeString(
        undefined,
        timeoptions
    );
    const dateTimeString = formattedDate + " " + formattedTime;
    $(".time").text(dateTimeString);
}

updateTime();

setInterval(updateTime, 1000);
