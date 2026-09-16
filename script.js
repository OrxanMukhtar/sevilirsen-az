const video = document.getElementById('heroVideo');
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

// Intro video starts as soon as the first screen is ready.
const playIntro = async () => {
  try {
    video.currentTime = 0;
    await video.play();
  } catch (_) {
    // Autoplay can only be blocked by some browser configurations.
    // The video remains available with native controls if needed.
  }
};

if (video.readyState >= 2) playIntro();
else video.addEventListener('canplay', playIntro, { once: true });

// Keep the landing page clean: when the intro ends, gently reveal the CTA area.
video.addEventListener('ended', () => {
  document.body.classList.add('intro-finished');
});

// Smooth active navigation state.
const sections = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('nav a')];
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { threshold: 0.45 });
sections.forEach(section => observer.observe(section));
