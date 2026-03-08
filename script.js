document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const mainContent = document.getElementById('mainContent');
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');

    // --- Mobile Menu ---
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Smooth Scroll (within main-content) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target && mainContent) {
                const offsetTop = target.offsetTop - 0;
                mainContent.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Navbar scroll effect ---
    if (mainContent && navbar) {
        mainContent.addEventListener('scroll', () => {
            if (mainContent.scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Active nav link tracking ---
    const sections = document.querySelectorAll('.section, .hero');

    function updateActiveNav() {
        const scrollPos = mainContent.scrollTop + 200;

        sections.forEach(section => {
            const id = section.getAttribute('id');
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollPos >= top && scrollPos < top + height) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    if (mainContent) {
        mainContent.addEventListener('scroll', updateActiveNav);
    }

    // --- Scroll reveal animations ---
    const revealElements = document.querySelectorAll(
        '.section-header, .about-text, .about-highlights, .highlight-card, ' +
        '.experience-card, .project-card, .skill-group, .leadership-card, ' +
        '.contact-info, .contact-form, .hero-badge, .hero-stats'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: mainContent,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Stagger project cards
    const projectCardsList = document.querySelectorAll('.project-card');
    projectCardsList.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.08}s`;
    });

    // Stagger skill groups
    const skillGroups = document.querySelectorAll('.skill-group');
    skillGroups.forEach((group, i) => {
        group.style.transitionDelay = `${i * 0.06}s`;
    });

    // --- Project Filtering ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(16px)';
                    
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(8px) scale(0.98)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // --- Contact Form ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.form-submit');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.innerHTML = `
                <span>Sent!</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            submitBtn.style.background = '#059669';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2500);
        });
    }

    // --- Skill pill hover glow ---
    document.querySelectorAll('.skill-pill').forEach(pill => {
        pill.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.15)';
        });
        pill.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // --- Typing effect for hero (subtle) ---
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }

    // --- Cursor glow on project cards ---
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.04), var(--bg-card))`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--bg-card)';
        });
    });

    // --- Parallax orbs on scroll ---
    if (mainContent) {
        const orbs = document.querySelectorAll('.gradient-orb');
        mainContent.addEventListener('scroll', () => {
            const scrollY = mainContent.scrollTop;
            orbs.forEach((orb, i) => {
                const speed = 0.02 + i * 0.01;
                orb.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }

});
