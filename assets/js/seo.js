// SEO Enhancement Module
(function() {
    'use strict';

    const SEOManager = {
        init() {
            this.addStructuredData();
            this.optimizeImages();
            this.trackPagePerformance();
        },

        addStructuredData() {
            const structuredData = {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "IndoAsia Trading",
                "url": "https://indoasiatraders.com",
                "logo": "https://indoasiatraders.com/assets/images/logo.png",
                "description": "Premium import services between China and Bangladesh",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "H-13, R-11, Block-L, South Bonosree, Khilgaon",
                    "addressLocality": "Dhaka",
                    "postalCode": "1219",
                    "addressCountry": "BD"
                },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+8801711-257739",
                    "contactType": "Customer Service",
                    "email": "indoasiatrading@outlook.com"
                },
                "sameAs": [
                    "https://www.facebook.com/p/IndoAsiaTrading",
                    "https://www.linkedin.com/company/indoasia-trading",
                    "https://www.instagram.com/indoasiatrading"
                ]
            };

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = JSON.stringify(structuredData);
            document.head.appendChild(script);
        },

        optimizeImages() {
            document.querySelectorAll('img:not([alt])').forEach(img => {
                console.warn('Image missing alt text:', img.src);
            });
        },

        trackPagePerformance() {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.entryType === 'largest-contentful-paint') {
                            console.log('LCP:', entry.startTime);
                        }
                    }
                });
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            }
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => SEOManager.init());
    } else {
        SEOManager.init();
    }
})();
