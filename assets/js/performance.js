// Performance optimization utilities for IndoAsia Trading
(function() {
    'use strict';
    
    // Lazy loading for images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Preload critical resources
    function preloadCriticalResources() {
        const criticalResources = [
            'assets/css/main.min.css',
            'assets/images/logo-bg.png',
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Source+Sans+Pro:wght@300;400;600;700&display=swap'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            if (resource.endsWith('.css')) {
                link.as = 'style';
            } else if (resource.endsWith('.png') || resource.endsWith('.jpg') || resource.endsWith('.jpeg')) {
                link.as = 'image';
            } else if (resource.includes('fonts.googleapis.com')) {
                link.as = 'style';
            }
            document.head.appendChild(link);
        });
    }
    
    // Optimize animations for reduced motion
    function optimizeAnimations() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition', 'none');
            document.querySelectorAll('*').forEach(el => {
                el.style.animationDuration = '0.01ms';
                el.style.animationIterationCount = '1';
                el.style.transitionDuration = '0.01ms';
            });
        }
    }
    
    // Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize scroll events
    function optimizeScrollEvents() {
        const scrollHandler = debounce(() => {
            const header = document.getElementById('mainHeader');
            if (header) {
                if (window.scrollY > 100) {
                    header.classList.add('sticky');
                } else {
                    header.classList.remove('sticky');
                }
            }
        }, 10);
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
    }
    
    // Initialize performance optimizations
    function init() {
        // Preload critical resources
        preloadCriticalResources();
        
        // Initialize lazy loading
        initLazyLoading();
        
        // Optimize animations
        optimizeAnimations();
        
        // Optimize scroll events
        optimizeScrollEvents();
        
        // Add loading performance metrics
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                console.log(`Page load time: ${loadTime}ms`);
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
