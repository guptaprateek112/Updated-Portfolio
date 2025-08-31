/*=============== SHOW MENU (MOBILE) ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show');
        });
    }
}
showMenu('nav-toggle','nav-menu');

/*=============== REMOVE MENU MOBILE ON LINK CLICK ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected theme (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Get current theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-sun' : 'bx-moon'

// Apply previously chosen theme
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-sun' ? 'add' : 'remove'](iconTheme)
}

// Toggle theme on click
themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})
/* ADD THIS JAVASCRIPT TO YOUR EXISTING MAIN.JS FILE */

/*=============== ANIMATED BACKGROUND ELEMENTS ===============*/

// Initialize animated backgrounds when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimatedBackgrounds();
});

function initializeAnimatedBackgrounds() {
    // Only run on desktop and tablets for performance
    if (window.innerWidth > 768) {
        createFloatingShapes();
        initializeParticleSystem();
        setupInteractiveGradient();
        setupParallaxScrolling();
    }
}

/*=============== FLOATING GEOMETRIC SHAPES ===============*/
function createFloatingShapes() {
    // Create container if it doesn't exist
    let shapesContainer = document.querySelector('.floating-shapes');
    if (!shapesContainer) {
        shapesContainer = document.createElement('div');
        shapesContainer.className = 'floating-shapes';
        document.body.appendChild(shapesContainer);
    }

    const shapes = ['circle', 'square', 'triangle'];
    const numShapes = 12;

    for (let i = 0; i < numShapes; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        
        shape.className = `floating-shape ${shapeType}`;
        
        // Random size
        const size = Math.random() * 60 + 30;
        if (shapeType !== 'triangle') {
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
        } else {
            // Scale triangle proportionally
            const scale = size / 50;
            shape.style.transform = `scale(${scale})`;
        }
        
        // Random position
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay and duration
        shape.style.animationDelay = `${Math.random() * 8}s`;
        shape.style.animationDuration = `${6 + Math.random() * 6}s`;
        
        shapesContainer.appendChild(shape);
    }
}

