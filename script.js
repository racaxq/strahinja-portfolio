// =================== STARS ===================
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  const size = Math.random() * 2.5 + 0.5;
  star.style.cssText = `
    width:${size}px; height:${size}px;
    top:${Math.random() * 75}%;
    left:${Math.random() * 100}%;
    animation-delay:${Math.random() * 3}s;
    animation-duration:${Math.random() * 2 + 1.5}s;
  `;
  starsContainer.appendChild(star);
}

// =================== TYPING ===================
const roles = [
  "Full Stack Developer 💻",
  "Shopware Wizard 🧙‍♂️",
  "Symfony Samurai ⚔️",
  "PHP Craftsman 🛠️",
  "Mentor Mode Activated 🎓",
  "River Side Coder 🎣"
];
let rIdx = 0, cIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');
function type() {
  const full = roles[rIdx];
  if (deleting) {
    typingEl.textContent = full.substring(0, cIdx--);
  } else {
    typingEl.textContent = full.substring(0, cIdx++);
  }
  if (!deleting && cIdx === full.length + 1) { deleting = true; setTimeout(type, 1500); return; }
  if (deleting && cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; setTimeout(type, 300); return; }
  setTimeout(type, deleting ? 45 : 95);
}
type();

// =================== SCROLL: MOON / SUN / SKY ===================
const moon = document.getElementById('moon');
const sun  = document.getElementById('sun');
const sky  = document.getElementById('sky');
const heroH = document.querySelector('.hero').offsetHeight;

window.addEventListener('scroll', () => {
  const s = window.scrollY;
  const pct = Math.min(s / (heroH * 0.8), 1); // 0 → 1

  // Moon: starts top:60px right:12%, sinks and fades
  const moonTop = 60 + pct * 250;
  moon.style.top = moonTop + 'px';
  moon.style.opacity = Math.max(0, 1 - pct * 1.5);

  // Stars fade
  starsContainer.style.opacity = Math.max(0, 1 - pct * 1.5);

  // Sun rises: opacity comes in after pct > 0.3
  const sunOpacity = Math.max(0, (pct - 0.3) / 0.7);
  sun.style.opacity = sunOpacity;

  // Sky color: night → golden hour
  const r1 = Math.round(10  + pct * 120);
  const g1 = Math.round(10  + pct * 60);
  const b1 = Math.round(26  + pct * 20);
  const r2 = Math.round(26  + pct * 180);
  const g2 = Math.round(5   + pct * 70);
  const b2 = Math.round(51  + pct * 20);
  sky.style.background = `linear-gradient(to bottom, rgb(${r1},${g1},${b1}) 0%, rgb(${r2},${g2},${b2}) 60%, rgb(100,40,10) 100%)`;
});

// =================== REVEAL ON SCROLL ===================
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.15 });
reveals.forEach(r => observer.observe(r));

// =================== SKILL BARS ===================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fills = e.target.querySelectorAll('.skill-fill[data-width]');
      fills.forEach(f => { f.style.width = f.dataset.width; });
    }
  });
}, { threshold: 0.3 });
document.querySelector('.skills-section') && skillObserver.observe(document.querySelector('.skills-section'));