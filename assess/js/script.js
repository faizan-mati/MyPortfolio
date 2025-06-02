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
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Enhanced Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');

    const icon = mobileToggle.querySelector('i');
    icon.className = sidebar.classList.contains('show') ? 'fas fa-times' : 'fas fa-bars';
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
    mobileToggle.querySelector('i').className = 'fas fa-bars';
});

// Enhanced navigation functionality
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        if (item.getAttribute('href') === '#') e.preventDefault();

        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

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

        setTimeout(() => ripple.remove(), 600);

        if (window.innerWidth <= 992) {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
            mobileToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
        mobileToggle.querySelector('i').className = 'fas fa-bars';
    }
});

// Enhanced smooth scrolling
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

// Enhanced CTA button interactions
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('mouseenter', () => {
    ctaButton.style.transform = 'translateY(-5px) scale(1.05)';
});
ctaButton.addEventListener('mouseleave', () => {
    ctaButton.style.transform = 'translateY(0) scale(1)';
});

// Add parallax effect to hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Typing animation for name and title
const nameElement = document.getElementById('typing-name');
const titleElement = document.getElementById('typing-title');
const nameText = "Faizan Mati";
const titles = ["Web Developer", "UI/UX Designer"];
let nameIndex = 0;
let titleIndex = 0;
let currentTitleIndex = 0;
let isDeleting = false;

function typeName() {
    const currentText = nameText.substring(0, nameIndex);
    nameElement.innerHTML = currentText;

    if (nameIndex < nameText.length) {
        nameIndex++;
        setTimeout(typeName, 100);
    }
    // Stops after typing once
}

function typeTitle() {
    const currentTitle = titles[currentTitleIndex];
    const currentText = currentTitle.substring(0, titleIndex);
    titleElement.innerHTML = currentText;

    if (!isDeleting && titleIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(typeTitle, 2000);
    } else if (isDeleting && titleIndex === 0) {
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        setTimeout(typeTitle, 500);
    } else {
        titleIndex += isDeleting ? -1 : 1;
        setTimeout(typeTitle, isDeleting ? 50 : 100);
    }
}

// Start animations when page loads
window.addEventListener('load', () => { 
    setTimeout(typeName, 1000);     // Name typed once
    setTimeout(typeTitle, 1500);    // Titles loop forever

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
