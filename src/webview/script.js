console.log("ben10 script loaded");

const alien = document.getElementById("alien");

// Read aliens safely
const ALIENS = JSON.parse(alien.getAttribute("data-aliens"));
const alienKeys = Object.keys(ALIENS);

let currentIndex = 0;

// CLICK = TRANSFORM
alien.addEventListener("click", () => {
  console.log("clicked");
  currentIndex = (currentIndex + 1) % alienKeys.length;
  alien.src = ALIENS[alienKeys[currentIndex]];
});

let position = 20;
let direction = 1; // 1 = right, -1 = left
const SPEED = 1.2;

function walk() {
  const maxWidth = window.innerWidth - 140;

  position += SPEED * direction;

  if (position > maxWidth || position < 0) {
    direction *= -1;
    alien.style.transform = `scaleX(${direction})`;
  }

  alien.style.right = `${position}px`;

  requestAnimationFrame(walk);
}

walk();
