/**
 * Bharath K - Portfolio Interactivity Script
 * Handles: Scroll reveals, Typing effect, Navbar stickiness/active links, Mobile menu, Form submissions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. Navigation & Mobile Menu Menu
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');

    // Sticky Navbar on Scroll
    const handleScrollNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScrollNavbar);
    handleScrollNavbar(); // Initial check on load

    // Toggle Mobile Navigation Overlay
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('mobile-active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close Menu on Nav Link Click (for mobile view)
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            menuToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    /* ==========================================================================
       2. Typing Effect (Hero Section)
       ========================================================================== */
    const typedTextSpan = document.getElementById('typed-role');
    const roles = [
        "Frontend Developer", 
        "ECE Student", 
        "Embedded Systems Enthusiast", 
        "UI/UX Designer"
    ];
    const typingSpeed = 100;
    const erasingSpeed = 60;
    const newRoleDelay = 2000; // Delay between roles
    let roleIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < roles[roleIndex].length) {
            typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newRoleDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            roleIndex++;
            if (roleIndex >= roles.length) roleIndex = 0;
            setTimeout(type, typingSpeed + 500);
        }
    }

    // Start the typing animation
    if (roles.length) setTimeout(type, 1000);

    /* ==========================================================================
       3. Scroll Reveal & Skill Progress Activation (Intersection Observer)
       ========================================================================== */
    // Reveal content containers
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // If it contains a skill bar, trigger the skill progress filling
                const skillProgressBars = entry.target.querySelectorAll('.skill-progress');
                if (skillProgressBars.length > 0) {
                    skillProgressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = targetWidth;
                    });
                }
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       4. Active Nav Link on Scroll Highlight
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNavOnScroll = () => {
        const scrollPosition = window.scrollY + 120; // Offset for navbar height

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const currentActiveLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (currentActiveLink) {
                    links.forEach(lnk => lnk.classList.remove('active'));
                    currentActiveLink.classList.add('active');
                }
            }
        });
    };
    window.addEventListener('scroll', highlightNavOnScroll);

    /* ==========================================================================
       5. Toast Notification System
       ========================================================================== */
    const toast = document.getElementById('toast-notify');
    
    const showToast = (message, type = 'success') => {
        toast.textContent = message;
        toast.className = `toast-notification show ${type}`;
        
        // Auto-dismiss after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    };

    /* ==========================================================================
       6. Mock Resume Download
       ========================================================================== */
    const resumeBtn = document.getElementById('download-resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast("Downloading Resume... (Simulated Link Success)", "success");
            
            // Simulating trigger of download
            setTimeout(() => {
                const dummyLink = document.createElement('a');
                dummyLink.href = 'data:application/pdf;base64,JVBERi0xLjQKJ...'; // Mock PDF content
                dummyLink.download = 'Bharath_K_Resume.pdf';
                // Triggering a simulated file fetch locally, in real deployment it points to public asset
                console.log("Mock PDF download initiated for Bharath K");
            }, 1000);
        });
    }

    /* ==========================================================================
       7. Interactive Contact Form Submission (Simulated)
       ========================================================================== */
    const contactForm = document.getElementById('portfolio-contact-form');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation
            const nameInput = document.getElementById('name').value.trim();
            const emailInput = document.getElementById('email').value.trim();
            const subjectInput = document.getElementById('subject').value.trim();
            const messageInput = document.getElementById('message').value.trim();

            if (!nameInput || !emailInput || !subjectInput || !messageInput) {
                showToast("Please fill in all required fields.", "error");
                return;
            }

            // Enter loading state
            formSubmitBtn.classList.add('loading');
            const submitBtnSpan = formSubmitBtn.querySelector('span');
            const submitBtnIcon = formSubmitBtn.querySelector('i');
            
            const originalBtnText = submitBtnSpan.textContent;
            submitBtnSpan.textContent = 'Sending...';
            submitBtnIcon.className = 'fa-solid fa-spinner fa-spin';

            // Simulate form submission (e.g., mail server network roundtrip)
            setTimeout(() => {
                // Exit loading state
                formSubmitBtn.classList.remove('loading');
                submitBtnSpan.textContent = originalBtnText;
                submitBtnIcon.className = 'fa-solid fa-paper-plane';

                // Display success message
                formStatus.textContent = "Thank you! Your message has been sent successfully.";
                formStatus.className = "form-status-message success";
                showToast("Message Sent Successfully! Bharath will review it.", "success");

                // Reset form fields
                contactForm.reset();

                // Clear success message text after 5 seconds
                setTimeout(() => {
                    formStatus.className = "form-status-message";
                    formStatus.textContent = "";
                }, 5000);

            }, 1800);
        });
    }
});
