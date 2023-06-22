// Get all the join buttons
const joinButtons = document.querySelectorAll(".room-join-btn");
import { joinRoom } from "/public/static/js/exports/exports.js";

// Add click event listener to each button
joinButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the room code from the corresponding div
    const roomCode = button.parentNode
      .querySelector("#room-code")
      .innerText;

    // Log the room code to the console
    joinRoom(roomCode, window);
  });
});
