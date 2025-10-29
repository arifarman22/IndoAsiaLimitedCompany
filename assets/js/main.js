// main.js script - Professional Portfolio Enhanced
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initSmoothScrolling();
  initFormValidation();
  initBackToTop();
  initLazyLoading();
  initServiceWorker();
  initAnalytics();
  initMobileMenu();
  initBodyAnimations();
  initScrollAnimations(); // Professional scroll animations
  initRevealStagger();
  initLightbox();
  initCounterAnimations(); // Animated counters
  initParallaxEffects(); // Subtle parallax effects
});

function initSmoothScrolling() {
  // Smooth scrolling for navigation links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mainNav');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          document.getElementById('mobileMenuBtn')?.classList.remove('active');
        }
      }
    });
  });
}

function initFormValidation() {
  // Form validation for all forms
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const inputs = this.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          highlightError(input);
        } else {
          removeErrorHighlight(input);
          
          // Email validation
          if (input.type === 'email' && !isValidEmail(input.value)) {
            isValid = false;
            highlightError(input, 'Please enter a valid email address');
          }
        }
      });
      
      if (isValid) {
        // Show success message
        showFormSuccess(this);
        
        // Reset form after success
        setTimeout(() => {
          this.reset();
        }, 2000);
      }
    });
  });
  
  // Live validation
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.hasAttribute('required') && !this.value.trim()) {
        highlightError(this, 'This field is required');
      } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
        highlightError(this, 'Please enter a valid email address');
      } else {
        removeErrorHighlight(this);
      }
    });
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function highlightError(input, message = '') {
  input.classList.add('error');
  
  // Remove existing error message
  const existingError = input.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Add error message if provided
  if (message) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.textContent = message;
    errorElement.style.color = '#ff4d94';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.5rem';
    input.parentNode.appendChild(errorElement);
  }
}

function removeErrorHighlight(input) {
  input.classList.remove('error');
  
  // Remove error message
  const errorElement = input.parentNode.querySelector('.error-message');
  if (errorElement) {
    errorElement.remove();
  }
}

function showFormSuccess(form) {
  // Create success message
  const successMessage = document.createElement('div');
  successMessage.classList.add('success-message');
  successMessage.innerHTML = `
    <div style="background: #4CAF50; color: white; padding: 1rem; border-radius: var(--border-radius); margin-top: 1rem;">
      <p>Thank you! Your message has been sent successfully.</p>
    </div>
  `;
  
  // Remove existing success message
  const existingSuccess = form.querySelector('.success-message');
  if (existingSuccess) {
    existingSuccess.remove();
  }
  
  form.appendChild(successMessage);
  
  // Remove success message after 5 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
}

function initBackToTop() {
  // Create back to top button
  const backToTop = document.createElement('div');
  backToTop.classList.add('back-to-top');
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);
  
  // Show/hide back to top button
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  // Scroll to top on click
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initLazyLoading() {
  // Lazy load images
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
}

function initServiceWorker() {
  // Register service worker for PWA functionality
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(function(error) {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }
}

function initAnalytics() {
  // Simple analytics tracking
  window.addEventListener('load', function() {
    // Track page view
    trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href
    });
    
    // Track outbound links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      link.addEventListener('click', function() {
        trackEvent('outbound_click', {
          link_url: this.href,
          link_text: this.textContent
        });
      });
    });
    
    // Track form submissions
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function() {
        trackEvent('form_submit', {
          form_id: this.id || 'unknown',
          form_action: this.action
        });
      });
    });
  });
}

function trackEvent(eventName, eventParams) {
  // Simple event tracking (replace with your analytics implementation)
  console.log('Event tracked:', eventName, eventParams);
  
  // Example: Send to Google Analytics if available
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventParams);
  }
}

// Utility function for debouncing
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

