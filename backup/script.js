// ========================================
// MAGMET - Interactive JavaScript
// ========================================

// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Burger Animation
    burger.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(255, 215, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Add animation class based on element type
            if (entry.target.classList.contains('service-card')) {
                entry.target.classList.add('slide-up');
            }
            if (entry.target.classList.contains('contact-item')) {
                entry.target.classList.add('slide-left');
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .contact-item, .about-text, .about-image').forEach(el => {
    observer.observe(el);
});

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .fade-in {
        animation: fadeIn 0.8s ease forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .slide-up {
        animation: slideUp 0.6s ease forwards;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .slide-left {
        animation: slideLeft 0.6s ease forwards;
    }
    
    @keyframes slideLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    
    // Simple validation
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff4444';
        } else {
            input.style.borderColor = 'rgba(255, 215, 0, 0.2)';
        }
    });
    
    if (isValid) {
        // Show success message (in production, you'd send to server)
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Wiadomość wysłana!';
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
        
        console.log('Form submitted successfully!');
    }
});

// Parallax effect for light beams
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const beams = document.querySelectorAll('.light-beam');
    
    beams.forEach((beam, index) => {
        const speed = 0.1 + (index * 0.05);
        beam.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        serviceCards.forEach(c => {
            if (c !== card) {
                c.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        serviceCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// Typing effect for hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle.textContent;
let charIndex = 0;

// Uncomment to enable typing effect
/*
function typeWriter() {
    if (charIndex < originalText.length) {
        heroSubtitle.textContent = originalText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    heroSubtitle.textContent = '';
    setTimeout(typeWriter, 500);
});
*/

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
                navLink.style.color = 'var(--gold-primary)';
            } else {
                navLink.classList.remove('active');
                navLink.style.color = '';
            }
        }
    });
});

// Cursor trail effect (subtle gold particles)
const cursorTrail = [];
const trailLength = 20;

for (let i = 0; i < trailLength; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: ${10 - i/2}px;
        height: ${10 - i/2}px;
        background: radial-gradient(circle, rgba(255, 215, 0, ${0.5 - i/40}) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(trail);
    cursorTrail.push(trail);
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateTrail() {
    let x = mouseX;
    let y = mouseY;
    
    cursorTrail.forEach((trail, index) => {
        const nextTrail = cursorTrail[index + 1] || cursorTrail[0];
        
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        
        x += (nextTrail.offsetLeft - x) * 0.3;
        y += (nextTrail.offsetTop - y) * 0.3;
    });
    
    requestAnimationFrame(animateTrail);
}

// Enable cursor trail on desktop only
if (window.innerWidth > 768) {
    animateTrail();
}

// Counter animation for stats (if you add stats section later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Console message for developers
console.log('%c MAGMET ', 'background: linear-gradient(135deg, #FFE55C 0%, #FFD700 50%, #B8860B 100%); color: #0a0a0a; font-size: 30px; font-weight: bold; padding: 10px 20px;');
console.log('%c Premium Design Studio ', 'color: #FFD700; font-size: 14px;');

// ========================================
// Portfolio Filter
// ========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========================================
// FAQ Accordion
// ========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ========================================
// Countdown Timer
// ========================================
function initCountdown() {
    // Set deadline to end of current week (Sunday 23:59:59)
    const now = new Date();
    const deadline = new Date();
    deadline.setDate(now.getDate() + (7 - now.getDay()) % 7 + 7);
    deadline.setHours(23, 59, 59, 999);
    
    function updateCountdown() {
        const currentTime = new Date();
        const diff = deadline - currentTime;
        
        if (diff <= 0) {
            // Reset deadline if expired
            deadline.setDate(deadline.getDate() + 7);
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize countdown when DOM is loaded
if (document.querySelector('.limited-offer')) {
    initCountdown();
}

// ========================================
// Counter Animation for Stats
// ========================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.textContent === '0') {
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ========================================
// Smooth Scroll with Offset for Fixed Header
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('active');
            }
        }
    });
});

// ========================================
// Add Animation on Scroll for New Sections
// ========================================
const animateOnScroll = document.querySelectorAll('.portfolio-item, .process-step, .pricing-card, .testimonial-card, .faq-item');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});

// ========================================
// Sticky Mobile CTA Button (optional)
// ========================================
function createStickyCTA() {
    const stickyCTA = document.createElement('a');
    stickyCTA.href = '#pricing';
    stickyCTA.className = 'sticky-cta';
    stickyCTA.innerHTML = '<i class="fas fa-shopping-cart"></i> Zamów Teraz';
    
    // Add styles for sticky CTA
    const style = document.createElement('style');
    style.textContent = `
        .sticky-cta {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999;
            background: linear-gradient(135deg, #FFE55C 0%, #FFD700 50%, #B8860B 100%);
            color: #0a0a0a;
            padding: 15px 25px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 14px;
            text-decoration: none;
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
            transition: all 0.3s ease;
            display: none;
        }
        
        .sticky-cta:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(255, 215, 0, 0.6);
        }
        
        .sticky-cta i {
            margin-right: 8px;
        }
        
        @media (max-width: 768px) {
            .sticky-cta {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(stickyCTA);
}

// Uncomment to enable sticky CTA on mobile
// createStickyCTA();
