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
const projectImages = ['images/ss(1).png','images/ss(2).png','images/ss(3).png','images/ss(4).png','images/ss(5).png','images/ss(6).png','images/ss(7).png'];
projectImages.forEach(src => { const img = new Image(); img.src = src; });

// 💬 Quotes (no API)
const quotes = [
  { text: "Stay positive, work hard, make it happen.", author: "Unknown" },
  { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" }
];

const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const refreshBtn = document.getElementById("refresh-quote");

function fadeIn(el) {
  el.style.opacity = 0;
  el.style.transition = "opacity 0.8s ease";
  requestAnimationFrame(() => { el.style.opacity = 1; });
}

function loadQuote() {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = `"${q.text}"`;
  authorText.textContent = `– ${q.author}`;
  fadeIn(quoteText);
  fadeIn(authorText);
}

// Load first quote and set button
loadQuote();
refreshBtn.addEventListener("click", loadQuote);

// 🌤️ Weather API (your existing code)
const weatherEl = document.getElementById("weather");
const apiKey = "61057798ffe98e2e6e9dfdea7ba21f57";
const city = "Malolos City,PH";
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    weatherEl.textContent = `${data.main.temp}°C, ${data.weather[0].description}, feels like ${data.main.feels_like}°C, humidity ${data.main.humidity}%`;
  })
  .catch(() => { weatherEl.textContent = "Failed to load weather."; });
