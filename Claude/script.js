// Global variables
let currencyRates = {
    USD: 1,
    EUR: 0.85,
    TRY: 27.5,
    CNY: 7.2
};

// DOM elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const dailySearchesSlider = document.getElementById('daily-searches');
const dailySearchesInput = document.getElementById('daily-searches-input');
const currencySelect = document.getElementById('currency');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializePricingCalculator();
    initializeScrollEffects();
    fetchCurrencyRates();
    animateCounters();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(11, 20, 38, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(11, 20, 38, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize animations and observers
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with data-aos attributes
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects to cards
    document.querySelectorAll('.capability-card, .testimonial-card, .step').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Pricing calculator functionality
function initializePricingCalculator() {
    // Sync slider and input
    dailySearchesSlider.addEventListener('input', function() {
        dailySearchesInput.value = this.value;
        updatePricingCalculation();
    });

    dailySearchesInput.addEventListener('input', function() {
        const value = Math.max(1, Math.min(1000, parseInt(this.value) || 1));
        this.value = value;
        dailySearchesSlider.value = value;
        updatePricingCalculation();
    });

    // Currency change
    currencySelect.addEventListener('change', function() {
        updatePricingCalculation();
    });

    // Initial calculation
    updatePricingCalculation();
}

// Update pricing calculation with animations
function updatePricingCalculation() {
    const dailySearches = parseInt(dailySearchesSlider.value);
    const monthlySearches = dailySearches * 30;
    const creditsNeeded = Math.ceil(monthlySearches / 50) * 50; // Round up to nearest 50
    const currency = currencySelect.value;
    const rate = currencyRates[currency];
    
    // Base price per credit in USD
    const basePriceUSD = 0.15;
    
    // Calculate discount based on volume tiers
    let discount = 0;
    if (creditsNeeded >= 5000) discount = 50;
    else if (creditsNeeded >= 3000) discount = 40;
    else if (creditsNeeded >= 1500) discount = 30;
    else if (creditsNeeded >= 500) discount = 20;
    else if (creditsNeeded >= 100) discount = 10;
    
    // Calculate prices
    const originalPriceUSD = basePriceUSD;
    const discountedPriceUSD = originalPriceUSD * (1 - discount / 100);
    const totalCostUSD = creditsNeeded * discountedPriceUSD;
    
    // Convert to selected currency
    const originalPrice = originalPriceUSD * rate;
    const discountedPrice = discountedPriceUSD * rate;
    const totalCost = totalCostUSD * rate;
    
    // Get currency symbol
    const currencySymbols = {
        USD: '$',
        EUR: '€',
        TRY: '₺',
        CNY: '¥'
    };
    const symbol = currencySymbols[currency];
    
    // Update display with animations
    animateValue('monthly-searches', monthlySearches.toLocaleString());
    animateValue('credits-needed', creditsNeeded.toLocaleString());
    animateValue('original-price', `${symbol}${originalPrice.toFixed(3)}`);
    animateValue('discount-applied', `${discount}%`);
    animateValue('discounted-price', `${symbol}${discountedPrice.toFixed(3)}`);
    animateValue('total-cost', `${symbol}${totalCost.toFixed(2)}`);
}

// Animate value changes
function animateValue(elementId, newValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.style.transform = 'scale(1.05)';
    element.style.color = '#3B82F6';
    
    setTimeout(() => {
        element.textContent = newValue;
        element.style.transform = 'scale(1)';
        
        // Reset color based on element type
        if (elementId === 'discount-applied') {
            element.style.color = '#10B981';
        } else if (element.closest('.total')) {
            element.style.color = '#FFFFFF';
        } else {
            element.style.color = '#111827';
        }
    }, 150);
}

// Fetch live currency rates
async function fetchCurrencyRates() {
    try {
        // Using a free API for currency rates
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        
        if (data && data.rates) {
            currencyRates = {
                USD: 1,
                EUR: data.rates.EUR || 0.85,
                TRY: data.rates.TRY || 27.5,
                CNY: data.rates.CNY || 7.2
            };
            
            // Update calculation with new rates
            updatePricingCalculation();
        }
    } catch (error) {
        console.log('Using fallback currency rates');
        // Keep default rates if API fails
    }
}

// Scroll effects
function initializeScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroParticles = document.querySelector('.hero-particles');
        
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Progress indicator (optional)
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #3B82F6, #06B6D4);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Animate counters in hero section
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (target === 99.9) {
                    counter.textContent = Math.min(current, target).toFixed(1) + '%';
                } else {
                    counter.textContent = Math.floor(Math.min(current, target)).toLocaleString();
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target === 99.9) {
                    counter.textContent = target + '%';
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
        };
        
        updateCounter();
    };

    // Intersection observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Button click handlers
document.addEventListener('click', function(e) {
    // Handle CTA button clicks
    if (e.target.matches('.btn-primary') || e.target.closest('.btn-primary')) {
        e.preventDefault();
        
        // Add click animation
        const button = e.target.matches('.btn-primary') ? e.target : e.target.closest('.btn-primary');
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Show modal or redirect (placeholder)
        showSignupModal();
    }
    
    // Handle secondary button clicks
    if (e.target.matches('.btn-secondary') || e.target.closest('.btn-secondary')) {
        e.preventDefault();
        
        const button = e.target.matches('.btn-secondary') ? e.target : e.target.closest('.btn-secondary');
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Show demo modal (placeholder)
        showDemoModal();
    }
});

// Modal functions (placeholders)
function showSignupModal() {
    // Create a simple modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 3rem;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        ">
            <h2 style="margin-bottom: 1rem; color: #111827;">Get Started with BAHA AI</h2>
            <p style="margin-bottom: 2rem; color: #6B7280;">Sign up now and receive 100 free search credits to explore our platform.</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="closeModal()" style="
                    padding: 12px 24px;
                    border: 2px solid #3B82F6;
                    background: transparent;
                    color: #3B82F6;
                    border-radius: 12px;
                    cursor: pointer;
                    font-weight: 600;
                ">Maybe Later</button>
                <button onclick="window.open('mailto:contact@bahaai.com?subject=Sign Up Request', '_blank'); closeModal();" style="
                    padding: 12px 24px;
                    border: none;
                    background: linear-gradient(135deg, #3B82F6, #06B6D4);
                    color: white;
                    border-radius: 12px;
                    cursor: pointer;
                    font-weight: 600;
                ">Sign Up Now</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('div').style.transform = 'scale(1)';
    }, 10);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    window.currentModal = modal;
}

function showDemoModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 3rem;
            border-radius: 20px;
            max-width: 600px;
            width: 90%;
            text-align: center;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        ">
            <h2 style="margin-bottom: 1rem; color: #111827;">Watch BAHA AI Demo</h2>
            <p style="margin-bottom: 2rem; color: #6B7280;">See how BAHA AI transforms complex data into actionable insights in real-time.</p>
            <div style="
                width: 100%;
                height: 300px;
                background: linear-gradient(135deg, #0B1426, #1A2B47);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 2rem;
                color: white;
                font-size: 1.2rem;
            ">
                🎥 Demo Video Coming Soon
            </div>
            <button onclick="closeModal()" style="
                padding: 12px 24px;
                border: none;
                background: linear-gradient(135deg, #3B82F6, #06B6D4);
                color: white;
                border-radius: 12px;
                cursor: pointer;
                font-weight: 600;
            ">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('div').style.transform = 'scale(1)';
    }, 10);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    window.currentModal = modal;
}

function closeModal() {
    if (window.currentModal) {
        window.currentModal.style.opacity = '0';
        setTimeout(() => {
            if (window.currentModal && window.currentModal.parentNode) {
                window.currentModal.parentNode.removeChild(window.currentModal);
            }
            window.currentModal = null;
        }, 300);
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && window.currentModal) {
        closeModal();
    }
});

// Performance optimization: Throttle scroll events
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
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-dependent animations can be added here
}, 16)); // ~60fps

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initialize body opacity
document.body.style.opacity = '0';

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});

// Add smooth transitions to all interactive elements
const style = document.createElement('style');
style.textContent = `
    * {
        transition: transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease, background-color 0.3s ease;
    }
    
    .btn-primary:active, .btn-secondary:active {
        transform: scale(0.95) !important;
    }
    
    .capability-card:hover .capability-icon {
        transform: scale(1.1);
    }
    
    .testimonial-card:hover .author-avatar {
        transform: scale(1.05);
    }
    
    .step:hover .step-icon {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);

console.log('BAHA AI website initialized successfully! 🚀');
