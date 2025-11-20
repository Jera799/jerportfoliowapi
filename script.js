// Lightbox
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  lbImg.src = src;
  lb.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

// Scroll to Section (Dashboard)
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Preload Project Images (to avoid lightbox lag)
const projectImages = [
  'images/ss(1).png',
  'images/ss(2).png',
  'images/ss(3).png',
  'images/ss(4).png',
  'images/ss(5).png',
  'images/ss(6).png',
  'images/ss(7).png'
];

projectImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

// Weather API
const weatherEl = document.getElementById("weather");
const apiKey = "61057798ffe98e2e6e9dfdea7ba21f57";
const city = "Malolos City,PH";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    weatherEl.textContent = `${data.main.temp}°C, ${data.weather[0].description}, feels like ${data.main.feels_like}°C, humidity ${data.main.humidity}%`;
  })
  .catch(() => {
    weatherEl.textContent = "Failed to load weather.";
  });

// Moving Dust Background
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    alpha: Math.random() * 0.8 + 0.2
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,255,255,${p.alpha})`;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x > width) p.x = 0;
    if (p.x < 0) p.x = width;
    if (p.y > height) p.y = 0;
    if (p.y < 0) p.y = height;
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});


