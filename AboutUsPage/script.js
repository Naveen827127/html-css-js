// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');

const startCounters = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };

        updateCounter();
    });
};

// Intersection Observer for Stats Section
const statsSection = document.querySelector('.stats-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Parallax Effect for Hero Section
document.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Smooth Scroll for Mouse Icon
document.querySelector('.mouse-scroll-cont').addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// Dynamic Background Pattern
const hero = document.querySelector('.hero');
let pattern = '';
for (let i = 0; i < 100; i++) {
    pattern += `<div class="particle"></div>`;
}
const patternContainer = document.createElement('div');
patternContainer.className = 'pattern-container';
patternContainer.innerHTML = pattern;
hero.appendChild(patternContainer);