// ============================================
// NORDIC CHESS OPEN - JavaScript Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize page transition on load
    initPageTransition();

    // Initialize all modules
    initCustomCursor();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initParallax();
    initCounterAnimation();
    initTestimonialCarousel();
    initFormLabels();
    initSmoothScroll();
    initSoundToggle();
    initHeroForm();
    initDiscoverMore();

    // Futuristic Effects
    initParticles();
    initDataStream();

    // Venue Tour Carousel
    initVenueCarousel();
});

// ============================================
// PAGE TRANSITION
// ============================================

function initPageTransition() {
    const transition = document.getElementById('pageTransition');
    if (!transition) return;

    // Play entering animation on page load
    setTimeout(() => {
        transition.classList.add('entering');
    }, 100);

    // Remove entering class after animation
    setTimeout(() => {
        transition.classList.remove('entering');
    }, 800);

    // Handle all links that go to other pages
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href) return;

        // Skip anchor links
        if (href.startsWith('#')) return;

        // Skip external links
        if (href.startsWith('http') && !href.includes(window.location.hostname)) return;

        // Skip if modifier key is pressed
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;

        // Check if it's an internal page link (ends with .html or is a relative path)
        if (href.endsWith('.html') || href.includes('.html#')) {
            e.preventDefault();

            // Trigger exit animation
            transition.classList.add('active');

            // Navigate after animation
            setTimeout(() => {
                window.location.href = href;
            }, 700);
        }
    });
}

// ============================================
// CUSTOM CURSOR
// ============================================

function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    // Only enable on devices with fine pointer (mouse)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update dot position immediately
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth outline following
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .event-card, .player-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const nav = document.getElementById('nav');
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleNavScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    function handleNavScroll() {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when past hero
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    // Initial check
    handleNavScroll();
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    if (!navToggle || !mobileMenu) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================

function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-left, .reveal-right');

    if (!revealElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Unobserve after revealing for performance
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

// ============================================
// PARALLAX EFFECTS
// ============================================

function initParallax() {
    const parallaxImage = document.querySelector('.parallax-image');

    if (!parallaxImage) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxSection = parallaxImage.closest('.parallax-break');

        if (!parallaxSection) return;

        const sectionTop = parallaxSection.offsetTop;
        const sectionHeight = parallaxSection.offsetHeight;
        const windowHeight = window.innerHeight;

        // Check if section is in view
        if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            const yPos = (scrolled - sectionTop + windowHeight) * 0.3;
            parallaxImage.style.transform = `translateY(${yPos}px)`;
        }
    }
}

// ============================================
// COUNTER ANIMATION
// ============================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');

    if (!counters.length) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// ============================================
// TESTIMONIAL CAROUSEL
// ============================================

function initTestimonialCarousel() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let totalSlides = Math.ceil(cards.length / cardsPerView);

    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Get cards per view based on screen size
    function getCardsPerView() {
        if (window.innerWidth <= 640) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    // Update carousel on resize
    window.addEventListener('resize', () => {
        const newCardsPerView = getCardsPerView();
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            totalSlides = Math.ceil(cards.length / cardsPerView);
            currentIndex = 0;
            createDots();
            updateCarousel();
        }
    });

    // Navigate to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Update carousel position
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 32;
        const offset = currentIndex * (cardWidth + gap) * cardsPerView;

        track.style.transform = `translateX(-${offset}px)`;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Previous slide
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    // Next slide
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    });

    // Initialize
    createDots();

    // Auto-play (optional)
    let autoPlay = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        const diff = touchStartX - touchEndX;

        if (diff > threshold) {
            // Swipe left - next
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        } else if (diff < -threshold) {
            // Swipe right - prev
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
    }
}

// ============================================
// FORM LABELS (Floating labels fix)
// ============================================

function initFormLabels() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

    inputs.forEach(input => {
        // Add placeholder to make :placeholder-shown work
        if (!input.placeholder) {
            input.placeholder = ' ';
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerOffset = 100;
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

// ============================================
// FORM SUBMISSION (Basic handling)
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to a server
        console.log('Form submitted:', data);

        // Show success message (you can customize this)
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Message Sent!</span>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// ============================================
// PRELOADER (Optional - Add HTML if needed)
// ============================================

// ============================================
// SOUND TOGGLE
// ============================================

function initSoundToggle() {
    const soundToggle = document.getElementById('soundToggle');
    const heroVideo = document.querySelector('.hero-video');

    if (!soundToggle) return;

    // Start muted
    soundToggle.classList.add('muted');

    soundToggle.addEventListener('click', () => {
        soundToggle.classList.toggle('muted');

        if (heroVideo) {
            heroVideo.muted = soundToggle.classList.contains('muted');
        }
    });
}

// ============================================
// HERO FORM
// ============================================

function initHeroForm() {
    const heroForm = document.getElementById('heroForm');

    if (!heroForm) return;

    heroForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(heroForm);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to a server
        console.log('Hero form submitted:', data);

        // Show success message
        const btn = heroForm.querySelector('.btn-form-submit');
        const originalText = btn.textContent;
        btn.textContent = 'Request Sent!';
        btn.disabled = true;
        btn.style.backgroundColor = 'var(--color-accent)';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
            heroForm.reset();
        }, 3000);
    });
}

