import { validatePlayerName } from "./player.js";
import { startGame } from "./main.js";

const screen = document.getElementById("inputNameScreen");
const input = document.getElementById("inputNameInput");
const error = document.getElementById("inputNameError");
const button = document.getElementById("inputNameButton");

/* ======================
   Always show input screen
====================== */

screen.classList.remove("input-name-hidden");

/* ======================
   Submit Handler
====================== */

function submitName() {
  const result = validatePlayerName(input.value);

  if (!result) {
    error.textContent = "Please use 1–16 characters 💕";
    return;
  }

  error.textContent = "";
  screen.classList.add("input-name-hidden");

  startGame(result);
}

button.addEventListener("click", submitName);

input.addEventListener("keydown", e => {
  if (e.key === "Enter") submitName();
});
