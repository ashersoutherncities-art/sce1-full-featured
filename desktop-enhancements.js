/**
 * SOUTHERN CITIES ENTERPRISES - DESKTOP ENHANCEMENTS
 * Phase 1 - High Impact Features
 * 
 * 1. Animated Statistics Counter
 * 2. 3D Hover Card Effects (CSS-based)
 * 3. Trust Badges (rendered in HTML)
 * 4. Sticky Shrinking Nav
 * 5. Scroll Animations
 */

// ===== UTILITY: INTERSECTION OBSERVER =====
function createObserver(elements, callback, options = {}) {
    const defaultOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const observerOptions = { ...defaultOptions, ...options };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elements.forEach(element => observer.observe(element));
    
    return observer;
}

// ===== FEATURE #1: ANIMATED STATISTICS COUNTER =====
function initStatCounters() {
    const statItems = document.querySelectorAll('.stat-item');
    
    if (statItems.length === 0) return;
    
    createObserver(statItems, (element) => {
        const delay = parseInt(element.dataset.delay) || 0;
        
        setTimeout(() => {
            element.classList.add('animate');
            
            const numberElement = element.querySelector('.stat-number');
            const target = parseInt(numberElement.dataset.target);
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = target / steps;
            const stepDuration = duration / steps;
            
            let current = 0;
            
            const counter = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                
                // Format with + suffix and handle millions
                if (target >= 50 && target < 100) {
                    numberElement.textContent = `$${Math.floor(current)}M+`;
                } else {
                    numberElement.textContent = `${Math.floor(current)}+`;
                }
            }, stepDuration);
        }, delay);
    });
    
    console.log('✅ Stat counters initialized');
}

// ===== FEATURE #4: STICKY SHRINKING NAV =====
function initStickyNav() {
    const header = document.getElementById('siteHeader');
    
    if (!header) {
        console.warn('⚠️ Sticky nav header not found');
        return;
    }
    
    let lastScroll = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
    
    console.log('✅ Sticky shrinking nav initialized');
}

// ===== FEATURE #5: SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    if (scrollElements.length === 0) return;
    
    createObserver(scrollElements, (element) => {
        element.classList.add('animate');
    }, { threshold: 0.15 });
    
    console.log(`✅ Scroll animations initialized (${scrollElements.length} elements)`);
}

// ===== FEATURE #2: 3D HOVER CARD EFFECTS =====
// Note: This is primarily CSS-based, but we can enhance with JS for smoother performance
function init3DCardEffects() {
    const cards = document.querySelectorAll('.feature-card, .division-card');
    
    if (cards.length === 0) return;
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.willChange = 'transform';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.willChange = 'auto';
        });
    });
    
    console.log(`✅ 3D card effects enhanced (${cards.length} cards)`);
}

// ===== STICKY CONTACT BUTTON =====
function initStickyContact() {
    const stickyContact = document.getElementById('stickyContact');
    
    if (!stickyContact) return;
    
    let ticking = false;
    
    function updateContactButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            stickyContact.classList.add('show');
        } else {
            stickyContact.classList.remove('show');
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateContactButton);
            ticking = true;
        }
    });
    
    console.log('✅ Sticky contact button initialized');
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignore # only links
            if (href === '#' || !href) return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('✅ Smooth scrolling initialized');
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for resize events
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

// ===== INITIALIZE ALL FEATURES =====
function initDesktopEnhancements() {
    console.log('🚀 Initializing desktop enhancements...');
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initAllFeatures();
        });
    } else {
        initAllFeatures();
    }
}

function initAllFeatures() {
    // Feature #1: Stats Counter
    initStatCounters();
    
    // Feature #2: 3D Cards (CSS-enhanced)
    init3DCardEffects();
    
    // Feature #4: Sticky Shrinking Nav
    initStickyNav();
    
    // Feature #5: Scroll Animations
    initScrollAnimations();
    
    // Bonus: Sticky Contact Button
    initStickyContact();
    
    // Bonus: Smooth Scrolling
    initSmoothScrolling();
    
    console.log('✨ All desktop enhancements loaded successfully!');
}

// Auto-initialize
initDesktopEnhancements();

// Export for manual control if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initStatCounters,
        init3DCardEffects,
        initStickyNav,
        initScrollAnimations,
        initStickyContact,
        initSmoothScrolling
    };
}
