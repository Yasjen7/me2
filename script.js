
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initProjectFilters();
    initTypingEffect();
    initCountUpAnimations();
    initSmoothScrolling();
    initActiveNavigation();
    
    console.log('🎨 Yasmeen Portfolio loaded successfully!');
});

function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Add background to navbar on scroll
        if (scrolled > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        animateOnScroll();
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .stat-item, .contact-method');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

function initAnimations() {
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .stat-item, .contact-method');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrors);
        });
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    if (!validateForm(form)) {
        return;
    }
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        await simulateEmailSend(data);
        
        showFormMessage('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon! 🎉');
        form.reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        showFormMessage('error', 'Oops! Something went wrong. Please try again or email me directly. 😅');
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

function simulateEmailSend(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Email data:', data);
            resolve();
        }, 2000);
    });
}

function validateForm(form) {
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const subject = form.querySelector('[name="subject"]');
    const message = form.querySelector('[name="message"]');
    
    let isValid = true;
    
    if (!name.value.trim()) {
        showFieldError(name, 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showFieldError(name, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    if (!email.value.trim()) {
        showFieldError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!subject.value.trim()) {
        showFieldError(subject, 'Subject is required');
        isValid = false;
    }
    
    if (!message.value.trim()) {
        showFieldError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showFieldError(message, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    switch (field.name) {
        case 'name':
            if (!value) {
                showFieldError(field, 'Name is required');
            } else if (value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters');
            } else {
                clearFieldError(field);
            }
            break;
            
        case 'email':
            if (!value) {
                showFieldError(field, 'Email is required');
            } else if (!isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
            } else {
                clearFieldError(field);
            }
            break;
            
        case 'subject':
            if (!value) {
                showFieldError(field, 'Subject is required');
            } else {
                clearFieldError(field);
            }
            break;
            
        case 'message':
            if (!value) {
                showFieldError(field, 'Message is required');
            } else if (value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters');
            } else {
                clearFieldError(field);
            }
            break;
    }
}

function clearErrors(e) {
    clearFieldError(e.target);
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showFormMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = `
        <div style="
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
            font-weight: 500;
            background: ${type === 'success' ? 'rgba(76, 205, 196, 0.1)' : 'rgba(255, 107, 107, 0.1)'};
            border: 1px solid ${type === 'success' ? '#4ecdc4' : '#ff6b6b'};
            color: ${type === 'success' ? '#4ecdc4' : '#ff6b6b'};
        ">
            ${message}
        </div>
    `;
    
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
    
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.classList.contains(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        const texts = ['Yasmeen', 'Artist', 'Developer', 'Creator', 'Mom', 'Innovator'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 100 : 150;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        type();
    }
}

function initCountUpAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                        }
                    };
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function addLoadingState(button, loadingText = 'Loading...') {
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${loadingText}`;
    button.disabled = true;
    
    return () => {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#4ecdc4' : '#ff6b6b'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

console.log(`
🎨 Welcome to Yasmeen's Portfolio!
==================================
Thanks for checking out my code! 
This portfolio showcases my skills in:
• Web Development
• Digital Art  
• Cybersecurity Education
• Community Building

Feel free to reach out - let's create something amazing together!
`);

window.YasmeenPortfolio = {
    showNotification,
    addLoadingState,
    debounce
};