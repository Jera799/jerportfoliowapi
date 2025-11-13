// 🌌 Lightbox
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  lbImg.src = src;
  lb.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

// 🧭 Scroll to Section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 🖼️ Preload Project Images
const projectImages = [
  'images/ss(1).png','images/ss(2).png','images/ss(3).png',
  'images/ss(4).png','images/ss(5).png','images/ss(6).png','images/ss(7).png'
];
projectImages.forEach(src => { const img = new Image(); img.src = src; });

// 💬 Quote (quotable.io)
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const refreshBtn = document.getElementById("refresh-quote");

function fadeIn(el) {
  el.style.opacity = 0;
  el.style.transition = "opacity 0.8s ease";
  requestAnimationFrame(() => { el.style.opacity = 1; });
}

async function loadQuote() {
  quoteText.textContent = "Loading quote...";
  authorText.textContent = "";
  quoteText.style.opacity = 0;
  authorText.style.opacity = 0;

  try {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    quoteText.textContent = `"${data.content}"`;
    authorText.textContent = `– ${data.author}`;
    fadeIn(quoteText);
    fadeIn(authorText);
  } catch {
    quoteText.textContent = `"Stay positive, work hard, make it happen."`;
    authorText.textContent = "– Unknown";
    fadeIn(quoteText);
    fadeIn(authorText);
  }
}

// Load first quote and attach button
loadQuote();
refreshBtn.addEventListener("click", loadQuote);

// 🌤️ Weather API
const weatherEl = document.getElementById("weather");
const apiKey = "61057798ffe98e2e6e9dfdea7ba21f57";
const city = "Malolos City,PH";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    weatherEl.textContent = `${data.main.temp}°C, ${data.weather[0].description}, feels like ${data.main.feels_like}°C, humidity ${data.main.humidity}%`;
  })
  .catch(() => { weatherEl.textContent = "Failed to load weather."; });
