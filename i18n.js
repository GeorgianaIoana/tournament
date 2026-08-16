/**
 * Lightweight i18n module for THE SQUARE Chess Tournament website
 * Supports Romanian (ro) and English (en)
 */
class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ro';
        this.messages = {};
        this.loaded = false;
    }

    async init() {
        await this.load(this.currentLang);
        this.updateLangButtons();
        return this;
    }

    async load(lang) {
        try {
            const response = await fetch(`/locales/${lang}.json?v=5`);
            if (!response.ok) throw new Error(`Failed to load ${lang} translations`);
            this.messages = await response.json();
            this.currentLang = lang;
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
            this.loaded = true;
            this.updateDOM();
            this.updateLangButtons();
        } catch (error) {
            console.error('i18n load error:', error);
            // Fallback to Romanian if loading fails
            if (lang !== 'ro') {
                await this.load('ro');
            }
        }
    }

    t(key, fallback) {
        return this.messages[key] || fallback || key;
    }

    updateDOM() {
        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const translation = this.t(key);

            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.placeholder !== undefined && el.dataset.i18nAttr === 'placeholder') {
                    el.placeholder = translation;
                } else if (el.dataset.i18nAttr === 'title') {
                    el.title = translation;
                } else if (el.dataset.i18nAttr === 'value') {
                    el.value = translation;
                }
            } else if (el.tagName === 'OPTION') {
                el.textContent = translation;
            } else if (el.tagName === 'META') {
                el.content = translation;
            } else {
                el.textContent = translation;
            }
        });

        // Update elements with data-i18n-html for HTML content
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.dataset.i18nHtml;
            el.innerHTML = this.t(key);
        });

        // Update elements with data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            el.placeholder = this.t(key);
        });

        // Update elements with data-i18n-title
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;
            el.title = this.t(key);
        });

        // Update elements with data-i18n-aria-label
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.dataset.i18nAria;
            el.setAttribute('aria-label', this.t(key));
        });

        // Dispatch custom event for dynamic content handlers
        window.dispatchEvent(new CustomEvent('i18n:updated', { detail: { lang: this.currentLang } }));
    }

    updateLangButtons() {
        // Update dropdown current language display
        document.querySelectorAll('.lang-current').forEach(el => {
            el.textContent = this.currentLang.toUpperCase();
        });

        // Update dropdown options
        document.querySelectorAll('.lang-option').forEach(btn => {
            const btnLang = btn.dataset.lang;
            btn.classList.toggle('active', btnLang === this.currentLang);
        });

        // Update mobile language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const btnLang = btn.dataset.lang;
            btn.classList.toggle('active', btnLang === this.currentLang);
        });
    }

    async switchTo(lang) {
        if (lang !== this.currentLang) {
            await this.load(lang);
        }
    }

    get lang() {
        return this.currentLang;
    }
}

// Create global instance
const i18n = new I18n();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    i18n.init().then(() => {
        // Set up language dropdown toggle
        document.querySelectorAll('.lang-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = toggle.closest('.lang-dropdown');
                dropdown.classList.toggle('open');
            });
        });

        // Set up language option click handlers (dropdown)
        document.querySelectorAll('.lang-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                i18n.switchTo(lang);
                // Close dropdown
                const dropdown = btn.closest('.lang-dropdown');
                if (dropdown) dropdown.classList.remove('open');
            });
        });

        // Set up mobile language switcher click handlers
        document.querySelectorAll('.mobile-language-switcher .lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                i18n.switchTo(lang);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.lang-dropdown')) {
                document.querySelectorAll('.lang-dropdown.open').forEach(dropdown => {
                    dropdown.classList.remove('open');
                });
            }
        });
    });
});

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { i18n, I18n };
}
