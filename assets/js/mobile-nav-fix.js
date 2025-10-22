// Simple mobile navigation fix
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle classes
            mobileMenuBtn.classList.toggle('active');
            mainNav.classList.toggle('open');
            
            // Toggle body overflow
            if (mainNav.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mainNav.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }
});