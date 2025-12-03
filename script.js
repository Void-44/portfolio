// ---------- Small interactive behavior ----------

// Typing line in hero (simple looped typer)
const phrases = [
  "I build beautiful UI.",
  "I optimize for speed & accessibility.",
  "I ship with Tailwind & React."
];
let idx = 0, char = 0, forward = true;
const typeEl = document.getElementById('type-line');

function typeTick() {
  if (!typeEl) return;
  const current = phrases[idx];
  if (forward) {
    char++;
    if (char > current.length) { forward = false; setTimeout(typeTick, 1100); return; }
  } else {
    char--;
    if (char < 0) { forward = true; idx = (idx+1) % phrases.length; setTimeout(typeTick, 300); return; }
  }
  typeEl.textContent = current.slice(0, char);
  setTimeout(typeTick, forward ? 60 : 32);
}
typeTick();

// Set year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Make project cards clickable (open data-live)
// FINAL FIX — Handles card clicks & button clicks correctly

document.querySelectorAll("article[data-live], article[data-code]").forEach(card => {

  // When card itself is clicked
  card.addEventListener("click", () => {
    const live = card.dataset.live;
    const code = card.dataset.code;

    if (live && live !== "#") {
      window.open(live, "_blank");
      return;
    }

    if (code && code !== "#") {
      window.open(code, "_blank");
      return;
    }
  });

  // Stop buttons inside the card from triggering the card click
  card.querySelectorAll("a").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // ← THIS IS THE FIX
    });
  });

});
// small toast notifier
function notify(text) {
  const t = document.createElement('div');
  t.textContent = text;
  t.className = 'fixed left-1/2 -translate-x-1/2 bottom-10 bg-black/70 text-white px-4 py-2 rounded-md z-50';
  document.body.appendChild(t);
  setTimeout(()=> t.style.opacity = '0', 1600);
  setTimeout(()=> t.remove(), 2000);
}