/**
 * Quick Update Script for Adding Responsive Navigation
 * This script shows the changes needed for each HTML file
 */

// CSS to add to the <head> section of all HTML files
const cssToAdd = `<link rel="stylesheet" href="assets/css/responsive-nav.css">`;

// JavaScript to add before closing </body> tag of all HTML files
const jsToAdd = `<script src="assets/js/responsive-nav.js"></script>`;

// Standard header structure to use across all pages
const headerStructure = `
<header class="header" id="mainHeader" role="banner">
    <div class="container header-content">
        <div class="logo">
            <a href="index.html">
                <img src="assets/images/horizontal-final.png" alt="IndoAsia Trading Logo" class="logo-img">
                <span class="logo-text"></span>
            </a>
        </div>
        <nav>
            <ul class="nav" id="mainNav">
                <li><a href="index.html">Home</a></li>
                <li><a href="services.html">Our Process</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle">Our Services <span class="dropdown-arrow">▼</span></a>
                    <ul class="dropdown-menu">
                        <li><a href="coreServices.html">Core Services</a></li>
                        <li><a href="additionalServices.html">Additional Services</a></li>
                        <li><a href="plans.html">Plans & Pricing</a></li>
                    </ul>
                </li>
                <li><a href="features.html">Features</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle">Resources <span class="dropdown-arrow">▼</span></a>
                    <ul class="dropdown-menu">
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="faqs.html">FAQs</a></li>
                    </ul>
                </li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</header>
`;

// List of files to update
const filesToUpdate = [
    'index.html',
    'about.html',
    'contact.html',
    'services.html',
    'coreServices.html',
    'additionalServices.html',
    'features.html',
    'plans.html',
    'blog.html',
    'faqs.html',
    'team.html',
    '404.html'
];

// Instructions for manual update
console.log('=== RESPONSIVE NAVIGATION UPDATE INSTRUCTIONS ===\n');

console.log('1. FILES CREATED:');
console.log('   - assets/css/responsive-nav.css');
console.log('   - assets/js/responsive-nav.js');
console.log('   - responsive-nav-implementation.html\n');

console.log('2. FOR EACH HTML FILE, ADD THIS CSS LINK IN <head>:');
console.log('   ' + cssToAdd + '\n');

console.log('3. FOR EACH HTML FILE, ADD THIS SCRIPT BEFORE </body>:');
console.log('   ' + jsToAdd + '\n');

console.log('4. REPLACE EXISTING HEADER WITH THIS STRUCTURE:');
console.log(headerStructure + '\n');

console.log('5. FILES TO UPDATE:');
filesToUpdate.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
});

console.log('\n6. FEATURES INCLUDED:');
console.log('   ✅ Mobile-first responsive design');
console.log('   ✅ Hamburger menu for mobile devices');
console.log('   ✅ Smooth animations and transitions');
console.log('   ✅ Dropdown menus for desktop and mobile');
console.log('   ✅ Touch-friendly interactions');
console.log('   ✅ Keyboard navigation support');
console.log('   ✅ Accessibility features');
console.log('   ✅ Sticky header with scroll effects');
console.log('   ✅ Cross-browser compatibility');

console.log('\n7. TESTING CHECKLIST:');
console.log('   □ Desktop browsers (Chrome, Firefox, Safari, Edge)');
console.log('   □ Mobile devices (iOS Safari, Android Chrome)');
console.log('   □ Tablet devices');
console.log('   □ Different screen sizes and orientations');
console.log('   □ Keyboard navigation (Tab, Enter, Escape keys)');
console.log('   □ Touch interactions (tap, swipe)');

console.log('\n8. CUSTOMIZATION:');
console.log('   Modify CSS variables in responsive-nav.css:');
console.log('   --brand-navy, --brand-red, --brand-white');
console.log('   --accent, --accent-secondary, --transition');

console.log('\n=== END OF INSTRUCTIONS ===');

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        cssToAdd,
        jsToAdd,
        headerStructure,
        filesToUpdate
    };
}