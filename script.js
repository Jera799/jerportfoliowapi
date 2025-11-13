// =============================
// 🌌 Lightbox
// =============================
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  lbImg.src = src;
  lb.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

// =============================
// 🧭 Scroll to Section (Dashboard)
// =============================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// =============================
// 🖼️ Preload Project Images (to avoid lightbox lag)
// =============================
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

// =============================
// 💬 Quote API (Motivational & Random)
// =============================
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");

// Create a "New Quote" button dynamically
const quoteSection = document.getElementById("quote-section");
const refreshBtn = document.createElement("button");
refreshBtn.textContent = "New Quote";
refreshBtn.id = "refresh-quote";
refreshBtn.style.marginTop = "10px";
quoteSection.appendChild(refreshBtn);

// Fade animation helper
function fadeIn(element) {
  element.style.opacity = 0;
  element.style.transition = "opacity 0.8s ease";
  requestAnimationFrame(() => {
    element.style.opacity = 1;
  });
}

// Function to load a quote
async function loadQuote() {
  quoteText.textContent = "Loading quote...";
  authorText.textContent = "";
  quoteText.style.opacity = 0;
  authorText.style.opacity = 0;

  try {
    const response = await fetch("https://api.quotable.io/random?tags=motivational|inspirational");
    const data = await response.json();

    quoteText.textContent = `"${data.content}"`;
    authorText.textContent = `– ${data.author}`;

    fadeIn(quoteText);
    fadeIn(authorText);
  } catch (error) {
    quoteText.textContent = `"Creativity is intelligence having fun."`;
    authorText.textContent = `– Albert Einstein`;
    fadeIn(quoteText);
    fadeIn(authorText);
  }
}

// Load quote on startup and when clicking "New Quote"
loadQuote();
refreshBtn.addEventListener("click", loadQuote);

// =============================
// 🌤️ Weather API (OpenWeatherMap)
// =============================
const weatherEl = document.getElementById("weather");
const apiKey = "61057798ffe98e2e6e9dfdea7ba21f57"; // ⚠️ your own free key here
const city = "Malolos City,PH";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    weatherEl.textContent = `${data.main.temp}°C, ${data.weather[0].description}, feels like ${data.main.feels_like}°C, humidity ${data.main.humidity}%`;
  })
  .catch(() => {
    weatherEl.textContent = "Failed to load weather.";
  });