/*=============== PARTICLE SYSTEM ===============*/
function initializeParticleSystem() {
    // Create container if it doesn't exist
    let particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);
    }

    // Create particles at intervals
    setInterval(() => {
        createParticle(particlesContainer);
    }, 800);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random horizontal position
    particle.style.left = `${Math.random() * 100}%`;
    
    // Random animation duration
    particle.style.animationDuration = `${4 + Math.random() * 4}s`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 2}s`;
    
    container.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 10000);
}

/*=============== INTERACTIVE GRADIENT ===============*/
function setupInteractiveGradient() {
    // Create gradient overlay if it doesn't exist
    let gradientOverlay = document.querySelector('.gradient-overlay');
    if (!gradientOverlay) {
        gradientOverlay = document.createElement('div');
        gradientOverlay.className = 'gradient-overlay';
        document.body.appendChild(gradientOverlay);
    }

    let mouseX = 50;
    let mouseY = 50;
    let targetX = 50;
    let targetY = 50;

    // Smooth mouse tracking
    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth) * 100;
        targetY = (e.clientY / window.innerHeight) * 100;
    });

    // Smooth animation loop
    function animateGradient() {
        mouseX += (targetX - mouseX) * 0.1;
        mouseY += (targetY - mouseY) * 0.1;

        const hueColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--hue-color').trim();

        gradientOverlay.style.background = `radial-gradient(circle at ${mouseX}% ${mouseY}%, 
            hsla(${hueColor}, 89%, 60%, 0.15) 0%, 
            hsla(${hueColor}, 89%, 60%, 0.08) 30%, 
            hsla(${hueColor}, 89%, 60%, 0.03) 60%, 
            transparent 80%)`;

        requestAnimationFrame(animateGradient);
    }

    animateGradient();
}

/*=============== PARALLAX SCROLLING ===============*/
function setupParallaxScrolling() {
    // Add parallax classes to existing elements
    const aboutImg = document.querySelector('.about__img img');
    const skillsImg = document.querySelector('.skills__img');
    const homeImg = document.querySelector('.home__img');

    if (aboutImg) aboutImg.classList.add('parallax-element', 'parallax-slow');
    if (skillsImg) skillsImg.classList.add('parallax-element', 'parallax-medium');
    if (homeImg) homeImg.classList.add('parallax-element', 'parallax-fast');

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const rateMedium = scrolled * -0.3;
        const rateFast = scrolled * -0.1;

        // Apply parallax effect to elements
        document.querySelectorAll('.parallax-slow').forEach(element => {
            element.style.transform = `translateY(${rate * 0.2}px)`;
        });

        document.querySelectorAll('.parallax-medium').forEach(element => {
            element.style.transform = `translateY(${rateMedium * 0.15}px)`;
        });

        document.querySelectorAll('.parallax-fast').forEach(element => {
            element.style.transform = `translateY(${rateFast * 0.1}px)`;
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

/*=============== PERFORMANCE OPTIMIZATION ===============*/
// Pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    const animatedElements = document.querySelectorAll(
        '.floating-shape, .particle, .parallax-element'
    );
    
    animatedElements.forEach(element => {
        if (document.hidden) {
            element.style.animationPlayState = 'paused';
        } else {
            element.style.animationPlayState = 'running';
        }
    });
});

// Clean up particles periodically to prevent memory leaks
setInterval(() => {
    const particles = document.querySelectorAll('.particle');
    if (particles.length > 50) { // Limit max particles
        for (let i = 0; i < 10; i++) {
            if (particles[i]) {
                particles[i].remove();
            }
        }
    }
}, 5000);

/*=============== RESPONSIVE HANDLING ===============*/
window.addEventListener('resize', function() {
    // Remove animations on mobile for performance
    if (window.innerWidth <= 768) {
        const shapesContainer = document.querySelector('.floating-shapes');
        const particlesContainer = document.querySelector('.particles-container');
        
        if (shapesContainer) shapesContainer.style.display = 'none';
        if (particlesContainer) particlesContainer.style.display = 'none';
    } else {
        const shapesContainer = document.querySelector('.floating-shapes');
        const particlesContainer = document.querySelector('.particles-container');
        
        if (shapesContainer) shapesContainer.style.display = 'block';
        if (particlesContainer) particlesContainer.style.display = 'block';
    }
});
/* ADD THIS JAVASCRIPT TO YOUR MAIN.JS FILE */

/*=============== CONTACT FORM FUNCTIONALITY ===============*/
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('contact-submit');
    const statusDiv = document.getElementById('contact-status');

    if (!contactForm) return;

    // Initialize EmailJS (you'll need to get your own keys)
    // Visit: https://www.emailjs.com/ to set up your account
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form
        if (!validateContactForm(data)) {
            return;
        }

        // Show loading state
        setLoadingState(true);

        // Send email using EmailJS
        emailjs.send(
            'YOUR_SERVICE_ID',    // Replace with your EmailJS service ID
            'YOUR_TEMPLATE_ID',   // Replace with your EmailJS template ID
            {
                to_name: 'Prateek Gupta',
                from_name: data.name,
                from_email: data.email,
                subject: data.subject,
                message: data.message,
                reply_to: data.email
            }
        )
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
            contactForm.reset();
            setLoadingState(false);
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            showStatus('error', 'Failed to send message. Please try again or contact me directly.');
            setLoadingState(false);
        });
    });

    // Alternative: Send to your email directly (without EmailJS)
    // Uncomment this section if you prefer to use a different service
    /*
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        if (!validateContactForm(data)) {
            return;
        }

        // Option 1: Create mailto link (opens email client)
        const mailtoLink = `mailto:your.email@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
            `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
        )}`;
        
        window.location.href = mailtoLink;
        showStatus('success', 'Opening your email client...');
        
        // Option 2: Use Formspree (requires account)
        // fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => {
        //     if (response.ok) {
        //         showStatus('success', 'Message sent successfully!');
        //         contactForm.reset();
        //     } else {
        //         throw new Error('Network response was not ok');
        //     }
        // })
        // .catch(error => {
        //     showStatus('error', 'Failed to send message. Please try again.');
        // });
    });
    */
}

function validateContactForm(data) {
    const statusDiv = document.getElementById('contact-status');
    
    // Check if all fields are filled
    if (!data.name || !data.email || !data.subject || !data.message) {
        showStatus('error', 'Please fill in all fields.');
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showStatus('error', 'Please enter a valid email address.');
        return false;
    }

    // Check message length
    if (data.message.length < 10) {
        showStatus('error', 'Please write a message with at least 10 characters.');
        return false;
    }

    return true;
}

function setLoadingState(loading) {
    const submitButton = document.getElementById('contact-submit');
    const buttonText = submitButton.querySelector('.button__text');
    
    if (loading) {
        submitButton.classList.add('loading');
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
}

function showStatus(type, message) {
    const statusDiv = document.getElementById('contact-status');
    
    statusDiv.className = `contact__status ${type}`;
    statusDiv.textContent = message;
    statusDiv.classList.add('show');
    
    // Hide status after 5 seconds
    setTimeout(() => {
        statusDiv.classList.remove('show');
    }, 5000);
}

/*=============== FORM INPUT ANIMATIONS ===============*/
// Add focus animations for better UX
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.contact__input input, .contact__input textarea');
    
    inputs.forEach(input => {
        // Add focus class for styling
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

/*=============== SMOOTH SCROLL TO CONTACT ===============*/
// Add smooth scrolling when contact link is clicked
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}
/*=============== TYPING ANIMATION (Optimized) ===============*/
document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.querySelector(".typing-text");
  const textArray = [
    "Hi, I'm Prateek Gupta",
    "Front-End Web Developer"
  ];

  let arrayIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80; // faster typing speed

  function type() {
    const currentText = textArray[arrayIndex];

    if (!isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 1000); // short pause before deleting
        return;
      }
    } else {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        arrayIndex = (arrayIndex + 1) % textArray.length;
      }
    }
    setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed);
  }

  type();
});
