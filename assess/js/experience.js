
// Complete JavaScript for Faizan Mati Portfolio Website

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const navItems = document.querySelectorAll('.nav-item');

// Theme Management
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Check for saved theme preference or default to light theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        this.updateThemeIcon(savedTheme);

        // Add event listener for theme toggle
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        this.setTheme(newTheme);
        this.updateThemeIcon(newTheme);
        localStorage.setItem('theme', newTheme);

        // Add smooth transition effect
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    }

    setTheme(theme) {
        body.className = theme + '-theme';
    }

    updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

// Mobile Navigation Manager
class MobileNavManager {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        // Mobile toggle event
        mobileToggle.addEventListener('click', () => this.toggleSidebar());

        // Overlay click to close
        overlay.addEventListener('click', () => this.closeSidebar());

        // Close sidebar on window resize if screen becomes large
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && this.isOpen) {
                this.closeSidebar();
            }
        });

        // Close sidebar when clicking on nav items (for mobile)
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    this.closeSidebar();
                }
            });
        });
    }

    toggleSidebar() {
        if (this.isOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    openSidebar() {
        sidebar.classList.add('show');
        overlay.classList.add('show');
        this.isOpen = true;
        // Change mobile toggle icon to close
        mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
        // Disable body scrolling
        document.body.style.overflow = 'hidden';
    }

    closeSidebar() {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
        this.isOpen = false;
        // Change mobile toggle icon back to menu
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        // Enable body scrolling
        document.body.style.overflow = '';
    }
}

// Smooth Scrolling for Navigation
class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Active Navigation Item Highlighter
// Fixed Active Navigation Item Highlighter
class NavHighlighter {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.navItems = document.querySelectorAll('.nav-item');
        this.init();
    }

    init() {
        // Since this is the experience page, keep the experience nav item active
        this.setActiveNavItem();

        // Optional: Add scroll-based highlighting for sections within this page
        window.addEventListener('scroll', () => this.highlightCurrentSection());
    }

    setActiveNavItem() {
        // Remove active class from all nav items
        this.navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Set active class based on current page
        const currentPage = window.location.pathname;

        this.navItems.forEach(item => {
            const href = item.getAttribute('href');

            // Check if this nav item matches the current page
            if (href === './experience.html' ||
                href === 'experience.html' ||
                (currentPage.includes('experience') && href.includes('experience'))) {
                item.classList.add('active');
            }
        });
    }

    highlightCurrentSection() {
        // Optional: You can add section-based highlighting here if needed
        // For now, just maintain the active state for the experience page
        let currentSection = '';

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 300) {
                currentSection = section.getAttribute('id');
            }
        });

        // Always keep experience nav item active since we're on the experience page
        this.navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && href.includes('experience')) {
                item.classList.add('active');
            }
        });
    }
}

// Animation Observer for Scroll Animations
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const animateElements = document.querySelectorAll('.skill-category, .timeline-item, .page-header, .skills-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileNavManager();
    new SmoothScroller();
    new NavHighlighter();
    new AnimationObserver();
});
