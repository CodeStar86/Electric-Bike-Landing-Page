// Theme toggle (dark default look)
const root = document.documentElement;
if (!localStorage.getItem('theme')) localStorage.setItem('theme','dark');
if (localStorage.getItem('theme') === 'dark') root.classList.add('dark');
const themeBtn = document.getElementById('themeToggle'); if (themeBtn) themeBtn.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
});

// Particles (floating neon blobs)
(function(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  window.addEventListener('resize', resize); resize();

  const colors = ['#60a5fa','#22d3ee','#a78bfa','#34d399','#f59e0b','#f472b6'];
  const dots = Array.from({length: 24}).map(()=> ({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: 6 + Math.random()*10,
    dx: (-0.5 + Math.random())*0.6,
    dy: (-0.5 + Math.random())*0.6,
    c: colors[Math.floor(Math.random()*colors.length)],
    a: 0.15 + Math.random()*0.25
  }));

  function tick(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (const d of dots){
      d.x += d.dx; d.y += d.dy;
      if (d.x < -50) d.x = canvas.width+50;
      if (d.x > canvas.width+50) d.x = -50;
      if (d.y < -50) d.y = canvas.height+50;
      if (d.y > canvas.height+50) d.y = -50;
      const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r*4);
      grd.addColorStop(0, d.c + Math.floor(d.a*255).toString(16));
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r*4, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

// Countdown (rolling 14 days from first view)
const ms = { day: 86400000, hour: 3600000, minute: 60000, second: 1000 };
let start = +localStorage.getItem('revealStart') || Date.now();
localStorage.setItem('revealStart', String(start));
const target = start + 14 * ms.day;
function drawCountdown() {
  const now = Date.now();
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / ms.day); diff %= ms.day;
  const hours = Math.floor(diff / ms.hour); diff %= ms.hour;
  const minutes = Math.floor(diff / ms.minute); diff %= ms.minute;
  const seconds = Math.floor(diff / ms.second);
  const units = [['Days',days],['Hours',hours],['Minutes',minutes],['Seconds',seconds]];
  const el = document.getElementById('countdown');
  el.innerHTML = units.map(([u,v]) => `
    <div class="text-center">
      <div class="px-6 py-5 rounded-xl bg-white/[0.06] border border-white/20 shadow-glass">
        <div class="text-3xl font-mono">${String(v).padStart(2,'0')}</div>
      </div>
      <div class="mt-2 text-white/70">${u}</div>
    </div>
  `).join('');
}
setInterval(drawCountdown, 1000); drawCountdown();

  

// Share buttons
document.querySelectorAll('[data-share]').forEach(el => {
  el.addEventListener('click', () => {
    const type = el.getAttribute('data-share');
    const url = encodeURIComponent(location.href);
    const text = encodeURIComponent('Electric Revolution — The Big Reveal');
    let share = '';
    if (type === 'twitter') share = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    if (type === 'linkedin') share = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    if (type === 'instagram') alert('Open Instagram to share this page.');
    if (share) window.open(share, '_blank', 'noopener');
  });
});

// Waitlist form
const form = document.getElementById('waitlistForm');
const email = document.getElementById('emailInput');
const success = document.getElementById('successMsg');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  if (!email || !email.value) return;
  success.classList.remove('hidden');
  setTimeout(() => success.classList.add('hidden'), 4000);
  email.value='';
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();


// Reveal button -> unblur image
// Toggle reveal on the demo-card container (pseudo-element background)


// Unified reveal handler (works with DIV background + vignette)
(() => {
  const btn = document.getElementById('revealBtn');
  const card = document.querySelector('.demo-card');
  const vignette = document.querySelector('.demo-vignette');
  const bg = document.getElementById('revealBg');
  if (!btn || !card) return;
  btn.addEventListener('click', () => {
    card.classList.add('revealed');
    if (bg) { /* CSS handles filter via .revealed */ }
    if (vignette) vignette.style.opacity = '0';
    // btn.textContent = '✅ Revealed';
    btn.disabled = true;
    btn.classList.add('opacity-80');
    btn.remove(btn)
    document.querySelector('.rmreveal').innerHTML="";

  });
})();