// Utility function for throttling
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Mobile menu toggle: toggles nav visibility and keeps it compatible with
// both .open and .active classes used in different page CSS. Also
// prevents body scroll when open and closes on outside click / resize.
function initMobileMenu() {
  let mobileBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  if (!mobileBtn || !mainNav) return;

  // Replace the existing mobile button with a clean clone to remove any inline
  // or page-level event listeners that may conflict with this centralized handler.
  try {
    const clone = mobileBtn.cloneNode(true);
    mobileBtn.parentNode.replaceChild(clone, mobileBtn);
    mobileBtn = clone;
  } catch (err) {
    // If cloning fails for any reason, continue with original element.
    console.warn('mobileMenuBtn clone failed, continuing with original:', err);
  }

  // Prevent multiple initializations / double-binding
  if (mobileBtn.dataset.mobileInit === '1') return;
  mobileBtn.dataset.mobileInit = '1';

  // Ensure ARIA attributes are present for accessibility
  if (!mobileBtn.hasAttribute('aria-controls')) mobileBtn.setAttribute('aria-controls', 'mainNav');
  if (!mobileBtn.hasAttribute('aria-expanded')) mobileBtn.setAttribute('aria-expanded', 'false');

  function closeMenu() {
    mainNav.classList.remove('open');
    mainNav.classList.remove('active');
    mobileBtn.classList.remove('active');
    mobileBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  function openMenu() {
    mainNav.classList.add('open');
    mainNav.classList.add('active');
    mobileBtn.classList.add('active');
    mobileBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
    
    // Add staggered animation indices
    const navItems = mainNav.querySelectorAll('li');
    navItems.forEach((item, index) => {
      item.style.setProperty('--index', index);
      item.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // Use a capturing listener and stopImmediatePropagation so this single
  // implementation wins over any page-level inline handlers which may also
  // try to toggle the menu. This prevents duplicate/conflicting behavior.
  mobileBtn.addEventListener('click', function(e) {
    // Prevent other click listeners from firing
    try { e.stopImmediatePropagation(); } catch (err) {}
    e.stopPropagation();
    e.preventDefault();
    const isOpen = mainNav.classList.contains('open') || mainNav.classList.contains('active');
    if (isOpen) closeMenu(); else openMenu();
  }, true);

  // Close when clicking outside the nav on mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 968) {
      if (!e.target.closest('#mainNav') && !e.target.closest('#mobileMenuBtn')) {
        closeMenu();
      }
    }
  });

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Reset on resize to desktop
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 968) {
      closeMenu();
    }
  }, 150));
}

// Dropdown functionality
(function() {
  function initDropdowns() {
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 968) {
          e.preventDefault();
          e.stopPropagation();
          this.parentElement.classList.toggle('active');
        }
      });
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdowns);
  } else {
    initDropdowns();
  }
})();

// Auto-detect and set active nav link
(function(){
  function setActiveLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('#mainNav a');
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href === path) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      } else {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setActiveLink);
  } else {
    setActiveLink();
  }
})();

// Professional Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Handle stagger containers
        if (entry.target.classList.contains('stagger-container')) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            child.style.setProperty('--i', index);
            setTimeout(() => {
              child.classList.add('visible');
            }, index * 100);
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger-container');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Animated Counter Function
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-count]');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
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
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// Subtle Parallax Effects
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  if (parallaxElements.length === 0) return;
  
  const parallaxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', () => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * -0.5;
          entry.target.style.transform = `translateY(${rate}px)`;
        });
      }
    });
  }, { threshold: 0.1 });
  
  parallaxElements.forEach(el => {
    parallaxObserver.observe(el);
  });
}

// Professional Hover Effects
function initHoverEffects() {
  const cards = document.querySelectorAll('.card, .portfolio-card, .testimonial-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '';
    });
  });
}

// Initialize hover effects
document.addEventListener('DOMContentLoaded', initHoverEffects);

// Body animations initializer: toggles a CSS animated background and pauses when not visible
function initBodyAnimations() {
  try {
    const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) return; // don't enable if user prefers reduced motion

    // Add class to body to enable CSS ::before animated gradient
    document.body.classList.add('body-animated');

    // Pause animation when page is not visible to save battery
    function handleVisibility() {
      if (document.hidden) {
        document.body.classList.add('body-animated-paused');
      } else {
        document.body.classList.remove('body-animated-paused');
      }
    }

    document.addEventListener('visibilitychange', handleVisibility);

    // Also pause when window is blurred (optional)
    window.addEventListener('blur', () => document.body.classList.add('body-animated-paused'));
    window.addEventListener('focus', () => document.body.classList.remove('body-animated-paused'));

    // Clean up on unload
    window.addEventListener('unload', () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      document.body.classList.remove('body-animated');
      document.body.classList.remove('body-animated-paused');
    });
  } catch (err) {
    // Fail silently
    console.error('initBodyAnimations error', err);
  }
}

// Reveal stagger for groups: will add .animated to container and children reveal with CSS delays
function initRevealStagger() {
  try {
    const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) return;

    const groups = document.querySelectorAll('.reveal-stagger');
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // set custom index var for each child for stagger delays
          Array.from(el.children).forEach((c, i) => c.style.setProperty('--i', i));
          el.classList.add('animated');
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    groups.forEach(g => io.observe(g));
  } catch (err) { console.error('initRevealStagger', err); }
}

// Lightbox: click any .lightboxable image to open overlay
function initLightbox() {
  try {
    const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // create overlay once
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<span class="lightbox-close" aria-hidden="true">✕</span><img alt="" />';
    document.body.appendChild(overlay);
    const imgEl = overlay.querySelector('img');
    const closeBtn = overlay.querySelector('.lightbox-close');

    function close() { overlay.classList.remove('show'); imgEl.src = ''; }

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay || e.target === closeBtn) close();
    });

    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') close(); });

    // bind images
    document.querySelectorAll('img.lightboxable').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function(e) {
        if (prefersReduce) return; // avoid large overlays for reduced motion
        imgEl.src = this.dataset.src || this.src;
        overlay.classList.add('show');
      });
    });
  } catch (err) { console.error('initLightbox error', err); }
}