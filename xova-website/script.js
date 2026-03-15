document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. Hero Particles Generation ---
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        // Create 20 unique floating particles
        for(let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Randomize position, size, and animation delay
            const size = Math.random() * 8 + 4; // 4px to 12px
            const left = Math.random() * 100; // 0% to 100%
            const duration = Math.random() * 10 + 10; // 10s to 20s
            const delay = Math.random() * 15; // 0s to 15s
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `-${delay}s`; // Negative delay to start mid-animation
            
            particlesContainer.appendChild(particle);
        }
    }
    // --- 0. Scroll Progress Bar ---
    const scrollProgress = document.getElementById('scrollProgress');
    let isScrolling = false;

    if(scrollProgress) {
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    const scrollTop = window.scrollY;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrollPercent = (scrollTop / docHeight) * 100;
                    scrollProgress.style.width = scrollPercent + '%';
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });
    }

    // --- 1. Mobile Navigation Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 2. Sticky Navbar Effect ---
    const navbar = document.querySelector('.navbar');
    let isNavScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isNavScrolling) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 20) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                isNavScrolling = false;
            });
            isNavScrolling = true;
        }
    });

    // --- 3. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 4. Number Counters Animation ---
    const counters = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText.replace(/\D/g, ''); // Extract numbers
                    
                    // Add suffix logic
                    const text = counter.getAttribute('data-target');
                    const hasPlus = text.includes('+');
                    const hasX = text.includes('x');
                    const hasPercent = text.includes('%');

                    const speed = 200; // lower = faster
                    const inc = target / speed;

                    if (count < target) {
                        let currentVal = Math.ceil(count + inc);
                        
                        // Re-append suffixes for animation frame
                        let displayFormat = currentVal;
                        if(hasPlus) displayFormat += '+';
                        if(hasX) displayFormat += 'x';
                        if(hasPercent) displayFormat += '%';
                        
                        counter.innerText = displayFormat;
                        setTimeout(updateCount, 20);
                    } else {
                        // Ensure final value is exact
                        counter.innerText = text;
                    }
                };
                updateCount();
            });
        }
    }, { threshold: 0.5 });

    const trustSection = document.querySelector('.trust-stats');
    if (trustSection) {
        counterObserver.observe(trustSection);
    }

    // --- 5. Timeline Progress Animation ---
    const timelineSection = document.querySelector('.process');
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineSteps = document.querySelectorAll('.timeline-step');

    if (timelineSection && timelineProgress) {
        const timelineObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // Animate progress bar width
                timelineProgress.style.width = '100%';
                
                // Animate individual steps with delay
                timelineSteps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('active');
                    }, index * 200); // 200ms delay per step
                });
                
                timelineObserver.unobserve(timelineSection);
            }
        }, { threshold: 0.3 });

        timelineObserver.observe(timelineSection);
    }

    // --- 6. Testimonials Slider ---
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (track && slides.length > 0) {
        let currentIndex = 0;
        
        const updateSlider = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
                updateSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
                updateSlider();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });

        // Auto slide
        setInterval(() => {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            updateSlider();
        }, 5000);
    }

    // --- 7. Form Validation (Contact Page) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic validation
            let isValid = true;
            const requiredInputs = contactForm.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = 'var(--glass-border)';
                }
            });

            if (isValid) {
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
                
                // Simulate API call
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
                    btn.classList.add('btn-success');
                    contactForm.reset();
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.remove('btn-success');
                    }, 3000);
                }, 1500);
            }
        });
    }

    // --- 8. Advanced 3D Tilt for Cards ---
    const tiltCards = document.querySelectorAll('.glass-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.setProperty('--rot-x', rotateX + 'deg');
            card.style.setProperty('--rot-y', rotateY + 'deg');
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rot-x', '0deg');
            card.style.setProperty('--rot-y', '0deg');
            // reset transition so it animates back smoothly
            card.style.transition = 'transform 0.5s ease, box-shadow var(--transition-normal), border-color var(--transition-normal)'; 
            setTimeout(() => {
                card.style.transition = ''; // clear overriding transition after it resets
            }, 500);
        });
    });

    // --- 9. Magnetic Button Hover ---
    const magneticBtns = document.querySelectorAll('.btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Magnetic pull strength (lower is weaker)
            const strength = 0.3;
            
            btn.style.setProperty('--mag-x', (x * strength) + 'px');
            btn.style.setProperty('--mag-y', (y * strength) + 'px');
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.setProperty('--mag-x', '0px');
            btn.style.setProperty('--mag-y', '0px');
            btn.style.transition = 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)';
            setTimeout(() => {
                btn.style.transition = ''; 
            }, 300);
        });
    });

});
