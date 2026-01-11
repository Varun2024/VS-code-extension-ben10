const alien = document.getElementById("alien");

setInterval(() => {
  const offset = Math.random() * 80;
  alien.style.right = `${20 + offset}px`;
}, 2500);
