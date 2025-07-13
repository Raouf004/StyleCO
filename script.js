// E-commerce Website JavaScript - Optimized Version

// Configuration
const CONFIG = {
    navbarScrollThreshold: 50,
    notificationDuration: 4000,
    swipeThreshold: 50,
    heroParallaxRate: -0.5,
    productHoverScale: 1.02,
    productHoverTranslate: -10
};

// Product ID mapping for navigation
const productIdMap = {
    'Elegant Summer Dress': 'elegant-summer-dress',
    'Casual Cotton Shirt': 'casual-cotton-shirt',
    'Designer Jacket': 'designer-jacket',
    'Trendy Denim Jeans': 'trendy-denim-jeans',
    'Stylish Blouse': 'stylish-blouse',
    'Premium Winter Coat': 'premium-winter-coat',
    'Cozy Knit Sweater': 'cozy-knit-sweater',
    'Professional Suit': 'professional-suit',
    'New Arrival': 'new-arrival'
};

// Main Application Class
class EcommerceApp {
    constructor() {
        this.elements = {};
        this.observers = {};
        this.isScrolling = false;
        this.touchStartY = 0;
        this.touchEndY = 0;
        
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupObservers();
        this.addNotificationStyles();
        this.initializeAnimations();
    }

    cacheElements() {
        this.elements = {
            mobileMenu: document.getElementById('mobile-menu'),
            navMenu: document.querySelector('.nav-menu'),
            navbar: document.querySelector('.navbar'),
            navLinks: document.querySelectorAll('.nav-link'),
            ctaButton: document.querySelector('.cta-button'),
            newsletterForm: document.querySelector('.newsletter-form'),
            quickViewButtons: document.querySelectorAll('.quick-view'),
            productCards: document.querySelectorAll('.product-card'),
            socialLinks: document.querySelectorAll('.social-icon'),
            hero: document.querySelector('.hero'),
            images: document.querySelectorAll('img[loading="lazy"]'),
            animatedElements: document.querySelectorAll('.product-card, .about-text, .footer-section')
        };
    }

    setupEventListeners() {
        // Mobile navigation
        this.setupMobileNavigation();
        
        // Smooth scrolling
        this.setupSmoothScrolling();
        
        // CTA button
        this.setupCtaButton();
        
        // Newsletter form
        this.setupNewsletterForm();
        
        // Quick view buttons
        this.setupQuickViewButtons();
        
        // Product card hover effects
        this.setupProductCardHovers();
        
        // Social media links
        this.setupSocialLinks();
        
        // Scroll effects
        this.setupScrollEffects();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
        
        // Touch support
        this.setupTouchSupport();
        
        // Page load animation
        this.setupPageLoadAnimation();
    }

    setupMobileNavigation() {
        if (!this.elements.mobileMenu || !this.elements.navMenu) return;

        this.elements.mobileMenu.addEventListener('click', () => {
            this.elements.mobileMenu.classList.toggle('active');
            this.elements.navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.elements.mobileMenu.classList.remove('active');
                this.elements.navMenu.classList.remove('active');
            });
        });
    }

    setupSmoothScrolling() {
        // Handle navigation links
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.smoothScrollToTarget(targetId);
            });
        });

        // Handle all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                this.smoothScrollToTarget(targetId);
            });
        });
    }

    smoothScrollToTarget(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    setupCtaButton() {
        if (!this.elements.ctaButton) return;

        this.elements.ctaButton.addEventListener('click', () => {
            const shopSection = document.getElementById('shop');
            if (shopSection) {
                const offsetTop = shopSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    setupNewsletterForm() {
        if (!this.elements.newsletterForm) return;

        this.elements.newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = this.elements.newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && this.isValidEmail(email)) {
                this.showNotification(`Thank you for subscribing with ${email}!`, 'success');
                emailInput.value = '';
            } else {
                this.showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    setupQuickViewButtons() {
        this.elements.quickViewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productCard = button.closest('.product-card');
                const productName = productCard.querySelector('.product-name').textContent;
                const productId = productIdMap[productName];
                
                if (productId) {
                    window.location.href = `product-details.html?id=${productId}`;
                } else {
                    this.showNotification(`Product details for ${productName} - Coming soon!`, 'info');
                }
            });
        });
    }

    setupProductCardHovers() {
        this.elements.productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = `translateY(${CONFIG.productHoverTranslate}px) scale(${CONFIG.productHoverScale})`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupSocialLinks() {
        this.elements.socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = link.getAttribute('aria-label');
                this.showNotification(`${platform} link - Connect with us on social media!`, 'info');
            });
        });
    }

    setupScrollEffects() {
        let ticking = false;
        
        const updateOnScroll = () => {
            this.updateNavbarOnScroll();
            this.updateHeroParallax();
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    updateNavbarOnScroll() {
        if (!this.elements.navbar) return;

        if (window.scrollY > CONFIG.navbarScrollThreshold) {
            this.elements.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            this.elements.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            this.elements.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            this.elements.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }

    updateHeroParallax() {
        if (!this.elements.hero) return;

        const scrolled = window.pageYOffset;
        const rate = scrolled * CONFIG.heroParallaxRate;
        this.elements.hero.style.transform = `translateY(${rate}px)`;
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.navMenu.classList.contains('active')) {
                this.elements.mobileMenu.classList.remove('active');
                this.elements.navMenu.classList.remove('active');
            }
        });
    }

    setupTouchSupport() {
        document.addEventListener('touchstart', (e) => {
            this.touchStartY = e.changedTouches[0].screenY;
        });

        document.addEventListener('touchend', (e) => {
            this.touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const diff = this.touchStartY - this.touchEndY;
        
        if (Math.abs(diff) > CONFIG.swipeThreshold) {
            if (diff > 0) {
                console.log('Swiped up');
            } else {
                console.log('Swiped down');
            }
        }
    }

    setupPageLoadAnimation() {
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    }

    setupObservers() {
        this.setupImageObserver();
        this.setupScrollAnimationObserver();
    }

    setupImageObserver() {
        this.observers.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    this.observers.imageObserver.unobserve(img);
                }
            });
        });

        this.elements.images.forEach(img => {
            this.observers.imageObserver.observe(img);
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        });
    }

    setupScrollAnimationObserver() {
        this.observers.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observers.scrollObserver.observe(element);
        });
    }

    initializeAnimations() {
        // Initial setup for animations
        this.elements.productCards.forEach(card => {
            card.style.transition = 'transform 0.3s ease';
        });
    }

    addNotificationStyles() {
        if (document.querySelector('#notification-styles')) return;

        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification {
                position: fixed;
                top: 90px;
                right: 20px;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 10px;
                max-width: 300px;
                font-weight: 500;
                animation: slideInRight 0.3s ease;
            }
            .notification-success { background: #27ae60; }
            .notification-error { background: #e74c3c; }
            .notification-info { background: #3498db; }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                margin-left: 10px;
            }
        `;
        document.head.appendChild(style);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            this.removeNotification(notification);
        });

        // Auto remove after specified duration
        setTimeout(() => {
            if (notification.parentNode) {
                this.removeNotification(notification);
            }
        }, CONFIG.notificationDuration);
    }

    removeNotification(notification) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Public methods for external use
    scrollToSection(sectionId) {
        this.smoothScrollToTarget(sectionId);
    }

    notify(message, type) {
        this.showNotification(message, type);
    }

    // Cleanup method
    destroy() {
        // Remove all event listeners and observers
        Object.values(this.observers).forEach(observer => {
            observer.disconnect();
        });
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ecommerceApp = new EcommerceApp();
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EcommerceApp;
}