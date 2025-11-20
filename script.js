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

