const socket = io();

socket.on("message", message => console.log(message));

const form = document.querySelector("#message-form");

form.addEventListener("submit", e => {
  e.preventDefault();
  socket.emit("sendMessage", e.target.elements.message.value, error => {
    if (error) {
      return console.log(error);
    }

    console.log("Message delivered!");
  });
});

document.querySelector("#send-location").addEventListener("click", event => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by you browser.");
  }

  navigator.geolocation.getCurrentPosition(({ coords }) => {
    socket.emit(
      "sendLocation",
      {
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      message => {
        if (message) {
          console.log(message);
        }
      }
    );
  });
});
