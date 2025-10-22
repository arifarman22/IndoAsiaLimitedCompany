/**
 * Responsive Navigation Component for IndoAsia Trading
 * Unified mobile navigation solution for all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    initResponsiveNavigation();
});

function initResponsiveNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const dropdowns = document.querySelectorAll('.dropdown');
    const header = document.getElementById('mainHeader');

    // Mobile menu toggle functionality
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.setAttribute('aria-controls', 'mainNav');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');

        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = !mainNav.classList.contains('open');
            
            if (isOpen) {
                openMobileMenu();
            } else {
                closeMobileMenu();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('open') && 
                !mainNav.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close mobile menu on link click
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 968) {
                    closeMobileMenu();
                }
            });
        });
    }

    // Enhanced dropdown functionality
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const arrow = dropdown.querySelector('.dropdown-arrow');

        if (toggle && menu) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 968) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other open dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                            const otherArrow = otherDropdown.querySelector('.dropdown-arrow');
                            if (otherMenu) otherMenu.classList.remove('show');
                            if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
                        }
                    });

                    // Toggle current dropdown
                    const isActive = dropdown.classList.toggle('active');
                    menu.classList.toggle('show', isActive);
                    
                    // Animate arrow
                    if (arrow) {
                        arrow.style.transform = isActive ? 'rotate(180deg)' : 'rotate(0deg)';
                    }

                    // Animate dropdown menu
                    if (isActive) {
                        animateDropdownOpen(menu);
                    }
                }
            });
        }
    });

    // Sticky header functionality
    if (header) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    // Desktop dropdown hover functionality
    if (window.innerWidth > 968) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                const menu = this.querySelector('.dropdown-menu');
                const arrow = this.querySelector('.dropdown-arrow');
                if (menu && arrow) {
                    menu.style.display = 'block';
                    setTimeout(() => {
                        menu.style.opacity = '1';
                        menu.style.visibility = 'visible';
                        menu.style.transform = 'translateY(0)';
                        arrow.style.transform = 'rotate(180deg)';
                    }, 10);
                }
            });

            dropdown.addEventListener('mouseleave', function() {
                const menu = this.querySelector('.dropdown-menu');
                const arrow = this.querySelector('.dropdown-arrow');
                if (menu && arrow) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(10px)';
                    arrow.style.transform = 'rotate(0deg)';
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 300);
                }
            });
        });
    }

    // Window resize handler
    window.addEventListener('resize', function() {
        // Close mobile menu when resizing to desktop
        if (window.innerWidth > 968 && mainNav.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    // Keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && mainNav.classList.contains('open')) {
            closeMobileMenu();
        }
        
        // Tab key navigation within mobile menu
        if (e.key === 'Tab' && mainNav.classList.contains('open')) {
            const focusableElements = mainNav.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });

    // Touch device optimizations
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = Math.abs(touchEndX - touchStartX);
        const diffY = Math.abs(touchEndY - touchStartY);

        // Close mobile menu on swipe down
        if (diffY > 50 && diffY > diffX && touchEndY > touchStartY && mainNav.classList.contains('open')) {
            closeMobileMenu();
        }
    }, { passive: true });

    // Helper Functions
    function openMobileMenu() {
        mainNav.classList.add('open');
        mobileMenuBtn.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        
        // Animate menu items with staggered effect
        const menuItems = mainNav.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    function closeMobileMenu() {
        mainNav.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        
        // Close all dropdowns
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const menu = dropdown.querySelector('.dropdown-menu');
            const arrow = dropdown.querySelector('.dropdown-arrow');
            if (menu) menu.classList.remove('show');
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        });
    }

    function animateDropdownOpen(menu) {
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            menu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            menu.style.opacity = '1';
            menu.style.transform = 'translateY(0)';
        }, 50);
    }
}