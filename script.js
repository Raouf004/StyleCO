// E-commerce Website JavaScript - Optimized Version

// Configuration
const CONFIG = {
    navbarScrollThreshold: 50,
    notificationDuration: 4000,
    swipeThreshold: 50, // For detecting significant vertical swipes
    heroParallaxRate: -0.2, // Adjusted for a subtler effect
    productHoverScale: 1.02,
    productHoverTranslate: -10,
    carouselAutoPlayInterval: 5000 // milliseconds
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
        this.slideIndex = 1; // For carousel
        this.carouselAutoPlayIntervalId = null;
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
        this.setupImageCarousel(); // Initialize the carousel here
        
        // Finalize page load animation
        document.body.classList.add('page-loaded'); // Add class to trigger CSS fade-in
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
            lazyImages: document.querySelectorAll('img[loading="lazy"]'), // Renamed for clarity
            animatedElements: document.querySelectorAll('.product-card, .about-text, .footer-section'),
            
            // Carousel specific elements
            carouselSlides: document.getElementsByClassName("mySlides"),
            carouselDots: document.getElementsByClassName("dot"),
            carouselPrevBtn: document.querySelector('.hero .prev'),
            carouselNextBtn: document.querySelector('.hero .next')
        };
    }

    setupEventListeners() {
        // Mobile navigation
        this.setupMobileNavigation();
        
        // Smooth scrolling for all internal anchors
        this.setupSmoothScrolling();
        
        // CTA button action
        this.setupCtaButton();
        
        // Newsletter form submission
        this.setupNewsletterForm();
        
        // Quick view buttons
        this.setupQuickViewButtons();
        
        // Product card hover effects
        this.setupProductCardHovers();
        
        // Social media links
        this.setupSocialLinks();
        
        // Scroll effects (navbar and hero parallax)
        this.setupScrollEffects();
        
        // Keyboard navigation for mobile menu
        this.setupKeyboardNavigation();
        
        // Touch support for potential swipe actions (currently logging)
        this.setupTouchSupport();
        
        // Carousel event listeners
        this.setupCarouselControls();
    }

    // --- Carousel Logic ---
    setupImageCarousel() {
        this.showSlides(this.slideIndex);
        this.startCarouselAutoPlay();

        // Pause auto-play when user hovers over the slideshow
        if (this.elements.hero) {
            this.elements.hero.addEventListener('mouseenter', () => this.pauseCarouselAutoPlay());
            this.elements.hero.addEventListener('mouseleave', () => this.startCarouselAutoPlay());
        }
    }

    showSlides(n) {
        let i;
        const slides = this.elements.carouselSlides;
        const dots = this.elements.carouselDots;

        if (!slides || slides.length === 0) return;

        // Loop around if we go past the last/first slide
        if (n > slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = slides.length;
        }

        // Hide all slides and deactivate all dots
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }

        // Display the current slide and activate the corresponding dot
        slides[this.slideIndex - 1].style.display = "block";
        if (dots[this.slideIndex - 1]) { // Check if dot exists
            dots[this.slideIndex - 1].classList.add("active");
        }
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }

    startCarouselAutoPlay() {
        this.pauseCarouselAutoPlay(); // Clear any existing interval
        this.carouselAutoPlayIntervalId = setInterval(() => {
            this.plusSlides(1);
        }, CONFIG.carouselAutoPlayInterval);
    }

    pauseCarouselAutoPlay() {
        if (this.carouselAutoPlayIntervalId) {
            clearInterval(this.carouselAutoPlayIntervalId);
            this.carouselAutoPlayIntervalId = null;
        }
    }

    setupCarouselControls() {
        if (this.elements.carouselPrevBtn) {
            this.elements.carouselPrevBtn.addEventListener('click', () => this.plusSlides(-1));
        }
        if (this.elements.carouselNextBtn) {
            this.elements.carouselNextBtn.addEventListener('click', () => this.plusSlides(1));
        }
        // Attach click handlers to dots dynamically since they are fixed elements in HTML
        Array.from(this.elements.carouselDots).forEach((dot, index) => {
            dot.addEventListener('click', () => this.currentSlide(index + 1));
        });
    }

    // --- End Carousel Logic ---

    setupMobileNavigation() {
        if (!this.elements.mobileMenu || !this.elements.navMenu) return;

        this.elements.mobileMenu.addEventListener('click', () => {
            this.elements.mobileMenu.classList.toggle('active');
            this.elements.navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll'); // Optional: prevent scrolling when menu is open
        });

        // Close mobile menu when clicking on nav links
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.elements.mobileMenu.classList.remove('active');
                this.elements.navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll'); // Re-enable scrolling
            });
        });
    }

    setupSmoothScrolling() {
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
            const offsetTop = targetSection.offsetTop - (this.elements.navbar ? this.elements.navbar.offsetHeight : 0); // Account for fixed navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    setupCtaButton() {
        if (!this.elements.ctaButton) return;

        this.elements.ctaButton.addEventListener('click', () => {
            this.smoothScrollToTarget('#shop');
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
                    // In a real app, this would fetch product data and open a modal
                    this.showNotification(`Loading details for ${productName}...`, 'info');
                    // For demonstration, you might navigate or open a dummy modal
                    // window.location.href = `product-details.html?id=${productId}`;
                } else {
                    this.showNotification(`Product details for "${productName}" - Coming soon!`, 'info');
                }
            });
        });
    }

    setupProductCardHovers() {
        this.elements.productCards.forEach(card => {
            card.style.transition = 'transform 0.3s ease'; // Ensure transition property is set
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
                this.showNotification(`Redirecting to our ${platform} page...`, 'info');
                // In a real app, you'd navigate: window.open(link.href, '_blank');
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
            this.elements.navbar.classList.add('scrolled'); // Use class for styling
        } else {
            this.elements.navbar.classList.remove('scrolled');
        }
    }

    updateHeroParallax() {
        if (!this.elements.hero) return;

        const scrolled = window.pageYOffset;
        // Only apply parallax if it makes sense (e.g., hero is visible)
        if (scrolled < this.elements.hero.offsetHeight) {
             const rate = scrolled * CONFIG.heroParallaxRate;
             this.elements.hero.style.transform = `translateY(${rate}px)`;
        } else {
            this.elements.hero.style.transform = `translateY(${this.elements.hero.offsetHeight * CONFIG.heroParallaxRate}px)`;
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.navMenu && this.elements.navMenu.classList.contains('active')) {
                this.elements.mobileMenu.classList.remove('active');
                this.elements.navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    setupTouchSupport() {
        // Only for vertical swipes for now, can be expanded for carousel
        document.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].screenY; // Use touches[0] for first touch
        }, { passive: true }); // Use passive listener for better scroll performance

        document.addEventListener('touchend', (e) => {
            this.touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        }, { passive: true });

        // Optional: for carousel horizontal swipe
        // let startX, endX;
        // const carouselContainer = document.querySelector('.slideshow-container');
        // if(carouselContainer) {
        //     carouselContainer.addEventListener('touchstart', (e) => {
        //         startX = e.touches[0].clientX;
        //     });
        //     carouselContainer.addEventListener('touchend', (e) => {
        //         endX = e.changedTouches[0].clientX;
        //         const diffX = startX - endX;
        //         if (Math.abs(diffX) > CONFIG.swipeThreshold) {
        //             if (diffX > 0) this.plusSlides(1); // Swipe left
        //             else this.plusSlides(-1); // Swipe right
        //         }
        //     });
        // }
    }

    handleSwipe() {
        const diff = this.touchStartY - this.touchEndY;
        
        if (Math.abs(diff) > CONFIG.swipeThreshold) {
            // This can be expanded to do something meaningful, e.g.,
            // if (diff > 0) console.log('Swiped up, maybe go to next section?');
            // else console.log('Swiped down, maybe go to previous section?');
        }
    }

    // Removed setupPageLoadAnimation as it's handled by CSS and initial class
    // in init() for a better no-flicker fade-in.

    setupObservers() {
        this.setupImageObserver();
        this.setupScrollAnimationObserver();
    }

    setupImageObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers: just add 'loaded' class instantly
            this.elements.lazyImages.forEach(img => img.classList.add('loaded'));
            return;
        }

        this.observers.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    this.observers.imageObserver.unobserve(img); // Stop observing once loaded
                }
            });
        }, {
            rootMargin: '0px 0px -50px 0px', // Load images slightly before they enter view
            threshold: 0.01 // Trigger as soon as even a tiny bit is visible
        });

        this.elements.lazyImages.forEach(img => {
            this.observers.imageObserver.observe(img);
        });
    }

    setupScrollAnimationObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: make elements visible immediately
            this.elements.animatedElements.forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            });
            return;
        }

        this.observers.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in'); // Use a CSS class for animation
                    this.observers.scrollObserver.unobserve(entry.target); // Animate once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.animatedElements.forEach(element => {
            // Set initial state for animation via CSS, add a class here if needed
            // For now, assume CSS handles initial opacity:0 and transform:translateY(30px)
            this.observers.scrollObserver.observe(element);
        });
    }

    initializeAnimations() {
        // Ensure product cards have transitions for hover effects
        this.elements.productCards.forEach(card => {
            card.style.transition = 'transform 0.3s ease';
        });
        // You might want to initially hide scroll-animated elements in CSS
        // and let IntersectionObserver reveal them using a class.
        // Example: .animated-element { opacity: 0; transform: translateY(30px); transition: ...; }
        //          .animated-element.animate-in { opacity: 1; transform: translateY(0); }
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
                animation: slideInRight 0.3s ease forwards; /* forwards to keep final state */
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
        // Remove existing notifications smoothly
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            this.removeNotification(existingNotification, () => {
                this._createAndShowNewNotification(message, type);
            });
        } else {
            this._createAndShowNewNotification(message, type);
        }
    }

    _createAndShowNewNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        `;

        document.body.appendChild(notification);

        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            this.removeNotification(notification);
        });

        setTimeout(() => {
            if (notification.parentNode) {
                this.removeNotification(notification);
            }
        }, CONFIG.notificationDuration);
    }

    removeNotification(notification, callback = () => {}) {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
            callback();
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
        Object.values(this.observers).forEach(observer => {
            observer.disconnect();
        });
        this.pauseCarouselAutoPlay(); // Stop carousel autoplay
        // More cleanup for event listeners if necessary, but typically for SPA unmounting
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ecommerceApp = new EcommerceApp();
});
// Theme Toggler
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Function to set the theme
function setTheme(isDarkMode) {
    if (isDarkMode) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setTheme(true);
    } else if (savedTheme === 'light') {
        setTheme(false);
    } else {
        // Default to system preference if no theme is saved
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark);
    }
});

// Add event listener to the toggle button
themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.contains('dark-mode');
    setTheme(!isDarkMode);
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Slideshow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Auto slideshow
let autoSlideIndex = 0;
autoShowSlides();

function autoShowSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    autoSlideIndex++;
    if (autoSlideIndex > slides.length) {
        autoSlideIndex = 1
    }
    slides[autoSlideIndex - 1].style.display = "block";
    dots[autoSlideIndex - 1].className += " active";
    setTimeout(autoShowSlides, 5000); // Change image every 5 seconds
}
// Get the modal
const quickViewModal = document.getElementById('quick-view-modal');
// Get the <span> element that closes the modal
const closeButton = quickViewModal.querySelector('.close-button');
// Get all "Quick View" buttons
const quickViewButtons = document.querySelectorAll('.quick-view');

// Get elements within the modal to update
const modalProductImg = document.getElementById('modal-product-img');
const modalProductName = document.getElementById('modal-product-name');
const modalProductPrice = document.getElementById('modal-product-price');
// Add more if you add more details to your modal HTML
const modalProductDescription = quickViewModal.querySelector('.modal-product-description');


// Function to open the quick view modal
function openQuickView(product) {
    modalProductImg.src = product.image;
    modalProductImg.alt = product.name;
    modalProductName.textContent = product.name;
    modalProductPrice.textContent = product.price;
    // Update other details if you have them
    // For demonstration, let's assume a generic description
    modalProductDescription.textContent = "Discover the latest fashion trends and express your unique style with this premium quality item. Perfect for any occasion.";


    quickViewModal.style.display = 'flex'; // Make the modal visible
    document.body.style.overflow = 'hidden'; // Prevent scrolling of the background
}

// Function to close the quick view modal
function closeQuickView() {
    quickViewModal.style.display = 'none'; // Hide the modal
    document.body.style.overflow = ''; // Restore scrolling
}

// Event listeners for "Quick View" buttons
quickViewButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Prevent default button action (e.g., navigating if it were a link)
        event.preventDefault();

        // Get the parent product card element
        const productCard = event.target.closest('.product-card');

        // Extract product details from the product card
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        const productImage = productCard.querySelector('.product-image img').src;

        // Create a product object
        const productDetails = {
            name: productName,
            price: productPrice,
            image: productImage
        };

        openQuickView(productDetails);
    });
});

// Event listener to close the modal when the close button is clicked
closeButton.addEventListener('click', closeQuickView);

// Event listener to close the modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === quickViewModal) {
        closeQuickView();
    }
});

// (Optional) Add keyboard support to close with 'Escape' key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && quickViewModal.style.display === 'flex') {
        closeQuickView();
    }
});