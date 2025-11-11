// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
        
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile nav when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
        
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
                
    // Add active class to clicked button
    button.classList.add('active');
                
    const filterValue = button.getAttribute('data-filter');
                
    portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    });
});

// Skill Logos Animation
const skillLogos = document.querySelectorAll('.skill-logo');

function animateSkillLogos() {
    skillLogos.forEach((logo, index) => {
        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Animate skill logos when they come into view
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillLogos();
        }
    });
}, { threshold: 0.5 });

if (document.querySelector('.skills')) {
    observer.observe(document.querySelector('.skills'));
    
    // Initialize logos as hidden
    skillLogos.forEach(logo => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
        logo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
}

// Form Validation with Enhanced Feedback
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let isValid = true;

    // Simple validation
    if (name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
    } else {
        showSuccess(name);
    }

    if (email.value.trim() === '') {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    } else {
        showSuccess(email);
    }

    if (message.value.trim() === '') {
        showError(message, 'Message is required');
        isValid = false;
    } else {
        showSuccess(message);
    }

    if (isValid) {
        // Enhanced success feedback
        showSuccessMessage();
        contactForm.reset();
        // Clear all validation states
        clearValidationStates();
    }
});

function showSuccessMessage() {
    // Create success message element
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.5s ease;
        font-weight: 500;
    `;

    document.body.appendChild(successMsg);

    // Remove after 5 seconds
    setTimeout(() => {
        successMsg.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.parentNode.removeChild(successMsg);
            }
        }, 500);
    }, 5000);
}

function clearValidationStates() {
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
}
        
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
            
    // Remove any existing error message
    const error = formGroup.querySelector('.error-message');
    if (error) {
        error.remove();
    }
            
    // Add error message
    const errorElement = document.createElement('small');
    errorElement.className = 'error-message';
    errorElement.innerText = message;
    formGroup.appendChild(errorElement);
        }
        
function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
            
    // Remove any existing error message
    const error = formGroup.querySelector('.error-message');
    if (error) {
        error.remove();
    }
}
        
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

        // Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
    e.preventDefault();
                
    const targetId = this.getAttribute('href');
        if (targetId === '#') return;
                
    const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});