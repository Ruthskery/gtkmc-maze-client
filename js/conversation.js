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
  her: "assets/images/avatar/bg-danica-cartoon.png", // You / the one answering
  me:  "assets/images/avatar/bg-cyril-cartoon.png"   // Me
};

let waitingForTap = false;
let waitingForChoice = false;
let lastSpeaker = "her";
let onChoiceSelect = null;

function hideConversation() {
  card.classList.add("is-hidden");
}

function showConversation() {
  card.classList.remove("is-hidden");
}

// ======================
// Typing
// ======================
function showTyping(who) {
  row.className = `conversation-row ${who}`;
  avatar.classList.remove("avatar-show");

  speaker.textContent = who === "me" ? "Cy" : "You";

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
  waitingForChoice = false;

  showConversation(); // 👈 fades IN

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
  }, 600);
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
// click + space handlers
// ======================
function advanceDialogue() {
  tapHint.classList.add("hidden");
  waitingForTap = false;
  hideConversation();

  if (advanceResolver) {
    advanceResolver();
    advanceResolver = null;
  }
}


function globalAdvanceHandler(e) {
  if (!waitingForTap || waitingForChoice) return;

  if (e.type === "touchend") {
    e.preventDefault();
  }

  advanceDialogue();
}


export function isDialogueActive() {
  return !card.classList.contains("is-hidden");
}

card.addEventListener("click", globalAdvanceHandler);
card.addEventListener("touchend", globalAdvanceHandler, { passive: false });


document.addEventListener("keydown", e => {
  if (e.code !== "Space") return;
  if (!waitingForTap || waitingForChoice) return;

  e.preventDefault();
  advanceDialogue();
});

let advanceResolver = null;

export function waitForConversationAdvance() {
  return new Promise(resolve => {
    advanceResolver = resolve;
  });
}
