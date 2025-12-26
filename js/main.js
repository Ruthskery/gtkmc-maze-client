import { levels } from "./levels.js";
import { drawMaze, resizeCanvas } from "./rendererCanvas.js";
import { sendMazeResult } from "./api.js";
import { showMessage, isDialogueActive, waitForConversationAdvance } from "./conversation.js";
import { playDing } from "./audio.js";

/* ======================
   State
====================== */

let currentLevel = 0;
let maze = [];
let playerPos = { x: 1, y: 1 };
let choiceHistory = [];
let playerName = null;

let fade = 0;
let fading = false;

let exitLocked = false;

/* ======================
   DOM
====================== */

const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const titleEl = document.querySelector("h1");
const subtitleEl = document.querySelector(".subtitle");
const resultScreen = document.getElementById("resultScreen");
const resultText = document.getElementById("resultText");
const resultList = document.getElementById("resultList");
const restartBtn = document.getElementById("restartBtn");

// 👇 ADD THIS RIGHT HERE
restartBtn.addEventListener("click", () => {
  const card = document.getElementById("resultCard");
  const credits = document.getElementById("endCredits");

  card.classList.add("opacity-0");

  setTimeout(() => {
    card.classList.add("hidden");
    credits.classList.remove("hidden");

    requestAnimationFrame(() => {
      credits.classList.remove("opacity-0");
    });
  }, 500);
});

/* ======================
   Level Handling
====================== */

function loadLevel(index) {
  const level = levels[index];
  maze = level.maze;
  playerPos = { x: 1, y: 1 };
  exitLocked = false;

  resizeCanvas(index);

  titleEl.textContent = `${level.title} 💕`;
  subtitleEl.textContent = level.subtitle;

  showMessage(level.subtitle, "me");
}

/* ======================
   Delay/Thinking
====================== */
function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

/* ======================
   Dialogoue
====================== */

async function playDialogue(lines) {
  for (const line of lines) {
    showMessage(line.text, line.who);
    await waitForConversationAdvance();
  }
}

/* ======================
   Exit Handling
====================== */

async function handleExit(exitKey) {
  playDing(); 

  const level = levels[currentLevel];
  exitLocked = true;

  const dialogue = level.dialogue?.[exitKey];

  if (dialogue) {
    await playDialogue(dialogue);
  } else {
  showMessage(level.exits[exitKey], "me");
  await waitForConversationAdvance();

  showMessage("Interesting choice 💕", "her");
  await waitForConversationAdvance();
}

  choiceHistory.push({
    category: level.title,
    choice: level.exits[exitKey]
  });

  currentLevel++;
  exitLocked = false;

  if (currentLevel >= levels.length) {
    showResultScreen();
  } else {
    loadLevel(currentLevel);
  }
}


/* ======================
   Choice Animation
====================== */

function animateChoice(exitKey) {
  document.querySelectorAll("#choicesList li").forEach(li => {
    if (li.dataset.exit === exitKey) {
      li.classList.add(
        "bg-pink-300/60",
        "ring-2",
        "ring-pink-400",
        "scale-105",
        "transition"
      );
    }
  });
}

/* ======================
   Result Screen
====================== */

function showResultScreen() {
  resultList.innerHTML = "";

  choiceHistory.forEach(entry => {
    const li = document.createElement("li");
    li.className =
      "bg-pink-100/70 text-pink-900 rounded-xl px-3 py-2 shadow";
    li.textContent = `${entry.category}: ${entry.choice}`;
    resultList.appendChild(li);
  });

  resultText.textContent = generatePersonality(choiceHistory);
  resultScreen.classList.remove("hidden");

  // 🔔 Send to Discord via backend
  sendResultToServer();
}

/* ======================
   Send the Result to SERVER
====================== */

function sendResultToServer() {
 if (!playerName) return;

  sendMazeResult({
    playerName,
    choices: choiceHistory.map(c => `${c.category}: ${c.choice}`),
    personality: generatePersonality(choiceHistory),
    won: true
  });
}


function generatePersonality(history) {
  const categories = history.map(h => h.category);

  if (categories.includes("Fast Food")) {
    return "You love comfort and familiar choices 🍔💖 You’re cozy and sweet.";
  }
  if (categories.includes("Coffee Place")) {
    return "You adore calm moments ☕🌸 You value vibes and emotional balance.";
  }
  if (categories.includes("Pasta")) {
    return "You appreciate classic romance 🍝💕 Deep feelings matter to you.";
  }
  return "You love exploring feelings and connections 💕✨";
}

/* ======================
   Movement
====================== */

function movePlayer(dx, dy) {
  if (exitLocked) return;
  if (isDialogueActive()) return; // ✅ WORKS NOW

  const nx = playerPos.x + dx;
  const ny = playerPos.y + dy;

  if (!maze[ny] || maze[ny][nx] === 1) return;

  playerPos = { x: nx, y: ny };

  const cell = maze[ny][nx];
  if (typeof cell === "string" && cell.startsWith("E")) {
    exitLocked = true;
    handleExit(cell);
  }
}

/* ======================
   Game Loop
====================== */

function gameLoop() {
  drawMaze(maze, playerPos, currentLevel);

  if (fading) {
    fade -= 0.05;
    if (fade <= 0) fading = false;

    // Soft pink fade overlay
    ctx.fillStyle = `rgba(253,164,175,${fade})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  requestAnimationFrame(gameLoop);
}

/* ======================
   Controls
====================== */

// Keyboard
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") movePlayer(0, -1);
  if (e.key === "ArrowDown") movePlayer(0, 1);
  if (e.key === "ArrowLeft") movePlayer(-1, 0);
  if (e.key === "ArrowRight") movePlayer(1, 0);
});

// Click arrows
document.querySelectorAll(".arrow").forEach(btn => {
  btn.addEventListener("click", () => {
    const dir = btn.dataset.dir;
    if (dir === "up") movePlayer(0, -1);
    if (dir === "down") movePlayer(0, 1);
    if (dir === "left") movePlayer(-1, 0);
    if (dir === "right") movePlayer(1, 0);
  });
});

// Swipe
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener("touchstart", e => {
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
});

canvas.addEventListener("touchend", e => {
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 30) movePlayer(1, 0);
    if (dx < -30) movePlayer(-1, 0);
  } else {
    if (dy > 30) movePlayer(0, 1);
    if (dy < -30) movePlayer(0, -1);
  }
});

/* ======================
   Window Resize Handler
====================== */

let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    resizeCanvas(currentLevel);
  }, 150);
}

window.addEventListener("resize", handleResize);
window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    resizeCanvas(currentLevel);
  }, 300);
});

/* ======================
   Start
====================== */

export function startGame(name) {
  playerName = name;
  loadLevel(currentLevel);
  gameLoop();
}
