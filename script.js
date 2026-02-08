const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const subtext = document.getElementById("subtext");
const gif = document.getElementById("gif");
const card = document.getElementById("card");
const buttons = document.getElementById("buttons");

let noCount = 0;

const noPhrases = [
  "No",
  "Are you sure?",
  "Really sure??",
  "Pleaseeee 😭",
  "Don’t do this to me",
  "I’ll be sad…",
  "I’ll be VERY sad…",
  "Ok fine… last chance",
  "You’re breaking my heart 💔",
  "That’s illegal",
  "I’m calling the police",
  "Think again 😤",
  "Stop clicking No 😅",
  "Be nice!",
  "C’moooon 🙏",
  "Okay… you asked for it"
];

const gifStates = {
  normal: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjZ1aWQ5emF0cWkybmR4bWk4NW5lNnA1eGVoM25kZnRzY2R6bGhzNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MDJ9IbxxvDUQM/giphy.gif",
  pleading: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2V2bXJpN3g2eW5rZDB2b3ZqMHpuOHprNHc5Y2VzcG4xZTBmMTl0NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oriO0OEd9QIDdllqo/giphy.gif",
  yay: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDkzY2l4Z2x2OXJ2ZmlwbXJtZ2F5Y2QyNjZtYjV3Z3Q2cm1iZTBzYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5GoVLqeAOo6PK/giphy.gif"
};

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function moveNoButton() {
  // Make it absolute *within the viewport* so it can run away.
  noBtn.style.position = "fixed";

  const pad = 12;
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - btnRect.width - pad;
  const maxY = window.innerHeight - btnRect.height - pad;

  const x = Math.floor(Math.random() * clamp(maxX, 0, maxX)) + pad;
  const y = Math.floor(Math.random() * clamp(maxY, 0, maxY)) + pad;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function growYesButton() {
  // Grow quickly as "No" is clicked more.
  const scale = 1 + noCount * 0.18; // tweak for aggressiveness
  yesBtn.style.transform = `scale(${scale})`;

  // If it gets huge, let it dominate the screen.
  if (noCount >= 14) {
    yesBtn.style.position = "fixed";
    yesBtn.style.left = "50%";
    yesBtn.style.top = "50%";
    yesBtn.style.transform = "translate(-50%, -50%) scale(10)";
    yesBtn.style.padding = "18px 34px";
    yesBtn.style.zIndex = "9999";
    noBtn.style.display = "none";
    subtext.textContent = "There is only one correct answer now 🙂";
  }
}

noBtn.addEventListener("mouseenter", () => {
  if (noCount >= 2) moveNoButton();
});

noBtn.addEventListener("click", () => {
  noCount += 1;

  const phrase = noPhrases[clamp(noCount, 0, noPhrases.length - 1)];
  noBtn.textContent = phrase;

  gif.src = noCount >= 2 ? gifStates.pleading : gifStates.normal;

  // Start dodging after a couple of clicks
  if (noCount >= 2) moveNoButton();

  // Make “Yes” harder to ignore 😈
  growYesButton();

  // Extra message changes
  if (noCount === 6) subtext.textContent = "My feelings are at stake here…";
  if (noCount === 10) subtext.textContent = "This is getting personal.";
});

yesBtn.addEventListener("click", () => {
  card.classList.add("success");

  gif.src = gifStates.yay;
  question.textContent = "YAY!! 💖";
  subtext.textContent = "See you soon 😘";

  // Simple heart confetti
  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.textContent = "💗";
    heart.style.position = "fixed";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `-10vh`;
    heart.style.fontSize = `${14 + Math.random() * 24}px`;
    heart.style.transition = "transform 2.4s linear, opacity 2.4s linear";
    heart.style.zIndex = "9999";
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = `translateY(${110 + Math.random() * 40}vh) rotate(${Math.random() * 360}deg)`;
      heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), 2600);
  }
});

// Keep the runaway button in-bounds on resize
window.addEventListener("resize", () => {
  if (noCount >= 2) moveNoButton();
});
