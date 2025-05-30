
// Fixed Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Initialize with light theme
let currentTheme = 'light';
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    // Toggle between light and dark themes
    if (currentTheme === 'light') {
        currentTheme = 'dark';
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    } else {
        currentTheme = 'light';
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    }

    updateThemeIcon(currentTheme);

    // Add animation feedback
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 150);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Enhanced Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');

    // Animate hamburger icon
    const icon = mobileToggle.querySelector('i');
    if (sidebar.classList.contains('show')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
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
const nameText = "Almi Mouraad";
const titles = ["Graphic Designer", "Web Developer", "UI/UX Designer"];
let nameIndex = 0;
let titleIndex = 0;
let currentTitleIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeName() {
    const currentText = nameText.substring(0, nameIndex);
    nameElement.innerHTML = currentText;

    if (!isEnd) {
        if (nameIndex < nameText.length) {
            nameIndex++;
            setTimeout(typeName, 100);
        } else {
            isEnd = true;
            setTimeout(typeName, 2000); // Pause at end
        }
    } else {
        if (nameIndex > 0) {
            nameIndex--;
            setTimeout(typeName, 50);
        } else {
            isEnd = false;
            setTimeout(typeName, 500); // Pause at start
        }
    }
}

function typeTitle() {
    const currentTitle = titles[currentTitleIndex];
    const currentText = currentTitle.substring(0, titleIndex);
    titleElement.innerHTML = currentText;

    if (!isDeleting && titleIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(typeTitle, 2000); // Pause at end of typing
    } else if (isDeleting && titleIndex === 0) {
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        setTimeout(typeTitle, 500); // Pause before typing next title
    } else {
        if (isDeleting) {
            titleIndex--;
        } else {
            titleIndex++;
        }
        setTimeout(typeTitle, isDeleting ? 50 : 100);
    }
}

// Start animations when page loads
window.addEventListener('load', () => {
    setTimeout(typeName, 1000);
    setTimeout(typeTitle, 1500);

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


