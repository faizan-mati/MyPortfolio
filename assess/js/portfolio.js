
// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
body.className = `${savedTheme}-theme`;
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.className = `${newTheme}-theme`;
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');

    const icon = mobileToggle.querySelector('i');
    if (sidebar.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
    const icon = mobileToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio item animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(item);
});

// Add loading animation for images
document.querySelectorAll('.project-image').forEach(img => {
    img.addEventListener('load', function () {
        this.style.opacity = '1';
    });

    img.addEventListener('error', function () {
        this.src = 'https://via.placeholder.com/500x300/FF4757/ffffff?text=Project+Image';
    });
});

// Add parallax effect to floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');

    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add hover effect for tech badges
document.querySelectorAll('.tech-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });

    badge.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animate stats on scroll
const animateStats = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const finalValue = stat.textContent;
                const isNumeric = !isNaN(parseInt(finalValue));

                if (isNumeric) {
                    const startValue = 0;
                    const endValue = parseInt(finalValue);
                    const duration = 2000;
                    const stepTime = 50;
                    const steps = duration / stepTime;
                    const increment = endValue / steps;
                    let current = startValue;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= endValue) {
                            current = endValue;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '') + (finalValue.includes('★') ? '★' : '') + (finalValue.includes('%') ? '%' : '') + (finalValue.includes('K') ? 'K' : '');
                    }, stepTime);
                }
            });
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5,
    rootMargin: '0px'
});

document.querySelectorAll('.project-stats').forEach(stats => {
    statsObserver.observe(stats);
});
