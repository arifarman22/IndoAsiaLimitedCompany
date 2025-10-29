// Unified Animation System
(function() {
    'use strict';

    const AnimationController = {
        init() {
            this.setupScrollAnimations();
            this.setupTextAnimations();
            this.setupCounterAnimations();
        },

        setupScrollAnimations() {
            const elements = document.querySelectorAll('.animate-on-scroll, .fade-in');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated', 'visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

            elements.forEach(el => observer.observe(el));
        },

        setupTextAnimations() {
            const textElements = document.querySelectorAll('.text-animate');
            textElements.forEach(el => {
                const text = el.textContent.trim();
                const words = text.split(/(\s+)/).filter(Boolean);
                el.innerHTML = words.map(w => 
                    /\s+/.test(w) ? w : `<span class="ta-word">${w}</span>`
                ).join('');
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const words = entry.target.querySelectorAll('.ta-word');
                        words.forEach((word, i) => {
                            setTimeout(() => word.classList.add('animated'), i * 80);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            textElements.forEach(el => observer.observe(el));
        },

        setupCounterAnimations() {
            const counters = document.querySelectorAll('[data-count]');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));
        },

        animateCounter(element) {
            const target = parseInt(element.dataset.count);
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.floor(progress * (target - start) + start);
                element.textContent = value + (element.dataset.suffix || '');
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AnimationController.init());
    } else {
        AnimationController.init();
    }

    window.AnimationController = AnimationController;
})();
