
// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.className = currentTheme + '-theme';
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.className = 'dark-theme';
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    } else {
        body.className = 'light-theme';
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
    }
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
}

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

mobileToggle.addEventListener('click', () => {
    sidebar.classList.add('show');
    overlay.classList.add('show');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
});

// Skill Progress Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';

        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Trigger skill animation when page loads
window.addEventListener('load', () => {
    setTimeout(animateSkills, 1000);
});

const navItems = document.querySelectorAll('.nav-item');
navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        // Only prevent default if it's a # link
        if (item.getAttribute('href') === '#') {
            e.preventDefault();
        }

        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');

        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        item.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Close mobile menu
        if (window.innerWidth <= 992) {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
            mobileToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
});

// Add scroll animations
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
document.querySelectorAll('.section-title, .about-intro, .personal-info, .skills-section, .timeline-section').forEach(el => {
    observer.observe(el);
});
