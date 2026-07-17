
document.addEventListener('DOMContentLoaded', () => {
    initFooter();

    initCookieConsent();

    initPageTransition();

    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initParallax();
    initCounterAnimation();
    initTestimonialCarousel();
    initFormLabels();
    initSmoothScroll();
    initSoundToggle();
    initDiscoverMore();

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

    initDataStream();

    initVenueGallery();
    initVenueCarousel();

    initTeamBanner();
});


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
                    <img src="images/logo-footer.webp" alt="THE SQUARE" class="logo-img">
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
                    <a href="amintiri.html">Amintiri</a>
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
                    <span>•</span>
                    <a href="#" id="cookieSettingsFooter">Setări Cookies</a>
                </div>
            </div>
        </div>
    </footer>`;
}


function initCookieConsent() {
    const STORAGE_KEY = 'cookie_consent';
    const CONSENT_VERSION = '1';

    function getConsent() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return null;
            const parsed = JSON.parse(stored);
            if (parsed.version === CONSENT_VERSION) return parsed;
            localStorage.removeItem(STORAGE_KEY);
            return null;
        } catch (e) {
            return null;
        }
    }

    function saveConsent(consent) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                version: CONSENT_VERSION,
                timestamp: Date.now(),
                essential: true,
                analytics: consent.analytics || false,
                functional: consent.functional || false
            }));
        } catch (e) {
            // localStorage unavailable — fail silently
        }
    }

    function applyConsent(consent) {
        if (consent.analytics) {
            // Load analytics scripts here when needed (e.g. Google Analytics)
        }
    }

    function showBanner(existingConsent) {
        // Remove any existing banner before creating a new one
        const existingBanner = document.getElementById('cookieConsent');
        if (existingBanner) {
            existingBanner.remove();
        }

        const analyticsChecked = existingConsent ? existingConsent.analytics : false;
        const functionalChecked = existingConsent ? existingConsent.functional : false;

        const html = `
        <div class="cookie-consent" id="cookieConsent">
            <div class="cookie-consent-card">
                <div class="cookie-consent-body">
                    <div class="cookie-consent-header">
                        <div class="cookie-consent-icon">♟</div>
                        <h3>Preferințe Cookies</h3>
                    </div>
                    <div class="cookie-consent-text">
                        <p>Folosim cookies pentru a-ți oferi cea mai bună experiență. Alege ce tipuri accepți sau <a href="cookies.html">citește politica noastră</a>.</p>
                    </div>
                    <div class="cookie-consent-actions">
                        <button class="cookie-btn cookie-btn-accept" id="cookieAcceptAll">Acceptă Toate</button>
                        <button class="cookie-btn cookie-btn-reject" id="cookieRejectAll">Doar Esențiale</button>
                        <button class="cookie-btn cookie-btn-manage" id="cookieManage">Personalizare</button>
                    </div>
                    <div class="cookie-consent-preferences" id="cookiePreferences">
                        <div class="cookie-consent-preferences-inner">
                            <div class="cookie-pref-category">
                                <div class="cookie-pref-details">
                                    <div class="cookie-pref-icon cookie-pref-icon-essential">♜</div>
                                    <div class="cookie-pref-info">
                                        <h4>Esențiale <span class="cookie-pref-badge">Mereu active</span></h4>
                                        <p>Necesare pentru funcționarea site-ului.</p>
                                    </div>
                                </div>
                                <label class="cookie-toggle">
                                    <input type="checkbox" checked disabled>
                                    <span class="cookie-toggle-slider"></span>
                                </label>
                            </div>
                            <div class="cookie-pref-category">
                                <div class="cookie-pref-details">
                                    <div class="cookie-pref-icon cookie-pref-icon-analytics">♞</div>
                                    <div class="cookie-pref-info">
                                        <h4>Analitice</h4>
                                        <p>Ne ajută să înțelegem cum folosești site-ul.</p>
                                    </div>
                                </div>
                                <label class="cookie-toggle">
                                    <input type="checkbox" id="cookiePrefAnalytics" ${analyticsChecked ? 'checked' : ''}>
                                    <span class="cookie-toggle-slider"></span>
                                </label>
                            </div>
                            <div class="cookie-pref-category">
                                <div class="cookie-pref-details">
                                    <div class="cookie-pref-icon cookie-pref-icon-functional">♛</div>
                                    <div class="cookie-pref-info">
                                        <h4>Funcționale</h4>
                                        <p>Hărți integrate, formulare și altele.</p>
                                    </div>
                                </div>
                                <label class="cookie-toggle">
                                    <input type="checkbox" id="cookiePrefFunctional" ${functionalChecked ? 'checked' : ''}>
                                    <span class="cookie-toggle-slider"></span>
                                </label>
                            </div>
                            <div class="cookie-pref-actions">
                                <button class="cookie-btn cookie-btn-accept" id="cookieSavePrefs">Salvează Preferințele</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', html);

        const banner = document.getElementById('cookieConsent');
        const prefs = document.getElementById('cookiePreferences');

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                banner.classList.add('cookie-consent-visible');
            });
        });

        function hideBanner() {
            banner.classList.remove('cookie-consent-visible');
            banner.classList.add('cookie-consent-hiding');
            banner.addEventListener('transitionend', () => {
                banner.remove();
            }, { once: true });
        }

        document.getElementById('cookieAcceptAll').addEventListener('click', () => {
            const consent = { analytics: true, functional: true };
            saveConsent(consent);
            applyConsent(consent);
            hideBanner();
        });

        document.getElementById('cookieRejectAll').addEventListener('click', () => {
            const consent = { analytics: false, functional: false };
            saveConsent(consent);
            hideBanner();
        });

        document.getElementById('cookieManage').addEventListener('click', () => {
            prefs.classList.toggle('expanded');
        });

        document.getElementById('cookieSavePrefs').addEventListener('click', () => {
            const consent = {
                analytics: document.getElementById('cookiePrefAnalytics').checked,
                functional: document.getElementById('cookiePrefFunctional').checked
            };
            saveConsent(consent);
            applyConsent(consent);
            hideBanner();
        });
    }

    const footerLink = document.getElementById('cookieSettingsFooter');
    if (footerLink) {
        footerLink.addEventListener('click', (e) => {
            e.preventDefault();
            showBanner(getConsent());
        });
    }

    const consent = getConsent();
    if (consent) {
        applyConsent(consent);
        return;
    }

    showBanner(null);
}


