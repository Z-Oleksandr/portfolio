const form = document.getElementById("chatbot-form");
const input = document.getElementById("chatbot-input");
const messages = document.getElementById("chatbot-messages");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let message = input.value;
    input.value = "";

    let response = processMessage(message);

    messages.innerHTML += "<p>You: " + `${message}` + "</p>";
    messages.innerHTML += "<p>Chatbot: " + `${response}` + "</p>";
});

function processMessage(message) {
    prossMess = message.toLowerCase();
    if (prossMess.match(/hi/i) || prossMess.match(/hello/i)) {
        return "Hello, how are you doing today?";
    } else if (prossMess.match(/good/i) || prossMess.match(/and you/i)) {
        return "That's great. I'm doing good too.";
    } else if (prossMess.match(/how you/i) || prossMess.match(/what up/i)) {
        return "Doing pretty good.";
    } else {
        return "Unfortunately I have not yet been developed enought to answer that. Come back later.";
    }
}
