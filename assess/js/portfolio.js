
// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.className = currentTheme + '-theme';

// Update icon based on current theme
if (currentTheme === 'dark') {
    themeIcon.className = 'fas fa-sun';
} else {
    themeIcon.className = 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.className = 'dark-theme';
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        body.className = 'light-theme';
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Menu Functionality
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
});

// Navigation Active State
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        const href = item.getAttribute('href');

        // Only prevent default for # links
        if (href === '#') {
            e.preventDefault();
            return;
        }

        // For internal links, handle smooth scrolling if needed
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({
                behavior: 'smooth'
            });
        }
        // For other links, allow normal navigation

        // Add active class and ripple effect
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Mobile menu handling
        if (window.innerWidth <= 992) {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
            mobileToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
});

// Smooth Scroll for Navigation
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

// Resume Download Hover Effect
const resumeBtn = document.querySelector('.resume-download-btn');
if (resumeBtn) {
    resumeBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.05)';
        this.style.boxShadow = '0 20px 40px rgba(255, 71, 87, 0.4)';
    });

    resumeBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(255, 71, 87, 0.3)';
    });
}

// Add dynamic theme styles for resume card
const style = document.createElement('style');
style.textContent = `
            .light-theme .resume-card {
                background: rgba(255, 255, 255, 0.9);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            }
            
            .dark-theme .resume-card {
                background: rgba(255, 255, 255, 0.05);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
        `;
document.head.appendChild(style);

// Intersection Observer for animations
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

// Observe all animated elements
document.querySelectorAll('.skill-category, .portfolio-card, .timeline-item').forEach(el => {
    observer.observe(el);
});
