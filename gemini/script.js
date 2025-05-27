document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Functionality ---
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navbar nav');
    const navLinks = document.querySelectorAll('.navbar nav ul li a');
    let lastScrollTop = 0;

    // Mobile menu toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Hide/show navbar on scroll
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
            // Scroll Down
            navbar.style.top = `-${navbar.offsetHeight}px`;
        } else {
            // Scroll Up
            navbar.style.top = '0';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        
        // Active nav link highlighting
        updateActiveNavLink();
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
    
    function updateActiveNavLink() {
        let currentSection = '';
        const sections = document.querySelectorAll('main section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - navbar.offsetHeight - 50) { // Adjusted offset
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
        // Fallback for top of page or if no section is matched
        if (currentSection === '' && pageYOffset < sections[0].offsetTop - navbar.offsetHeight - 50) {
             const homeLink = document.querySelector('.navbar nav ul li a[href="#hero"]');
             if (homeLink) homeLink.classList.add('active');
        }
    }
    updateActiveNavLink(); // Initial call


    // --- Footer Current Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Pricing Calculator ---
    const dailySearchesInput = document.getElementById('daily-searches');
    const dailySearchesValueSpan = document.getElementById('daily-searches-value');
    const monthlySearchesSpan = document.getElementById('monthly-searches');
    const originalPriceCreditSpan = document.getElementById('original-price-credit');
    const discountAppliedSpan = document.getElementById('discount-applied');
    const discountedPriceCreditSpan = document.getElementById('discounted-price-credit');
    const totalMonthlyCostSpan = document.getElementById('total-monthly-cost');
    const currencySelect = document.getElementById('currency');

    const BASE_CREDIT_PRICE = 0.15; // USD
    const DAYS_IN_MONTH = 30; // Average

    // Mock currency rates relative to USD
    const MOCK_CURRENCY_RATES = {
        USD: 1,
        EUR: 0.92, // 1 USD = 0.92 EUR
        TRY: 32.0, // 1 USD = 32 TRY
        CNY: 7.2   // 1 USD = 7.2 CNY
    };
    const CURRENCY_SYMBOLS = {
        USD: '$',
        EUR: '€',
        TRY: '₺',
        CNY: '¥'
    };

    function calculatePrice() {
        if (!dailySearchesInput) return; // Guard clause

        const dailySearches = parseInt(dailySearchesInput.value);
        const monthlySearches = dailySearches * DAYS_IN_MONTH;
        
        // Ensure credits are purchased in buckets of 50
        const actualMonthlyCredits = Math.ceil(monthlySearches / 50) * 50;

        let discountPercentage = 0;
        if (actualMonthlyCredits >= 5000) discountPercentage = 0.50;
        else if (actualMonthlyCredits >= 3000) discountPercentage = 0.40;
        else if (actualMonthlyCredits >= 1500) discountPercentage = 0.30;
        else if (actualMonthlyCredits >= 500) discountPercentage = 0.20;
        else if (actualMonthlyCredits >= 100) discountPercentage = 0.10;

        const selectedCurrency = currencySelect.value;
        const exchangeRate = MOCK_CURRENCY_RATES[selectedCurrency];
        const currencySymbol = CURRENCY_SYMBOLS[selectedCurrency];

        const originalPricePerCredit = BASE_CREDIT_PRICE * exchangeRate;
        const discountAmount = originalPricePerCredit * discountPercentage;
        const discountedPricePerCredit = originalPricePerCredit - discountAmount;
        const totalMonthlyCost = discountedPricePerCredit * actualMonthlyCredits;

        // Update UI with smooth animations for numbers
        animateValue(dailySearchesValueSpan, parseInt(dailySearchesValueSpan.textContent || '0'), dailySearches, 0, '');
        animateValue(monthlySearchesSpan, parseInt(monthlySearchesSpan.textContent || '0'), actualMonthlyCredits, 0, '');
        animateValue(originalPriceCreditSpan, parseFloat(originalPriceCreditSpan.textContent.replace(/[^0-9.-]+/g,"") || '0'), originalPricePerCredit, 2, currencySymbol);
        animateValue(discountAppliedSpan, parseFloat(discountAppliedSpan.textContent || '0'), discountPercentage * 100, 0, '%');
        animateValue(discountedPriceCreditSpan, parseFloat(discountedPriceCreditSpan.textContent.replace(/[^0-9.-]+/g,"") || '0'), discountedPricePerCredit, 2, currencySymbol);
        animateValue(totalMonthlyCostSpan, parseFloat(totalMonthlyCostSpan.textContent.replace(/[^0-9.-]+/g,"") || '0'), totalMonthlyCost, 2, currencySymbol);
    }

    function animateValue(element, start, end, decimalPlaces, prefix = '', suffix = '') {
        if (!element) return;
        if (start === end && element.textContent.includes(prefix) && element.textContent.includes(suffix)) return; // No change needed

        const duration = 500; // ms
        const range = end - start;
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            let currentValue = start + range * progress;
            
            element.textContent = `${prefix}${currentValue.toFixed(decimalPlaces)}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                 element.textContent = `${prefix}${end.toFixed(decimalPlaces)}${suffix}`; // Ensure final value is exact
            }
        }
        requestAnimationFrame(step);
    }


    if (dailySearchesInput && currencySelect) {
        dailySearchesInput.addEventListener('input', calculatePrice);
        currencySelect.addEventListener('change', calculatePrice);
        calculatePrice(); // Initial calculation
    }

    // --- Testimonial Slider (Basic) ---
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        let currentTestimonial = 0;
        if (testimonials.length > 0) {
            testimonials.forEach(t => t.style.display = 'none');
            testimonials[0].style.display = 'block';

            if (testimonials.length > 1) {
                setInterval(() => {
                    testimonials[currentTestimonial].style.display = 'none';
                    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                    testimonials[currentTestimonial].style.display = 'block';
                }, 5000); // Change every 5 seconds
            }
        }
    }
    
    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.feature-item, .step, .testimonial, .pricing-calculator, .final-cta-section .container > *, .footer .footer-links > div');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation to save resources
                // observer.unobserve(entry.target); 
            } else {
                // Optional: remove class if you want animation to replay on scroll up
                // entry.target.classList.remove('visible'); 
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});