function initPageTransition() {
    const transition = document.getElementById('pageTransition');
    if (!transition) return;

    setTimeout(() => {
        transition.classList.add('entering');
    }, 100);

    setTimeout(() => {
        transition.classList.remove('entering');
    }, 800);

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href) return;

        if (href.startsWith('#')) return;

        if (href.startsWith('http') && !href.includes(window.location.hostname)) return;

        if (e.metaKey || e.ctrlKey || e.shiftKey) return;

        // Check if it's an internal page link (ends with .html or is a relative path)
        if (href.endsWith('.html') || href.includes('.html#')) {
            e.preventDefault();

            transition.classList.add('active');

            const cookieBanner = document.getElementById('cookieConsent');
            if (cookieBanner) cookieBanner.classList.add('cookie-consent-hiding');

            setTimeout(() => {
                window.location.href = href;
            }, 700);
        }
    });
}


function initNavigation() {
    const nav = document.getElementById('nav');
    const alwaysScrolled = nav.classList.contains('scrolled');
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
        if (alwaysScrolled) return;

        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    handleNavScroll();
}


function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    if (!navToggle || !mobileMenu) return;

    const navEl = document.getElementById('nav');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        if (navEl) navEl.classList.toggle('menu-open');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            if (navEl) navEl.classList.remove('menu-open');
            document.body.style.overflow = '';
        });
    });
}


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

    function getCardsPerView() {
        if (window.innerWidth <= 640) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

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

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 32;
        const offset = currentIndex * (cardWidth + gap) * cardsPerView;

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

    createDots();

    let autoPlay = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }, 5000);

    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    });

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
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        } else if (diff < -threshold) {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
    }
}


