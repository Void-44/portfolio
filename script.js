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
function openProject(card) {
  const live = card.getAttribute('data-live');
  const code = card.getAttribute('data-code');
  if (live && live !== '#') {
    window.open(live, '_blank', 'noopener');
    return;
  }
  // if no live link, offer to open code if it exists
  if (code && code !== '#') {
    window.open(code, '_blank', 'noopener');
    return;
  }
  // fallback toast
  notify("Project link not set — edit data-live / data-code in index.html");
}

// small toast notifier
function notify(text) {
  const t = document.createElement('div');
  t.textContent = text;
  t.className = 'fixed left-1/2 -translate-x-1/2 bottom-10 bg-black/70 text-white px-4 py-2 rounded-md z-50';
  document.body.appendChild(t);
  setTimeout(()=> t.style.opacity = '0', 1600);
  setTimeout(()=> t.remove(), 2000);
}