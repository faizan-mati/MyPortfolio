
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

// Mobile Sidebar Toggle
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

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Create WhatsApp message
    const whatsappMessage = `Hi Faizan! I'm ${name}.\n\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nSubject: ${subject}\n\nMessage: ${message}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Open WhatsApp with the message
    const whatsappURL = `https://wa.me/923243354582?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    // Show success message
    alert('Thank you for your message! You\'ll be redirected to WhatsApp to send the message.');

    // Reset form
    contactForm.reset();
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

// Add loading animation for form submission
const submitBtn = document.querySelector('.submit-btn');
const originalBtnContent = submitBtn.innerHTML;

contactForm.addEventListener('submit', () => {
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
    submitBtn.disabled = true;

    // Reset button after 2 seconds
    setTimeout(() => {
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
    }, 2000);
});

// Add hover effects for contact items
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px) scale(1.02)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0) scale(1)';
    });
});

// Add click to copy functionality for contact info
const emailItem = document.querySelector('.contact-item:first-child');
const phoneItem = document.querySelector('.contact-item:nth-child(2)');

emailItem.addEventListener('click', () => {
    navigator.clipboard.writeText('faizanmati99@gmail.com').then(() => {
        showCopyNotification('Email copied to clipboard!');
    });
});

phoneItem.addEventListener('click', () => {
    navigator.clipboard.writeText('+92 324 3354582').then(() => {
        showCopyNotification('Phone number copied to clipboard!');
    });
});

function showCopyNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--gradient-primary);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(255, 71, 87, 0.3);
                z-index: 9999;
                animation: slideInRight 0.3s ease;
                font-weight: 600;
            `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);