function initFormLabels() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

    inputs.forEach(input => {
        // Add placeholder to make :placeholder-shown work
        if (!input.placeholder) {
            input.placeholder = ' ';
        }
    });
}


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


function initSoundToggle() {
    const soundToggle = document.getElementById('soundToggle');
    const heroVideo = document.querySelector('.hero-video');

    if (!soundToggle) return;

    soundToggle.classList.add('muted');

    soundToggle.addEventListener('click', () => {
        soundToggle.classList.toggle('muted');

        if (heroVideo) {
            heroVideo.muted = soundToggle.classList.contains('muted');
        }
    });
}


function initDiscoverMore() {
    const discoverMore = document.querySelector('.hero-discover');

    if (!discoverMore) return;

    discoverMore.addEventListener('click', () => {
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


function initVenueGallery() {
    const section = document.querySelector('.venue-gallery');
    const sticky = document.querySelector('.venue-gallery-sticky');
    const slides = document.getElementById('venueGallerySlides');

    if (!section || !sticky || !slides) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isMobile = () => window.innerWidth <= 1024;

    if (prefersReducedMotion) return;

    const items = slides.querySelectorAll('.venue-item');

    const parallaxData = [
        { speed: 0.7, vertical: -15, zOffset: -150, rotateY: 25, rotateX: 5 },
        { speed: 0.85, vertical: 10, zOffset: -100, rotateY: 18, rotateX: 3 },
        { speed: 0.9, vertical: -8, zOffset: -50, rotateY: 10, rotateX: 2 },  
        { speed: 1.0, vertical: 5, zOffset: 80, rotateY: 0, rotateX: 0 },     
        { speed: 1.1, vertical: -12, zOffset: -50, rotateY: -10, rotateX: 2 },
        { speed: 0.95, vertical: 8, zOffset: -100, rotateY: -18, rotateX: 3 },
        { speed: 0.8, vertical: -10, zOffset: -150, rotateY: -25, rotateX: 5 },  // Item 7 - far back
    ];

    const totalTravel = 50;

    let rafId = null;
    let lastProgress = -1;
    let isEnabled = !isMobile();

    function updateOnScroll() {
        if (!isEnabled || isMobile()) return;

        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const stickyHeight = sticky.offsetHeight;

        const scrolled = -rect.top;
        const scrollableDistance = sectionHeight - stickyHeight;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

        // Optimization: skip if no significant change
        if (Math.abs(progress - lastProgress) < 0.001) return;
        lastProgress = progress;

        const baseMove = progress * totalTravel;

        items.forEach((item, index) => {
            const data = parallaxData[index] || { speed: 1, vertical: 0, zOffset: 0, rotateY: 0, rotateX: 0 };

            const xOffset = baseMove * data.speed;

            const yOffset = progress * data.vertical;

            item.style.transform = `translateX(-${xOffset}vw) translateY(${yOffset}px) translateZ(${data.zOffset}px) rotateY(${data.rotateY}deg) rotateX(${data.rotateX}deg)`;
        });
    }

    function onScroll() {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            updateOnScroll();
            rafId = null;
        });
    }

    function onResize() {
        isEnabled = !isMobile();

        if (isMobile()) {
            items.forEach(item => {
                item.style.transform = '';
            });
            lastProgress = -1;
        } else {
            items.forEach((item, index) => {
                const data = parallaxData[index] || { zOffset: 0, rotateY: 0, rotateX: 0 };
                item.style.transform = `translateZ(${data.zOffset}px) rotateY(${data.rotateY}deg) rotateX(${data.rotateX}deg)`;
            });
            updateOnScroll();
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    if (isEnabled) {
        updateOnScroll();
    }

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

    if (isCarouselActive) {
        createDots();
        updateCarousel();
    }
}


function initDataStream() {
    const container = document.getElementById('dataStream');
    if (!container) return;

    if (window.innerWidth < 768) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lineCount = 15;

    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.classList.add('data-line');

        line.style.left = Math.random() * 100 + '%';

        const height = Math.random() * 100 + 50;
        line.style.height = height + 'px';

        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 8;
        line.style.animationDuration = duration + 's';
        line.style.animationDelay = delay + 's';

        container.appendChild(line);
    }
}


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
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 500);
    }

    const heroElements = document.querySelectorAll('.hero .reveal-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('revealed');
        }, 100 * index);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        setupFormHandler(contactForm, 'formStatus', '.contact-form-submit', 'Mesajul a fost trimis cu succes! Îți vom răspunde în curând.', 'success-contact.html');
        initContactFormValidation(contactForm);
        initCharacterCounter(contactForm);
    }

    const heroForm = document.getElementById('heroForm');
    if (heroForm) {
        setupRegistrationFormHandler(heroForm);
    }

    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', () => select.classList.add('touched'));
        select.addEventListener('blur', () => select.classList.add('touched'));
    });

    initCustomSelects();
});

