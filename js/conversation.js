// ======================
// Element refs
// ======================
const card = document.getElementById("conversationCard");
const row = document.getElementById("conversationRow");
const avatar = document.getElementById("conversationAvatar");
const speaker = document.getElementById("speakerLabel");
const text = document.getElementById("messageText");
const tapHint = document.getElementById("tapHint");
const options = document.getElementById("conversationOptions");

// ======================
// Avatars
// ======================
const avatars = {
  her: "assets/images/avatar/bg-danica-cartoon.png",
  me: "assets/images/avatar/bg-cyril-cartoon.png"
};

let waitingForTap = false;
let waitingForChoice = false;
let lastSpeaker = "her";
let onChoiceSelect = null;

// ======================
// Typing
// ======================
function showTyping(who) {
  row.className = `conversation-row ${who}`;
  avatar.classList.remove("avatar-show");
  speaker.textContent = who === "me" ? "You" : "Her";

  text.innerHTML = `
    <span class="typing">
      <span></span><span></span><span></span>
    </span>
  `;
}

// ======================
// Show message
// ======================
export function showMessage(message, who = "her") {
  waitingForTap = false;
  tapHint.classList.add("hidden");
  options.innerHTML = "";

  showTyping(who);

  setTimeout(() => {
    avatar.src = avatars[who];
    avatar.classList.add("avatar-show");
    text.textContent = message;
    lastSpeaker = who;

    waitingForTap = true;
    tapHint.classList.remove("hidden");
  }, 700);
}

// ======================
// Show choices (from main.js)
// ======================
export function showChoices(choices, callback) {
  waitingForChoice = true;
  onChoiceSelect = callback;
  options.innerHTML = "";

  choices.forEach(label => {
    const btn = document.createElement("button");
    btn.textContent = label;

    btn.onclick = e => {
      e.stopPropagation();
      waitingForChoice = false;
      options.innerHTML = "";
      showMessage(label, "me");
      onChoiceSelect?.(label);
    };

    options.appendChild(btn);
  });
}

// ======================
// Tap handling
// ======================
card.addEventListener("click", () => {
  if (!waitingForTap || waitingForChoice) return;

  tapHint.classList.add("hidden");
  waitingForTap = false;
});