// ============================================
// DISCOVER MORE (Scroll to next section)
// ============================================

function initDiscoverMore() {
    const discoverMore = document.querySelector('.hero-discover');

    if (!discoverMore) return;

    discoverMore.addEventListener('click', () => {
        // Find the first section after hero
        const nextSection = document.querySelector('.hero + section, .hero ~ section');

        if (nextSection) {
            const headerOffset = 80;
            const elementPosition = nextSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ============================================
// VENUE TOUR 3D CAROUSEL
// ============================================

function initVenueCarousel() {
    const carousel = document.getElementById('venueCarousel');
    const prevBtn = document.getElementById('venuePrev');
    const nextBtn = document.getElementById('venueNext');

    if (!carousel || !prevBtn || !nextBtn) return;

    const slides = carousel.querySelectorAll('.venue-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    // Position definitions for 3D effect
    const positions = ['far-left', 'left', 'center', 'right', 'far-right', 'hidden'];

    // Update slide positions
    function updateSlidePositions() {
        slides.forEach((slide, index) => {
            // Calculate position relative to current index
            let position = index - currentIndex;

            // Normalize position for circular carousel
            if (position < -2) position += totalSlides;
            if (position > 2) position -= totalSlides;

            // Map position to CSS class
            let positionName;
            switch (position) {
                case -2:
                    positionName = 'far-left';
                    break;
                case -1:
                    positionName = 'left';
                    break;
                case 0:
                    positionName = 'center';
                    break;
                case 1:
                    positionName = 'right';
                    break;
                case 2:
                    positionName = 'far-right';
                    break;
                default:
                    positionName = 'hidden';
            }

            slide.setAttribute('data-position', positionName);
        });
    }

    // Navigate to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlidePositions();
    }

    // Navigate to previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlidePositions();
    }

    // Click on slide to center it
    function handleSlideClick(e) {
        const slide = e.currentTarget;
        const position = slide.getAttribute('data-position');

        if (position === 'left' || position === 'far-left') {
            prevSlide();
        } else if (position === 'right' || position === 'far-right') {
            nextSlide();
        }
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    slides.forEach(slide => {
        slide.addEventListener('click', handleSlideClick);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Only if carousel is in view
        const rect = carousel.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;

        if (inView) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        const diff = touchStartX - touchEndX;

        if (diff > threshold) {
            nextSlide();
        } else if (diff < -threshold) {
            prevSlide();
        }
    }

    // Auto-rotate (optional - can be removed if not desired)
    let autoRotate = setInterval(nextSlide, 5000);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });

    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(nextSlide, 5000);
    });

    // Initialize positions
    updateSlidePositions();
}

// ============================================
// FUTURISTIC EFFECTS - PARTICLES
// ============================================

function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random position
    particle.style.left = Math.random() * 100 + '%';

    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random animation duration and delay
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 15;
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';

    // Random color variation
    const colors = [
        'rgba(125, 211, 252, 0.8)',
        'rgba(196, 181, 253, 0.8)',
        'rgba(110, 231, 183, 0.8)',
        'rgba(240, 171, 252, 0.8)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;

    container.appendChild(particle);

    // Activate with slight delay for staggered effect
    setTimeout(() => {
        particle.classList.add('active');
    }, index * 100);
}

// ============================================
// FUTURISTIC EFFECTS - DATA STREAM
// ============================================

function initDataStream() {
    const container = document.getElementById('dataStream');
    if (!container) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lineCount = 15;

    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.classList.add('data-line');

        // Random horizontal position
        line.style.left = Math.random() * 100 + '%';

        // Random height
        const height = Math.random() * 100 + 50;
        line.style.height = height + 'px';

        // Random animation duration and delay
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 8;
        line.style.animationDuration = duration + 's';
        line.style.animationDelay = delay + 's';

        container.appendChild(line);
    }
}

// ============================================
// PRELOADER (Optional - Add HTML if needed)
// ============================================

window.addEventListener('load', () => {
    // Remove preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 500);
    }

    // Trigger initial animations for hero elements
    const heroElements = document.querySelectorAll('.hero .reveal-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('revealed');
        }, 100 * index);
    });
});
