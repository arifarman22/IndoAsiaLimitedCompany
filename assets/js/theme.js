/* IndoAsia Trading - Unified Theme JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE NAVIGATION =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn && mainNav) {
        // Ensure ARIA attributes are set
        mobileMenuBtn.setAttribute('aria-controls', 'mainNav');
        if (!mobileMenuBtn.hasAttribute('aria-expanded')) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }

        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const isOpen = mainNav.classList.toggle('open');
            mobileMenuBtn.classList.toggle('active', isOpen);
            mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            
            // Prevent body scroll when menu is open
            document.body.classList.toggle('no-scroll', isOpen);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mainNav.classList.contains('open')) return;
            const target = e.target;
            if (mainNav.contains(target) || mobileMenuBtn.contains(target)) return;
            
            mainNav.classList.remove('open');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
            
            // Close any open dropdowns
            document.querySelectorAll('.dropdown-menu.show').forEach(m => m.classList.remove('show'));
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // ===== DROPDOWN FUNCTIONALITY =====
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!toggle || !menu) return;

        // Mobile dropdown toggle
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                menu.classList.toggle('show');
            }
        });

        // Desktop hover behavior is handled by CSS
    });

    // ===== STICKY HEADER =====
    const header = document.getElementById('mainHeader');
    if (header) {
        let lastScrollY = window.scrollY;
        
        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
            
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', updateHeader, { passive: true });
        updateHeader(); // Initial call
    }

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in, .scale-in').forEach(el => {
        fadeObserver.observe(el);
    });

    // ===== STAGGER ANIMATIONS =====
    document.querySelectorAll('.stagger-container').forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.style.setProperty('--i', index);
        });
    });

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== FORM ENHANCEMENTS =====
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Add loading state to form submissions
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                
                // Re-enable after 3 seconds (adjust based on your needs)
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 3000);
            }
        });

        // Enhanced form validation feedback
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = 'var(--error)';
                } else {
                    this.style.borderColor = 'var(--border)';
                }
            });

            input.addEventListener('input', function() {
                if (this.style.borderColor === 'var(--error)' && this.value.trim()) {
                    this.style.borderColor = 'var(--success)';
                }
            });
        });
    });

    // ===== LOADING OVERLAY =====
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        // Hide loading overlay when page is fully loaded
        window.addEventListener('load', function() {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 300);
        });
    }

    // ===== ANIMATED COUNTERS =====
    const animateCounters = () => {
        document.querySelectorAll('[data-count]').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '+');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.textContent.includes('%') ? '%' : '+');
                }
            };

            updateCounter();
        });
    };

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stats-section, .stats-grid').forEach(section => {
        statsObserver.observe(section);
    });

    // ===== LIGHTBOX FOR IMAGES =====
    const createLightbox = () => {
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.className = 'lightbox-overlay';
        lightboxOverlay.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img src="" alt="">
        `;
        document.body.appendChild(lightboxOverlay);

        const lightboxImg = lightboxOverlay.querySelector('img');
        const closeBtn = lightboxOverlay.querySelector('.lightbox-close');

        // Open lightbox
        document.querySelectorAll('.lightboxable').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                lightboxOverlay.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close lightbox
        const closeLightbox = () => {
            lightboxOverlay.classList.remove('show');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', function(e) {
            if (e.target === this) closeLightbox();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightboxOverlay.classList.contains('show')) {
                closeLightbox();
            }
        });
    };

    // Initialize lightbox if lightboxable images exist
    if (document.querySelector('.lightboxable')) {
        createLightbox();
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Handle responsive changes
            if (window.innerWidth > 968 && mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('no-scroll');
            }
        }, 250);
    });

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content ID if it doesn't exist
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main-content';
    }

    // Focus management for mobile menu
    if (mobileMenuBtn && mainNav) {
        const focusableElements = mainNav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        
        mobileMenuBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
                
                if (mainNav.classList.contains('open') && focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
            }
        });
    }

    console.log('IndoAsia Trading theme initialized successfully');
});

// ===== UTILITY FUNCTIONS =====

// Smooth scroll to element
function scrollToElement(elementId, offset = 80) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Show notification
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--${type === 'error' ? 'error' : type === 'success' ? 'success' : 'info'});
        color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
        return `+880 ${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Export functions for global use
window.IndoAsiaTheme = {
    scrollToElement,
    showNotification,
    formatPhoneNumber,
    isValidEmail
};