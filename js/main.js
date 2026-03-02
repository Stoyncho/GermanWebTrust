/* ============================================
   WebTrust Builders - Main JavaScript
   ============================================ */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    initTyped();
    initSwiper();
    initNavigation();
    initHeaderScroll();
    initCounters();
    initPricingToggle();
    initFAQ();
    initForms();
    initCookieBanner();
    initSmoothScroll();
});

// AOS Animation Library
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-in-out',
            disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        });
    }
}

// Typed.js - Hero Section Text Animation
function initTyped() {
    const typedElement = document.querySelector('.typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: [
                'in Berlin',
                'für Ihr Business',
                'die Kunden anziehen',
                'mit DSGVO-Sicherheit'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|'
        });
    }
}

// Swiper - Testimonials Slider
function initSwiper() {
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    }
}

// Mobile Navigation
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));
                const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = current.toFixed(decimals);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toFixed(decimals);
                        if (!decimals && target < 100) {
                            counter.textContent = target + '+';
                        }
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// Pricing Toggle (Monthly/Yearly)
function initPricingToggle() {
    const toggle = document.getElementById('pricingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const yearlyLabel = document.getElementById('yearlyLabel');
    const prices = document.querySelectorAll('.monthly-price');

    if (!toggle) return;

    toggle.addEventListener('change', function() {
        const isYearly = toggle.checked;

        // Update labels
        if (isYearly) {
            monthlyLabel.classList.remove('active');
            yearlyLabel.classList.add('active');
        } else {
            monthlyLabel.classList.add('active');
            yearlyLabel.classList.remove('active');
        }

        // Update prices with animation
        prices.forEach(price => {
            const monthlyValue = price.getAttribute('data-monthly');
            const yearlyValue = price.getAttribute('data-yearly');

            // Fade out
            price.style.opacity = '0';
            price.style.transform = 'scale(0.8)';

            setTimeout(() => {
                price.textContent = '€' + (isYearly ? yearlyValue : monthlyValue);
                // Fade in
                price.style.opacity = '1';
                price.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const answer = otherItem.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = null;
                }
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            }
        });
    });
}

// Form Handling
function initForms() {
    // Contact Form
    const contactForm = document.getElementById('kontaktForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const formData = new FormData(contactForm);

            // Validation
            const name = formData.get('name');
            const email = formData.get('email');
            const interest = formData.get('interest');
            const dsgvo = formData.get('dsgvo');

            if (!name || !email || !interest || !dsgvo) {
                showNotification('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');

            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                showNotification('Vielen Dank! Wir melden uns innerhalb von 24 Stunden.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = newsletterForm.querySelector('input[type="email"]').value;

            if (!email) {
                showNotification('Bitte geben Sie Ihre E-Mail-Adresse ein.', 'error');
                return;
            }

            showNotification('Vielen Dank für Ihre Anmeldung!', 'success');
            newsletterForm.reset();
        });
    }
}

// Cookie Banner
function initCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    const consent = localStorage.getItem('cookieConsent');

    if (!consent && banner) {
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'all');
    document.getElementById('cookieBanner').classList.remove('show');
    loadAnalytics();
    showNotification('Cookies akzeptiert. Danke!', 'success');
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'necessary');
    document.getElementById('cookieBanner').classList.remove('show');
    showNotification('Nur notwendige Cookies aktiviert.', 'success');
}

function loadAnalytics() {
    // Google Analytics loading would go here
    console.log('Analytics loaded');
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    container.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Package Selection Helper
function selectPackage(packageName) {
    const select = document.getElementById('interest');
    if (select) {
        const options = {
            'EINSTIEG': 'einstieg',
            'WACHSTUM': 'wachstum',
            'ERFOLG': 'erfolg'
        };

        if (options[packageName]) {
            select.value = options[packageName];
            showNotification(`${packageName} Paket ausgewählt. Füllen Sie das Formular aus.`, 'success');
        }
    }
}

// Scroll to Section Helper
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Parallax Effect for Hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');

    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Performance: Lazy load images (if any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];

    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}

// Export functions for global access
window.acceptCookies = acceptCookies;
window.declineCookies = declineCookies;
window.selectPackage = selectPackage;
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;
