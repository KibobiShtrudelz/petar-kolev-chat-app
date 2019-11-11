const socket = io();

socket.on("message", message => console.log(message));

const form = document.querySelector("#message-form");

form.addEventListener("submit", event => {
  event.preventDefault();

  const message = event.target.elements.message.value;

  socket.emit("sendMessage", message);
});

document.querySelector("#send-location").addEventListener("click", event => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by you browser.");
  }

  navigator.geolocation.getCurrentPosition(({ coords }) => {
    socket.emit("sendLocation", {
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  });
});
