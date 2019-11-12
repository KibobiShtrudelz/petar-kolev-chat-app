const socket = io();

// Elements
const $messages = document.querySelector("#messages");
const $messageForm = document.querySelector("#message-form");
const $sendLocationButton = document.querySelector("#send-location");
const $messageFormInput = document.querySelector("#send-message-input");
const $messageFormButton = $messageForm.querySelector("#send-message-btn");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;

socket.on("message", message => {
  const html = Mustache.render(messageTemplate, { message });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", url => {
  const html = Mustache.render(locationTemplate, { url });
  $messages.insertAdjacentHTML("beforeend", html);
});

$messageForm.addEventListener("submit", e => {
  e.preventDefault();

  $messageFormButton.setAttribute("disabled", "disabled");

  socket.emit("sendMessage", e.target.elements.message.value, error => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }

    console.log("Message delivered!");
  });
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by you browser.");
  }

  $sendLocationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition(({ coords }) => {
    socket.emit(
      "sendLocation",
      {
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      locationMessage => {
        $sendLocationButton.removeAttribute("disabled");

        if (locationMessage) {
          console.log(locationMessage);
        }
      }
    );
  });
});
