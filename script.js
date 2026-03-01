// ============================================
// NORDIC CHESS OPEN - JavaScript Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Generate dynamic footer
    initFooter();

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

    // Speed up about section videos and set start time for first video
    const aboutVideos = document.querySelectorAll('.about-image video');
    aboutVideos.forEach((video, index) => {
        video.playbackRate = 3;
        if (index === 0) {
            video.addEventListener('loadedmetadata', () => {
                video.currentTime = 1;
            }, { once: true });
            // In case metadata already loaded
            if (video.readyState >= 1) {
                video.currentTime = 1;
            }
        }
    });

    // Futuristic Effects
    initParticles();
    initDataStream();

    // Venue Gallery - 3D Arc (desktop) / Carousel (tablet & mobile)
    initVenueGallery();
    initVenueCarousel();

    // Team Banner entrance animation
    initTeamBanner();
});

// ============================================
// DYNAMIC FOOTER
// ============================================

function initFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    const legalPages = ['privacy.html', 'cookies.html', 'terms.html'];
    const isLegalPage = legalPages.includes(page);

    const contactLinks = isLegalPage
        ? '<a href="mailto:contact@thesquarechessclub.com">contact@thesquarechessclub.com</a>'
        : `<a href="mailto:contact@thesquarechessclub.com">contact@thesquarechessclub.com</a>
                    <a href="tel:0765815641">0765 815 641</a>`;

    const thirdNavLink = isLegalPage
        ? '<a href="contact.html">Contact</a>'
        : '<a href="contact.html">Înscriere</a>';

    const currentYear = new Date().getFullYear();

    const instagramSVG = '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>';
    const facebookSVG = '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';
    const linkedinSVG = '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';

    placeholder.outerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-top">
                <div class="footer-logo">
                    <img src="images/logo-footer.png" alt="THE SQUARE" class="logo-img">
                </div>
            </div>
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>Contact</h4>
                    ${contactLinks}
                </div>
                <div class="footer-col">
                    <h4>Locație</h4>
                    <a href="https://maps.google.com/?q=Nod+Makerspace+Splaiul+Unirii+160+Bucuresti" target="_blank" rel="noopener noreferrer">
                        <p>Nod Makerspace</p>
                        <p>Splaiul Unirii 160, București</p>
                    </a>
                </div>
                <div class="footer-col">
                    <h4>Linkuri</h4>
                    <a href="schedule.html">Program</a>
                    <a href="rules.html">Regulament</a>
                    ${thirdNavLink}
                </div>
                <div class="footer-col">
                    <h4>Social</h4>
                    <div class="footer-social">
                        <a href="https://www.instagram.com/thesquare_chess?igsh=MWNwcXdjcW9sNDNvcA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            ${instagramSVG}
                        </a>
                        <a href="https://facebook.com/profile.php?id=61556605701740" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            ${facebookSVG}
                        </a>
                        <a href="https://www.linkedin.com/company/105457314/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            ${linkedinSVG}
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${currentYear} THE SQUARE Chess Club</p>
                <div class="footer-legal">
                    <a href="privacy.html">Confidențialitate</a>
                    <span>•</span>
                    <a href="terms.html">Termeni</a>
                    <span>•</span>
                    <a href="cookies.html">Cookies</a>
                </div>
            </div>
        </div>
    </footer>`;
}

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
// SPLASH CURSOR - WebGL Fluid Effect (Debug)
// ============================================

function initCustomCursor() {
    // Only enable on devices with fine pointer (mouse)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        console.log('Splash cursor: No fine pointer detected');
        return;
    }

    console.log('Splash cursor: Initializing...');

    // Test WebGL support
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!gl) {
        console.log('Splash cursor: WebGL not supported, using Canvas 2D fallback');
    } else {
        console.log('Splash cursor: WebGL supported, version:', gl.getParameter(gl.VERSION));
    }

    // Project colors
    const colors = [
        'rgba(184, 217, 212, 0.8)',  // #b8d9d4 - teal
        'rgba(166, 183, 224, 0.8)',  // #a6b7e0 - soft blue
        'rgba(125, 211, 252, 0.8)',  // #7dd3fc - glow primary
        'rgba(165, 243, 252, 0.8)',  // #a5f3fc - glow secondary
        'rgba(196, 181, 253, 0.8)',  // #c4b5fd - glow accent
    ];

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'splash-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Resize
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Particles
    const particles = [];
    let mouseX = 0, mouseY = 0;
    let lastMouseX = 0, lastMouseY = 0;

    class Particle {
        constructor(x, y, vx, vy) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.life = 1;
            this.decay = 0.015 + Math.random() * 0.01;
            this.size = 20 + Math.random() * 30;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 0.98;
            this.vy *= 0.98;
            this.life -= this.decay;
            this.size *= 0.97;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.life * 0.6;
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animation
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate velocity
        const vx = (mouseX - lastMouseX) * 0.3;
        const vy = (mouseY - lastMouseY) * 0.3;
        const speed = Math.sqrt(vx * vx + vy * vy);

        // Spawn particles based on movement
        if (speed > 1) {
            const count = Math.min(Math.floor(speed / 3), 5);
            for (let i = 0; i < count; i++) {
                const angle = Math.atan2(vy, vx) + (Math.random() - 0.5) * 1.5;
                const vel = speed * 0.2 + Math.random() * 2;
                particles.push(new Particle(
                    mouseX + (Math.random() - 0.5) * 10,
                    mouseY + (Math.random() - 0.5) * 10,
                    Math.cos(angle) * vel,
                    Math.sin(angle) * vel
                ));
            }
        }

        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            p.draw();
            if (p.life <= 0 || p.size < 1) {
                particles.splice(i, 1);
            }
        }

        // Limit particles
        while (particles.length > 100) {
            particles.shift();
        }

        lastMouseX = mouseX;
        lastMouseY = mouseY;

        requestAnimationFrame(animate);
    }

    animate();
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
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // Wing photos staggered reveal
    const wingPhotos = document.querySelectorAll('.wing-photo');
    if (wingPhotos.length) {
        const wingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    wingObserver.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.2 });

        wingPhotos.forEach(el => wingObserver.observe(el));
    }

    // Step cards staggered reveal
    const stepCards = document.querySelectorAll('.step-card');
    if (stepCards.length) {
        const stepsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = document.querySelectorAll('.step-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 200);
                    });
                    stepsObserver.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.2 });

        stepsObserver.observe(stepCards[0]);
    }
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
        clearInterval(autoPlay);
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
// VENUE GALLERY - VOKU STUDIO EXACT REPLICA
// ============================================

function initVenueGallery() {
    const section = document.querySelector('.venue-gallery');
    const sticky = document.querySelector('.venue-gallery-sticky');
    const slides = document.getElementById('venueGallerySlides');

    if (!section || !sticky || !slides) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if mobile
    const isMobile = () => window.innerWidth <= 1024;

    if (prefersReducedMotion) return;

    // Get all venue items for parallax
    const items = slides.querySelectorAll('.venue-item');

    // Parallax speeds and 3D transform data
    // Lower speed = moves slower (appears further back)
    // Higher speed = moves faster (appears closer)
    const parallaxData = [
        { speed: 0.7, vertical: -15, zOffset: -150, rotateY: 25, rotateX: 5 },   // Item 1 - far back
        { speed: 0.85, vertical: 10, zOffset: -100, rotateY: 18, rotateX: 3 },   // Item 2
        { speed: 0.9, vertical: -8, zOffset: -50, rotateY: 10, rotateX: 2 },     // Item 3
        { speed: 1.0, vertical: 5, zOffset: 80, rotateY: 0, rotateX: 0 },        // Item 4 - center
        { speed: 1.1, vertical: -12, zOffset: -50, rotateY: -10, rotateX: 2 },   // Item 5
        { speed: 0.95, vertical: 8, zOffset: -100, rotateY: -18, rotateX: 3 },   // Item 6
        { speed: 0.8, vertical: -10, zOffset: -150, rotateY: -25, rotateX: 5 },  // Item 7 - far back
    ];

    // Total horizontal travel distance (in vw)
    const totalTravel = 50; // vw units

    let rafId = null;
    let lastProgress = -1;
    let isEnabled = !isMobile();

    // Update gallery position based on scroll
    function updateOnScroll() {
        if (!isEnabled || isMobile()) return;

        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const stickyHeight = sticky.offsetHeight;

        // Calculate scroll progress within the section (0 to 1)
        const scrolled = -rect.top;
        const scrollableDistance = sectionHeight - stickyHeight;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

        // Optimization: skip if no significant change
        if (Math.abs(progress - lastProgress) < 0.001) return;
        lastProgress = progress;

        // Base horizontal movement in vw
        const baseMove = progress * totalTravel;

        // Apply parallax to each item while preserving 3D transforms
        items.forEach((item, index) => {
            const data = parallaxData[index] || { speed: 1, vertical: 0, zOffset: 0, rotateY: 0, rotateX: 0 };

            // Horizontal parallax (moves items left as you scroll)
            const xOffset = baseMove * data.speed;

            // Vertical parallax (subtle floating effect)
            const yOffset = progress * data.vertical;

            // Apply transform with 3D properties preserved
            item.style.transform = `translateX(-${xOffset}vw) translateY(${yOffset}px) translateZ(${data.zOffset}px) rotateY(${data.rotateY}deg) rotateX(${data.rotateX}deg)`;
        });
    }

    // Throttled scroll handler
    function onScroll() {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            updateOnScroll();
            rafId = null;
        });
    }

    // Handle resize
    function onResize() {
        isEnabled = !isMobile();

        if (isMobile()) {
            // Reset transforms on mobile
            items.forEach(item => {
                item.style.transform = '';
            });
            lastProgress = -1;
        } else {
            // Reset to initial 3D transforms before applying scroll-based parallax
            items.forEach((item, index) => {
                const data = parallaxData[index] || { zOffset: 0, rotateY: 0, rotateX: 0 };
                item.style.transform = `translateZ(${data.zOffset}px) rotateY(${data.rotateY}deg) rotateX(${data.rotateX}deg)`;
            });
            updateOnScroll();
        }
    }

    // Event listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Initial update
    if (isEnabled) {
        updateOnScroll();
    }

    // Intersection Observer for entrance animation
    const gallery = document.querySelector('.venue-gallery');
    if (gallery) {
        const entranceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gallery.classList.add('revealed');
                    entranceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        entranceObserver.observe(gallery);
    }

    return function cleanup() {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        if (rafId) cancelAnimationFrame(rafId);
    };
}

// ============================================
// VENUE GALLERY CAROUSEL (Tablet & Mobile)
// ============================================

function initVenueCarousel() {
    const track = document.getElementById('venueGallerySlides');
    const prevBtn = document.querySelector('.venue-prev-btn');
    const nextBtn = document.querySelector('.venue-next-btn');
    const dotsContainer = document.querySelector('.venue-carousel-dots');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const items = track.querySelectorAll('.venue-item');
    let currentIndex = 0;
    let itemsPerView = getItemsPerView();
    let totalSlides = Math.ceil(items.length / itemsPerView);
    let isCarouselActive = window.innerWidth <= 1024;

    function getItemsPerView() {
        if (window.innerWidth <= 1024) return 1;
        return items.length;
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        updateCarousel();
    }

    function updateCarousel() {
        if (!isCarouselActive) return;

        const slideWidth = items[0].offsetWidth;
        const offset = currentIndex * slideWidth;
        track.style.transform = `translateX(-${offset}px)`;

        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    });

    // Touch/Swipe support
    let touchStartX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        const threshold = 50;

        if (diff > threshold) {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        } else if (diff < -threshold) {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
    }, { passive: true });

    // Handle resize
    let resizeTimer;
    function onResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newItemsPerView = getItemsPerView();
            const nowActive = window.innerWidth <= 1024;

            if (newItemsPerView !== itemsPerView || nowActive !== isCarouselActive) {
                itemsPerView = newItemsPerView;
                isCarouselActive = nowActive;
                totalSlides = Math.ceil(items.length / itemsPerView);
                currentIndex = 0;
                createDots();

                if (isCarouselActive) {
                    updateCarousel();
                } else {
                    track.style.transform = '';
                }
            }
        }, 150);
    }

    window.addEventListener('resize', onResize, { passive: true });

    // Initialize
    if (isCarouselActive) {
        createDots();
        updateCarousel();
    }
}

// ============================================
// FUTURISTIC EFFECTS - PARTICLES
// ============================================

function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    // Skip on mobile for performance
    if (window.innerWidth < 768) return;

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

    // Skip on mobile for performance
    if (window.innerWidth < 768) return;

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

// ============================================
// TEAM BANNER - Entrance Animation
// ============================================

function initTeamBanner() {
    const banner = document.querySelector('.team-banner');
    if (!banner) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                banner.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(banner);
}

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

// ============================================
// FORM SUBMISSION HANDLER (Contact & Registration)
// Web3Forms - funcționează și local și online
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Handle Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        setupFormHandler(contactForm, 'formStatus', '.contact-form-submit');
    }

    // Handle Hero Registration Form
    const heroForm = document.getElementById('heroForm');
    if (heroForm) {
        setupFormHandler(heroForm, 'heroFormStatus', '.btn-form-submit');
    }

    // Add "touched" class to select elements on change/blur for validation styling
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', () => select.classList.add('touched'));
        select.addEventListener('blur', () => select.classList.add('touched'));
    });
});

function setupFormHandler(form, statusId, submitBtnSelector) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Mark all selects and checkboxes as touched on submit attempt
        form.querySelectorAll('select').forEach(select => select.classList.add('touched'));
        form.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.classList.add('touched'));

        // Check if form is valid
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const submitBtn = form.querySelector(submitBtnSelector);
        const formStatus = document.getElementById(statusId);
        const originalBtnText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = 'Se trimite...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                formStatus.innerHTML = '<div class="form-success">✓ Trimis cu succes! Îți vom răspunde în curând.</div>';
                form.reset();
            } else {
                formStatus.innerHTML = '<div class="form-error">✗ ' + (result.message || 'A apărut o eroare.') + '</div>';
            }
        } catch (error) {
            formStatus.innerHTML = '<div class="form-error">✗ Eroare de conexiune. Te rugăm să încerci din nou.</div>';
        }

        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;

        if (formStatus.querySelector('.form-success')) {
            setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
        }
    });
}

