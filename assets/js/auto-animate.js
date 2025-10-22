// Auto-Animation Script - Adds animation classes to all pages
document.addEventListener('DOMContentLoaded', function() {
    // Skip if animations are already manually added
    if (document.querySelector('.fade-in, .scale-in, .zoom-in')) return;
    
    // Add animations to headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading, index) => {
        const animations = ['fade-in-left', 'fade-in-right', 'zoom-in', 'rotate-in'];
        heading.classList.add(animations[index % animations.length]);
    });
    
    // Add animations to paragraphs
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        if (!p.closest('.card, .info-card, .team-card')) {
            p.classList.add('fade-in');
        }
    });
    
    // Add animations to cards
    const cards = document.querySelectorAll('.card, .info-card, .team-card, .testimonial-card, .mv-card');
    cards.forEach((card, index) => {
        card.classList.add('scale-in', 'card-hover');
        card.style.setProperty('--i', index);
    });
    
    // Add animations to images
    const images = document.querySelectorAll('img:not(.logo-img)');
    images.forEach(img => {
        img.classList.add('zoom-in', 'hover-zoom');
    });
    
    // Add animations to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.classList.add('btn-animate');
    });
    
    // Add stagger animation to grids
    const grids = document.querySelectorAll('.services-grid, .team-grid, .stats-grid, .testimonials-grid, .mv-grid');
    grids.forEach(grid => {
        grid.classList.add('stagger-container');
    });
    
    // Add counter animation to stat numbers
    const statNumbers = document.querySelectorAll('.stat-number, .stat-value');
    statNumbers.forEach(stat => {
        if (!stat.hasAttribute('data-count')) {
            const text = stat.textContent.replace(/[^\d]/g, '');
            if (text) {
                stat.setAttribute('data-count', text);
                stat.classList.add('counter');
            }
        }
    });
    
    // Initialize animations
    if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
        initCounterAnimations();
        initStaggerAnimations();
        initButtonAnimations();
    }
});