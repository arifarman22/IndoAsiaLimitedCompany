// Professional Animations JavaScript - IndoAsia Trading
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initCounterAnimations();
    initStaggerAnimations();
    initParallaxEffects();
    initButtonAnimations();
});

// Scroll-triggered animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .zoom-in, .rotate-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
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
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Stagger animations
function initStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('.stagger-container');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const children = container.children;
                
                Array.from(children).forEach((child, index) => {
                    child.style.setProperty('--i', index);
                });
                
                container.classList.add('visible');
                staggerObserver.unobserve(container);
            }
        });
    }, { threshold: 0.2 });
    
    staggerContainers.forEach(container => {
        staggerObserver.observe(container);
    });
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    const handleScroll = () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const rate = scrolled * -0.3;
            el.style.transform = `translateY(${rate}px)`;
        });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Button animations
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn, .card');
    
    buttons.forEach(btn => {
        btn.classList.add('btn-animate', 'card-hover');
        
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Utility function to add animation classes to elements
function addAnimationClasses() {
    // Add fade-in to common elements
    const headings = document.querySelectorAll('h1, h2, h3');
    const paragraphs = document.querySelectorAll('p');
    const cards = document.querySelectorAll('.card, .info-card, .team-card, .testimonial-card');
    const images = document.querySelectorAll('img');
    
    headings.forEach((heading, index) => {
        if (!heading.classList.contains('fade-in')) {
            heading.classList.add(index % 2 === 0 ? 'fade-in-left' : 'fade-in-right');
        }
    });
    
    paragraphs.forEach(p => {
        if (!p.classList.contains('fade-in')) {
            p.classList.add('fade-in');
        }
    });
    
    cards.forEach((card, index) => {
        if (!card.classList.contains('scale-in')) {
            card.classList.add('scale-in');
            card.style.setProperty('--i', index);
        }
    });
    
    images.forEach(img => {
        if (!img.classList.contains('zoom-in')) {
            img.classList.add('zoom-in');
        }
    });
}

// Auto-apply animations to common elements
addAnimationClasses();