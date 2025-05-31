
        // Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const themeIcon = themeToggle.querySelector('i');

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light-theme';
        body.className = savedTheme;
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
            const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
            
            body.className = newTheme;
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            if (theme === 'dark-theme') {
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
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
        });

        // Close mobile menu when clicking nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    sidebar.classList.remove('show');
                    overlay.classList.remove('show');
                }
            });
        });

        // Smooth scroll behavior for internal links
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

        // Observe portfolio cards for animation
        document.querySelectorAll('.portfolio-card').forEach(card => {
            observer.observe(card);
        });

        // Preloader effect
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });

        // Add hover sound effect (optional - commented out to avoid audio issues)
        /*
        const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTUFGWm98N2IQAm2L3LLaM9ZzAHqxT+aNAL3uj1SYCzexTWaNAJ3uj1SYCfkxT+Zbj...');
        
        document.querySelectorAll('.nav-item, .portfolio-card, .resume-btn').forEach(element => {
            element.addEventListener('mouseenter', () => {
                // hoverSound.currentTime = 0;
                // hoverSound.play().catch(() => {});
            });
        });
        */

        // Enhanced portfolio card interactions
        document.querySelectorAll('.portfolio-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Dynamic greeting based on time
        function updateGreeting() {
            const hour = new Date().getHours();
            const greetingElement = document.querySelector('.greeting');
            
            if (greetingElement) {
                let greeting;
                if (hour < 12) greeting = 'Good Morning';
                else if (hour < 17) greeting = 'Good Afternoon'; 
                else greeting = 'Good Evening';
                
                greetingElement.textContent = greeting;
            }
        }

        // Initialize greeting
        updateGreeting();

        // Add loading states for demo buttons
        document.querySelectorAll('.demo-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Loading...</span>';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.pointerEvents = 'auto';
                    
                    // Show the alert after loading
                    const projectName = this.closest('.portfolio-card').querySelector('.portfolio-title').textContent;
                    alert(`Demo link for ${projectName} - This would normally open the live project!`);
                }, 1000);
            });
        });

        // Performance optimization - lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Add parallax effect to portfolio section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0;
            
            document.querySelectorAll('.portfolio-image').forEach(image => {
                image.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        });

        // Enhanced accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                sidebar.classList.remove('show');
                overlay.classList.remove('show');
            }
        });

        // Focus management for accessibility
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('focus', () => {
                item.style.outline = '2px solid var(--primary-color)';
                item.style.outlineOffset = '2px';
            });
            
            item.addEventListener('blur', () => {
                item.style.outline = 'none';
            });
        });
