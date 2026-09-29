/* ============================================
   BIANCHI AUTOMOTORES — script.js
   Versión 2.0 | 2026
   ============================================ */

(function () {
    'use strict';

    /* ============================
       NAVBAR — scroll effect
       ============================ */
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 60;

    function handleNavScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    /* ============================
       HAMBURGER MENU
       ============================ */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        navLinks.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    /* ============================
       ACTIVE NAV LINK — scroll spy
       ============================ */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveLink() {
        let current = '';
        sections.forEach(sec => {
            const offset = sec.offsetTop - 120;
            if (window.scrollY >= offset) {
                current = sec.getAttribute('id');
            }
        });
        navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    /* ============================
       CATALOG — Ver más / Ver menos
       ============================ */
    const btnVerMas   = document.getElementById('btnVerMas');
    const btnVerMenos = document.getElementById('btnVerMenos');
    const extraCards  = document.querySelectorAll('.cat-card.cat-extra');

    if (btnVerMas && extraCards.length) {
        btnVerMas.addEventListener('click', () => {
            extraCards.forEach(c => {
                c.classList.add('visible');
                setTimeout(() => c.classList.add('animated'), 50);
            });
            btnVerMas.classList.add('hidden');
            btnVerMenos.classList.remove('hidden');
        });

        btnVerMenos.addEventListener('click', () => {
            extraCards.forEach(c => c.classList.remove('visible', 'animated'));
            btnVerMenos.classList.add('hidden');
            btnVerMas.classList.remove('hidden');
            document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
        });
    }

    /* ============================
       CATALOG FILTERS
       ============================ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const catCards = document.querySelectorAll('.cat-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            catCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const match = card.dataset.category === filter;
                    card.classList.toggle('hidden', !match);
                }
            });
        });
    });

    /* ============================
       FAQ ACCORDION
       ============================ */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-q');
        const answer = item.querySelector('.faq-a');

        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all
            faqItems.forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-a').classList.remove('open');
            });

            // Toggle current
            if (!isOpen) {
                item.classList.add('open');
                answer.classList.add('open');
            }
        });
    });

    /* ============================
       CONTACT FORM → WhatsApp
       ============================ */
    const form = document.getElementById('contactForm');
    const WA_NUMBER = '5493814670641';

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('f-name').value.trim();
            const phone = document.getElementById('f-phone').value.trim();
            const email = document.getElementById('f-email').value.trim();
            const interest = document.getElementById('f-interest').value;
            const msg = document.getElementById('f-msg').value.trim();

            if (!name || !phone) {
                alert('Por favor completá tu nombre y teléfono.');
                return;
            }

            let text = `Hola Bianchi Automotores! 👋\n\n`;
            text += `*Nombre:* ${name}\n`;
            text += `*Teléfono:* ${phone}\n`;
            if (email) text += `*Email:* ${email}\n`;
            if (interest) text += `*Consulta sobre:* ${interest}\n`;
            if (msg) text += `*Mensaje:* ${msg}\n`;
            text += `\nContacto desde la web.`;

            const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        });
    }

    /* ============================
       SCROLL ANIMATIONS (AOS-like)
       ============================ */
    const animatedEls = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Respect delay if set via CSS var --delay
                const delay = parseFloat(
                    getComputedStyle(entry.target).getPropertyValue('--delay') || '0'
                ) * 1000;

                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -48px 0px'
    });

    animatedEls.forEach(el => observer.observe(el));

    /* ============================
       WA FLOAT — hide on footer
       ============================ */
    const waFloat = document.getElementById('wa-float');
    const footer = document.querySelector('.footer');

    if (waFloat && footer) {
        const footerObserver = new IntersectionObserver(([entry]) => {
            waFloat.style.opacity = entry.isIntersecting ? '0' : '1';
            waFloat.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
        }, { threshold: 0.1 });

        footerObserver.observe(footer);
    }

    /* ============================
       SMOOTH SCROLL for anchors
       ============================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = navbar ? navbar.offsetHeight + 8 : 72;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ============================
       LAZY LOADING fallback
       ============================ */
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported — no action needed
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imgObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imgObserver.observe(img));
    }

    console.log('✅ Bianchi Automotores — v2.0 loaded');
})();