function initCustomSelects() {
    document.querySelectorAll('.custom-select').forEach(customSelect => {
        const trigger = customSelect.querySelector('.custom-select-trigger');
        const valueDisplay = customSelect.querySelector('.custom-select-value');
        const options = customSelect.querySelectorAll('.custom-select-option');
        const selectName = customSelect.dataset.for;
        const nativeSelect = customSelect.parentElement.querySelector(`select[name="${selectName}"]`);

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = customSelect.classList.contains('open');
            closeAllCustomSelects();
            if (!isOpen) {
                customSelect.classList.add('open');
            }
        });

        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = option.dataset.value;
                const text = option.querySelector('.option-text').textContent;

                valueDisplay.textContent = text;
                customSelect.classList.add('has-value');
                customSelect.classList.remove('invalid');
                customSelect.classList.add('touched');

                options.forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');

                if (nativeSelect) {
                    nativeSelect.value = value;
                    nativeSelect.classList.add('touched');
                    nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
                }

                customSelect.classList.remove('open');
            });
        });

        trigger.setAttribute('tabindex', '0');
        trigger.setAttribute('role', 'combobox');
        trigger.setAttribute('aria-expanded', 'false');

        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                trigger.click();
            } else if (e.key === 'Escape') {
                customSelect.classList.remove('open');
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                if (!customSelect.classList.contains('open')) {
                    customSelect.classList.add('open');
                    return;
                }
                const currentIdx = [...options].findIndex(o => o.classList.contains('selected'));
                let nextIdx = e.key === 'ArrowDown' ? currentIdx + 1 : currentIdx - 1;
                nextIdx = Math.max(0, Math.min(nextIdx, options.length - 1));
                options[nextIdx].click();
            }
        });

        const observer = new MutationObserver(() => {
            trigger.setAttribute('aria-expanded', customSelect.classList.contains('open'));
        });
        observer.observe(customSelect, { attributes: true, attributeFilter: ['class'] });
    });

    document.addEventListener('click', closeAllCustomSelects);
}

function closeAllCustomSelects() {
    document.querySelectorAll('.custom-select.open').forEach(s => s.classList.remove('open'));
}

function createStatusMessage(type, message) {
    const div = document.createElement('div');
    div.className = type === 'success' ? 'form-success' : 'form-error';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', type === 'success'
        ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        : 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z');
    svg.appendChild(path);

    div.appendChild(svg);
    div.appendChild(document.createTextNode(' ' + message));
    return div;
}

