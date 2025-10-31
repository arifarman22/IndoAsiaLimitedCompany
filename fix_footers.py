import re

blog_files = [
    'blog-cost-management.html',
    'blog-market-opportunities.html',
    'blog-quality-control.html',
    'blog-regulations.html',
    'blog-supply-chain.html'
]

new_footer = '''    <!-- Footer -->
    <footer class="footer" role="contentinfo">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>IndoAsia Trading</h3>
                    <p>Your trusted partner for premium import services between China and Bangladesh.</p>
                    <div class="social-links" role="list" aria-label="Social media links">
                        <a href="https://www.facebook.com/p/IndoAsiaTrading" target="_blank" rel="noopener noreferrer"
                            aria-label="Follow us on Facebook"><span>FB</span></a>
                        <a href="https://www.linkedin.com/company/indoasia-trading" target="_blank"
                            rel="noopener noreferrer" aria-label="Follow us on LinkedIn"><span>LI</span></a>
                        <a href="https://www.instagram.com/indoasiatrading/#"
                            target="_blank" rel="noopener noreferrer"
                            aria-label="Follow us on Instagram"><span>IG</span></a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h4>Services</h4>
                    <ul role="list">
                        <li><a href="services.html">Import Sourcing</a></li>
                        <li><a href="services.html">Logistics</a></li>
                        <li><a href="services.html">Quality Assurance</a></li>
                        <li><a href="services.html">Custom Solutions</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Company</h4>
                    <ul role="list">
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="team.html">Our Team</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <address>
                        <p>Email: <a href="mailto:indoasiatrading@outlook.com">indoasiatrading@outlook.com</a></p>
                        <p>Phone: <a href="tel:+8801711257739">+8801711257739</a></p>
                        <p>Address: H-13, R-11, Block-L, South Bonosree, Khilgaon, Dhaka 1219.
                        </p>
                    </address>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2023 IndoAsia Trading. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>/* navigation handled by assets/js/mobile-nav-fix.js */</script>
    <script src="assets/js/dropdown-nav.js"></script>
</body>
</html>'''

for filename in blog_files:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find and replace from <!-- Footer --> to </html>
        pattern = r'    <!-- Footer -->.*?</html>'
        content = re.sub(pattern, new_footer, content, flags=re.DOTALL)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'Updated {filename}')
    except Exception as e:
        print(f'Error updating {filename}: {e}')

print('All footers updated!')
