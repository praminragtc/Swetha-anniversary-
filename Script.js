// Floating Hearts

const heartsContainer = document.querySelector(".hearts");

function createHeart() {

const heart = document.createElement("div");

heart.classList.add("heart");

heart.innerHTML = "❤";

heart.style.left = Math.random() * 100 + "vw";

heart.style.fontSize =
Math.random() * 25 + 15 + "px";

heart.style.animationDuration =
Math.random() * 5 + 5 + "s";

heartsContainer.appendChild(heart);

setTimeout(() => {
heart.remove();
}, 10000);
}

setInterval(createHeart, 300);

// Countdown

const anniversaryDate =
new Date("June 17, 2026 00:00:00");

function updateCountdown() {

const now = new Date();

const diff = anniversaryDate - now;

const days =
Math.floor(diff / (1000 * 60 * 60 * 24));

const hours =
Math.floor(
(diff % (1000 * 60 * 60 * 24))
/ (1000 * 60 * 60)
);

const minutes =
Math.floor(
(diff % (1000 * 60 * 60))
/ (1000 * 60)
);

const seconds =
Math.floor(
(diff % (1000 * 60))
/ 1000
);

document.getElementById("countdown").innerHTML =
❤️ ${days}d ${hours}h ${minutes}m ${seconds}s ❤️;
}

setInterval(updateCountdown, 1000);

updateCountdown();