function setupFormHandler(form, statusId, submitBtnSelector, successMessage, redirectUrl) {
    let lastSubmitTime = 0;
    const RATE_LIMIT_MS = 30000;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formStatus = document.getElementById(statusId);

        // Rate limit check
        const now = Date.now();
        if (now - lastSubmitTime < RATE_LIMIT_MS) {
            const remaining = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
            formStatus.innerHTML = '';
            formStatus.appendChild(createStatusMessage('error', 'Te rugăm să aștepți ' + remaining + ' secunde înainte de a trimite din nou.'));
            return;
        }

        form.querySelectorAll('select').forEach(select => select.classList.add('touched'));
        form.querySelectorAll('.custom-select').forEach(cs => {
            cs.classList.add('touched');
            const nativeSelect = cs.parentElement.querySelector('select');
            if (nativeSelect && !nativeSelect.value) {
                cs.classList.add('invalid');
            }
        });
        form.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.classList.add('touched'));

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Honeypot check — bots fill hidden fields
        const honeypot = form.querySelector('input[name="botcheck"]');
        if (honeypot && honeypot.checked) return;

        const submitBtn = form.querySelector(submitBtnSelector);
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span class="form-spinner"></span> Se trimite...';
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            lastSubmitTime = Date.now();

            if (result.success) {
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                    return;
                }
                formStatus.innerHTML = '';
                formStatus.appendChild(createStatusMessage('success', successMessage));
                form.reset();
                form.querySelectorAll('.field-valid, .field-invalid').forEach(el => {
                    el.classList.remove('field-valid', 'field-invalid');
                });
                form.querySelectorAll('.field-error-msg').forEach(el => el.remove());
                form.querySelectorAll('.custom-select').forEach(cs => {
                    cs.classList.remove('has-value', 'touched', 'invalid');
                    const valueDisplay = cs.querySelector('.custom-select-value');
                    if (valueDisplay) {
                        const nativeSelect = cs.parentElement.querySelector('select');
                        const placeholder = nativeSelect?.querySelector('option[disabled]');
                        valueDisplay.textContent = placeholder ? placeholder.textContent : 'Selectează';
                    }
                    cs.querySelectorAll('.custom-select-option.selected').forEach(o => o.classList.remove('selected'));
                });
                const counter = form.querySelector('.char-counter');
                if (counter) counter.textContent = '0 / 2000';
            } else {
                formStatus.innerHTML = '';
                formStatus.appendChild(createStatusMessage('error', result.message || 'A apărut o eroare. Te rugăm să încerci din nou.'));
            }
        } catch (error) {
            formStatus.innerHTML = '';
            formStatus.appendChild(createStatusMessage('error', 'Eroare de conexiune. Te rugăm să încerci din nou.'));
        }

        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
    });
}


