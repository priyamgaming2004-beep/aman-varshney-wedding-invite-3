const preloader = document.getElementById("preloader");
const enterBtn = document.getElementById("enterBtn");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const nav = document.getElementById("nav");

// Opening interaction + optional background music.
enterBtn.addEventListener("click", async () => {
  preloader.classList.add("hide");
  document.body.classList.remove("locked");
  try {
    await music.play();
    musicToggle.classList.add("playing");
  } catch (_) {
    // Browsers may block playback when no music file exists.
  }
});
document.body.classList.add("locked");

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try { await music.play(); musicToggle.classList.add("playing"); } catch (_) {}
  } else {
    music.pause();
    musicToggle.classList.remove("playing");
  }
});

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
}, {passive:true});

// Countdown: wedding starts at 1 Dec 2026, 1:00 PM IST.
const weddingDate = new Date("2026-12-01T13:00:00+05:30").getTime();
function updateCountdown(){
  let diff = Math.max(0, weddingDate - Date.now());
  const d = Math.floor(diff / 86400000); diff %= 86400000;
  const h = Math.floor(diff / 3600000); diff %= 3600000;
  const m = Math.floor(diff / 60000); diff %= 60000;
  const s = Math.floor(diff / 1000);
  document.getElementById("days").textContent = String(d).padStart(2,"0");
  document.getElementById("hours").textContent = String(h).padStart(2,"0");
  document.getElementById("minutes").textContent = String(m).padStart(2,"0");
  document.getElementById("seconds").textContent = String(s).padStart(2,"0");
}
updateCountdown(); setInterval(updateCountdown,1000);

// Scroll reveals.
const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){ entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  });
},{threshold:.12, rootMargin:"0px 0px -30px 0px"});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

// Gentle hero parallax.
const heroPhoto = document.querySelector(".hero__photo");
window.addEventListener("scroll",()=>{
  if(heroPhoto && window.scrollY < window.innerHeight * 1.2){
    heroPhoto.style.transform = `scale(1.04) translateY(${window.scrollY * .08}px)`;
  }
},{passive:true});

// Gallery lightbox.
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
document.querySelectorAll(".gallery-grid img").forEach(img=>{
  img.addEventListener("click",()=>{
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
  });
});
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  lightboxImg.src="";
}
document.getElementById("lightboxClose").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",(e)=>{ if(e.target===lightbox) closeLightbox(); });
document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") closeLightbox(); });