function setupRegistrationFormHandler(form) {
    let lastSubmitTime = 0;
    const RATE_LIMIT_MS = 30000;
    const statusId = 'heroFormStatus';
    const submitBtnSelector = '.btn-form-submit';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formStatus = document.getElementById(statusId);

        // Rate limit check
        const now = Date.now();
        if (now - lastSubmitTime < RATE_LIMIT_MS) {
            const remaining = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
            formStatus.innerHTML = '';
            formStatus.appendChild(createStatusMessage('error', 'Te rugăm să aștepți ' + remaining + ' secunde înainte de a trimite din nou.'));
            return;
        }

        form.querySelectorAll('select').forEach(select => select.classList.add('touched'));
        form.querySelectorAll('.custom-select').forEach(cs => {
            cs.classList.add('touched');
            const nativeSelect = cs.parentElement.querySelector('select');
            if (nativeSelect && !nativeSelect.value) {
                cs.classList.add('invalid');
            }
        });
        form.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.classList.add('touched'));

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Honeypot check
        const honeypot = form.querySelector('input[name="botcheck"]');
        if (honeypot && honeypot.checked) return;

        const submitBtn = form.querySelector(submitBtnSelector);
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span class="form-spinner"></span> Se procesează...';
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');

        try {
            const formData = new FormData(form);
            const data = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                fideId: formData.get('fideId'),
                club: formData.get('club'),
                category: formData.get('category'),
            };

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            lastSubmitTime = Date.now();

            if (!response.ok) {
                formStatus.innerHTML = '';
                formStatus.appendChild(createStatusMessage('error', result.error || 'A apărut o eroare. Te rugăm să încerci din nou.'));
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('is-loading');
                return;
            }

            if (result.success) {
                if (result.isFreeEntry) {
                    // Free entry - redirect directly to success page
                    window.location.href = 'success-register.html?free=1';
                    return;
                }

                if (result.checkoutUrl) {
                    // Redirect to Stripe Checkout
                    formStatus.innerHTML = '';
                    formStatus.appendChild(createStatusMessage('success', 'Redirecționare către pagina de plată...'));
                    window.location.href = result.checkoutUrl;
                    return;
                }
            }

            // Fallback error
            formStatus.innerHTML = '';
            formStatus.appendChild(createStatusMessage('error', 'A apărut o eroare neașteptată. Te rugăm să încerci din nou.'));

        } catch (error) {
            formStatus.innerHTML = '';
            formStatus.appendChild(createStatusMessage('error', 'Eroare de conexiune. Te rugăm să încerci din nou.'));
        }

        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
    });
}


function initContactFormValidation(form) {
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');

    fields.forEach(field => {
        field.addEventListener('blur', () => {
            if (field.value.trim() !== '' || field.classList.contains('touched')) {
                field.classList.add('touched');
                validateField(field);
            }
        });

        field.addEventListener('input', () => {
            if (field.classList.contains('touched')) {
                validateField(field);
            }
        });

        if (field.tagName === 'SELECT') {
            field.addEventListener('change', () => {
                field.classList.add('touched');
                validateField(field);
            });
        }
    });
}

function validateField(field) {
    const wrapper = field.closest('.contact-form-field');
    if (!wrapper) return;

    const oldMsg = wrapper.querySelector('.field-error-msg');
    if (oldMsg) oldMsg.remove();

    const value = field.value.trim();
    let errorMsg = '';

    if (!value) {
        errorMsg = 'Acest câmp este obligatoriu.';
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMsg = 'Te rugăm să introduci o adresă de email validă.';
    } else if (field.name === 'name' && value.length < 3) {
        errorMsg = 'Numele trebuie să aibă minim 3 caractere.';
    } else if (field.name === 'message' && value.length < 10) {
        errorMsg = 'Mesajul trebuie să aibă minim 10 caractere.';
    } else if (field.tagName === 'SELECT' && !value) {
        errorMsg = 'Te rugăm să selectezi un subiect.';
    }

    const customSelect = wrapper.querySelector('.custom-select');

    if (errorMsg) {
        field.classList.add('field-invalid');
        field.classList.remove('field-valid');
        if (customSelect) {
            customSelect.classList.add('touched');
            if (!field.value) customSelect.classList.add('invalid');
        }
        const msgEl = document.createElement('span');
        msgEl.className = 'field-error-msg';
        msgEl.textContent = errorMsg;
        wrapper.appendChild(msgEl);
    } else {
        field.classList.remove('field-invalid');
        field.classList.add('field-valid');
        if (customSelect) customSelect.classList.remove('invalid');
    }
}


function initCharacterCounter(form) {
    const textarea = form.querySelector('#message');
    if (!textarea) return;

    const maxLength = parseInt(textarea.getAttribute('maxlength')) || 2000;
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.textContent = '0 / ' + maxLength;
    textarea.parentElement.appendChild(counter);

    textarea.addEventListener('input', () => {
        const len = textarea.value.length;
        counter.textContent = len + ' / ' + maxLength;

        if (len > maxLength * 0.9) {
            counter.classList.add('char-warning');
        } else {
            counter.classList.remove('char-warning');
        }
    });
}

