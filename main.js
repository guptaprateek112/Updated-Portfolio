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
/* ===== TIMELINE SCROLL ANIMATION ===== */
document.addEventListener("scroll", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const triggerBottom = window.innerHeight * 0.85;

  timelineItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerBottom) {
      item.classList.add("show");
    }
  });

  // Progress line animation
  const progressLine = document.querySelector(".timeline-progress");
  const timeline = document.querySelector(".timeline");
  const timelineRect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (timelineRect.top < windowHeight && timelineRect.bottom > 0) {
    const scrollProgress = Math.min(
      1,
      (windowHeight - timelineRect.top) / (timelineRect.height + windowHeight)
    );
    progressLine.style.height = `${scrollProgress * 100}%`;
  }
});
/* ===== Section Indicator Active Dot ===== */
const dots = document.querySelectorAll('.section-indicator .dot');

function activateDot() {
  let index = sections.length;

  while(--index && window.scrollY + 100 < sections[index].offsetTop) {}

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

window.addEventListener('scroll', activateDot);
/*=============== DARK MESH BACKGROUND SYSTEM ===============*/

// Initialize dark mesh background
document.addEventListener('DOMContentLoaded', function() {
    initializeDarkMesh();
});

function initializeDarkMesh() {
    // Only initialize if performance allows
    if (shouldEnableBackground()) {
        createDarkMeshBackground();
        setupMeshInteractions();
        setupScrollEffects();
        setupSectionDetection();
    }
}

/*=============== PERFORMANCE CHECK ===============*/
function shouldEnableBackground() {
    // Check device capabilities
    const hasGoodPerformance = window.devicePixelRatio <= 2 && 
                              window.innerWidth > 480 && 
                              !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check if user prefers dark theme
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    return hasGoodPerformance || isDarkTheme;
}

/*=============== CREATE MESH BACKGROUND ===============*/
function createDarkMeshBackground() {
    // Remove existing backgrounds
    const existingBg = document.querySelector('.dark-mesh-background');
    if (existingBg) existingBg.remove();
    
    // Create main container
    const meshContainer = document.createElement('div');
    meshContainer.className = 'dark-mesh-background';
    
    // Create primary mesh layer
    const meshPrimary = document.createElement('div');
    meshPrimary.className = 'dark-mesh-primary';
    
    // Create secondary mesh layer
    const meshSecondary = document.createElement('div');
    meshSecondary.className = 'dark-mesh-secondary';
    
    // Create tertiary mesh layer
    const meshTertiary = document.createElement('div');
    meshTertiary.className = 'dark-mesh-tertiary';
    
    // Create noise overlay
    const meshNoise = document.createElement('div');
    meshNoise.className = 'dark-mesh-noise';
    
    // Create interactive glow
    const meshGlow = document.createElement('div');
    meshGlow.className = 'dark-mesh-glow';
    
    // Append all layers
    meshContainer.appendChild(meshPrimary);
    meshContainer.appendChild(meshSecondary);
    meshContainer.appendChild(meshTertiary);
    meshContainer.appendChild(meshNoise);
    meshContainer.appendChild(meshGlow);
    
    // Add to body
    document.body.appendChild(meshContainer);
}

/*=============== MOUSE INTERACTIONS ===============*/
function setupMeshInteractions() {
    const meshGlow = document.querySelector('.dark-mesh-glow');
    const meshContainer = document.querySelector('.dark-mesh-background');
    
    if (!meshGlow || !meshContainer) return;
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        
        // Show glow
        meshGlow.style.opacity = '1';
        
        // Add subtle mesh distortion based on mouse position
        const xPercent = (e.clientX / window.innerWidth) * 100;
        const yPercent = (e.clientY / window.innerHeight) * 100;
        
        meshContainer.style.setProperty('--mouse-x', `${xPercent}%`);
        meshContainer.style.setProperty('--mouse-y', `${yPercent}%`);
    });
    
    // Hide glow when mouse leaves
    document.addEventListener('mouseleave', () => {
        meshGlow.style.opacity = '0';
    });
    
    // Smooth glow animation
    function animateMeshGlow() {
        mouseX += (targetX - mouseX) * 0.08;
        mouseY += (targetY - mouseY) * 0.08;
        
        meshGlow.style.left = `${mouseX}px`;
        meshGlow.style.top = `${mouseY}px`;
        
        requestAnimationFrame(animateMeshGlow);
    }
    
    animateMeshGlow();
}

/*=============== SCROLL EFFECTS ===============*/
function setupScrollEffects() {
    const meshContainer = document.querySelector('.dark-mesh-background');
    if (!meshContainer) return;
    
    let lastScrollTop = 0;
    let scrollTicking = false;
    
    function updateScrollEffects() {
        const scrollTop = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(scrollTop / maxScroll, 1);
        
        // Calculate dynamic values
        const hueRotation = scrollProgress * 360;
        const meshRotation = scrollTop * 0.05;
        const scale = 1 + (scrollProgress * 0.1);
        
        // Apply scroll-based transformations
        meshContainer.style.setProperty('--scroll-hue', `${hueRotation}deg`);
        meshContainer.style.setProperty('--scroll-rotation', `${meshRotation}deg`);
        meshContainer.style.setProperty('--scroll-scale', scale);
        
        // Add scrolling class for enhanced effects
        if (Math.abs(scrollTop - lastScrollTop) > 5) {
            meshContainer.classList.add('scrolling');
            
            // Remove scrolling class after a delay
            clearTimeout(meshContainer.scrollTimeout);
            meshContainer.scrollTimeout = setTimeout(() => {
                meshContainer.classList.remove('scrolling');
            }, 150);
        }
        
        lastScrollTop = scrollTop;
        scrollTicking = false;
    }
    
    // Throttled scroll handler
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(updateScrollEffects);
            scrollTicking = true;
        }
    });
}

/*=============== SECTION DETECTION ===============*/
function setupSectionDetection() {
    const sections = document.querySelectorAll('section[id]');
    const meshContainer = document.querySelector('.dark-mesh-background');
    
    if (!meshContainer || sections.length === 0) return;
    
    const observerOptions = {
        threshold: 0.4,
        rootMargin: '-100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove all section classes
                meshContainer.classList.remove(
                    'home-active', 
                    'about-active', 
                    'skills-active', 
                    'work-active', 
                    'contact-active'
                );
                
                // Add current section class
                meshContainer.classList.add(`${sectionId}-active`);
                
                // Trigger section-specific effects
                triggerSectionMeshEffects(sectionId);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/*=============== SECTION-SPECIFIC EFFECTS ===============*/
function triggerSectionMeshEffects(sectionId) {
    const meshPrimary = document.querySelector('.dark-mesh-primary');
    const meshSecondary = document.querySelector('.dark-mesh-secondary');
    
    if (!meshPrimary || !meshSecondary) return;
    
    switch(sectionId) {
        case 'home':
            // Energetic, welcoming mesh
            meshPrimary.style.animationDuration = '20s';
            meshSecondary.style.animationDuration = '30s';
            break;
            
        case 'about':
            // Calm, personal mesh
            meshPrimary.style.animationDuration = '35s';
            meshSecondary.style.animationDuration = '45s';
            break;
            
        case 'skills':
            // Technical, precise mesh
            meshPrimary.style.animationDuration = '15s';
            meshSecondary.style.animationDuration = '25s';
            break;
            
        case 'work':
            // Dynamic, creative mesh
            meshPrimary.style.animationDuration = '18s';
            meshSecondary.style.animationDuration = '28s';
            break;
            
        case 'contact':
            // Inviting, approachable mesh
            meshPrimary.style.animationDuration = '40s';
            meshSecondary.style.animationDuration = '50s';
            break;
    }
}

/*=============== THEME CHANGE DETECTION ===============*/
function setupThemeDetection() {
    const themeButton = document.getElementById('theme-button');
    const meshContainer = document.querySelector('.dark-mesh-background');
    
    if (!themeButton || !meshContainer) return;
    
    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const isDark = document.body.classList.contains('dark-theme');
                
                if (isDark && !meshContainer) {
                    // Create mesh background when switching to dark
                    createDarkMeshBackground();
                    setupMeshInteractions();
                    setupScrollEffects();
                    setupSectionDetection();
                } else if (!isDark && meshContainer) {
                    // Fade out mesh when switching to light
                    meshContainer.style.opacity = '0';
                    setTimeout(() => {
                        if (meshContainer.parentNode) {
                            meshContainer.remove();
                        }
                    }, 500);
                }
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
}

/*=============== PERFORMANCE MONITORING ===============*/
function setupPerformanceMonitoring() {
    const meshContainer = document.querySelector('.dark-mesh-background');
    if (!meshContainer) return;
    
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkPerformance() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 2000) { // Check every 2 seconds
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // Reduce complexity if performance is poor
            if (fps < 25) {
                meshContainer.classList.add('low-performance');
                
                // Reduce animation complexity
                const meshLayers = meshContainer.querySelectorAll('[class*="dark-mesh-"]');
                meshLayers.forEach((layer, index) => {
                    if (index > 1) { // Keep only first two layers
                        layer.style.display = 'none';
                    } else {
                        layer.style.animationDuration = '60s';
                        layer.style.filter = layer.style.filter.replace(/blur\(\d+px\)/, 'blur(40px)');
                    }
                });
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkPerformance);
    }
    
    checkPerformance();
}

/*=============== RESIZE HANDLING ===============*/
function setupResizeHandling() {
    function handleResize() {
        const meshContainer = document.querySelector('.dark-mesh-background');
        if (!meshContainer) return;
        
        // Adjust based on screen size
        if (window.innerWidth <= 768) {
            meshContainer.classList.add('mobile-optimized');
        } else {
            meshContainer.classList.remove('mobile-optimized');
        }
        
        // Recreate glow for new dimensions
        const meshGlow = meshContainer.querySelector('.dark-mesh-glow');
        if (meshGlow) {
            meshGlow.style.left = `${window.innerWidth / 2}px`;
            meshGlow.style.top = `${window.innerHeight / 2}px`;
        }
    }
    
    window.addEventListener('resize', debounce(handleResize, 300));
    handleResize(); // Initial call
}

/*=============== UTILITY FUNCTIONS ===============*/
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

/*=============== CLEANUP ===============*/
function cleanupMeshBackground() {
    const meshContainer = document.querySelector('.dark-mesh-background');
    if (meshContainer) {
        meshContainer.style.opacity = '0';
        setTimeout(() => {
            if (meshContainer.parentNode) {
                meshContainer.remove();
            }
        }, 500);
    }
}

// Cleanup on page unload
window.addEventListener('beforeunload', cleanupMeshBackground);

/*=============== INITIALIZE EVERYTHING ===============*/
document.addEventListener('DOMContentLoaded', () => {
    // Wait for DOM to be fully ready
    setTimeout(() => {
        initializeDarkMesh();
        setupThemeDetection();
        setupResizeHandling();
        
        // Only monitor performance in development or if explicitly needed
        if (window.innerWidth > 1200) {
            setupPerformanceMonitoring();
        }
    }, 100);
});
/*=============== ENHANCED BACKGROUND SYSTEM ===============*/

// Initialize the enhanced background when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedBackground();
});

function initializeEnhancedBackground() {
    // Only run on devices that can handle it
    if (window.innerWidth > 480 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        createEnhancedBackgroundContainer();
        setupMouseInteraction();
        setupParticleSystem();
        initializeScrollEffects();
    }
}

/*=============== CREATE BACKGROUND CONTAINER ===============*/
function createEnhancedBackgroundContainer() {
    // Remove existing background elements
    const existingBackground = document.querySelector('.enhanced-background');
    if (existingBackground) {
        existingBackground.remove();
    }

    // Create main container
    const backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'enhanced-background';
    
    // Create mesh gradient
    const meshGradient = document.createElement('div');
    meshGradient.className = 'mesh-gradient';
    
    // Create floating orbs container
    const orbsContainer = document.createElement('div');
    orbsContainer.className = 'floating-orbs';
    
    // Create individual orbs
    for (let i = 0; i < 4; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        orbsContainer.appendChild(orb);
    }
    
    // Create geometric grid
    const geometricGrid = document.createElement('div');
    geometricGrid.className = 'geometric-grid';
    
    // Create wave pattern
    const wavePattern = document.createElement('div');
    wavePattern.className = 'wave-pattern';
    
    // Create particle stream container
    const particleStream = document.createElement('div');
    particleStream.className = 'particle-stream';
    
    // Create mouse glow effect
    const mouseGlow = document.createElement('div');
    mouseGlow.className = 'mouse-glow';
    
    // Append all elements
    backgroundContainer.appendChild(meshGradient);
    backgroundContainer.appendChild(orbsContainer);
    backgroundContainer.appendChild(geometricGrid);
    backgroundContainer.appendChild(wavePattern);
    backgroundContainer.appendChild(particleStream);
    backgroundContainer.appendChild(mouseGlow);
    
    // Add to document
    document.body.appendChild(backgroundContainer);
}

/*=============== MOUSE INTERACTION ===============*/
function setupMouseInteraction() {
    const mouseGlow = document.querySelector('.mouse-glow');
    if (!mouseGlow) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        
        // Show glow on mouse move
        mouseGlow.style.opacity = '1';
    });
    
    // Hide glow when mouse leaves
    document.addEventListener('mouseleave', () => {
        mouseGlow.style.opacity = '0';
    });
    
    // Smooth animation loop
    function animateMouseGlow() {
        // Smooth interpolation
        mouseX += (targetX - mouseX) * 0.1;
        mouseY += (targetY - mouseY) * 0.1;
        
        mouseGlow.style.left = `${mouseX}px`;
        mouseGlow.style.top = `${mouseY}px`;
        
        requestAnimationFrame(animateMouseGlow);
    }
    
    animateMouseGlow();
}

/*=============== PARTICLE SYSTEM ===============*/
function setupParticleSystem() {
    const particleStream = document.querySelector('.particle-stream');
    if (!particleStream) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random horizontal position
        const startX = Math.random() * window.innerWidth;
        particle.style.left = `${startX}px`;
        
        // Random size
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        // Random animation duration
        particle.style.animationDuration = `${6 + Math.random() * 4}s`;
        
        particleStream.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 10000);
    }
    
    // Create particles at intervals
    const particleInterval = setInterval(() => {
        if (document.querySelector('.particle-stream') && window.innerWidth > 768) {
            createParticle();
        }
    }, 500);
    
    // Clean up old particles periodically
    setInterval(() => {
        const particles = document.querySelectorAll('.particle');
        if (particles.length > 30) {
            // Remove oldest particles
            for (let i = 0; i < 10; i++) {
                if (particles[i]) {
                    particles[i].remove();
                }
            }
        }
    }, 5000);
}

/*=============== SCROLL-BASED EFFECTS ===============*/
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const meshGradient = document.querySelector('.mesh-gradient');
    const geometricGrid = document.querySelector('.geometric-grid');
    const orbs = document.querySelectorAll('.orb');
    
    if (!meshGradient || !geometricGrid) return;
    
    function handleScrollEffects() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollProgress = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
        const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
        
        // Animate mesh gradient based on scroll
        const meshRotation = scrollProgress * 360;
        meshGradient.style.transform = `rotate(${meshRotation}deg) scale(${1 + scrollProgress * 0.2})`;
        
        // Animate grid based on scroll direction
        const gridTransform = scrollTop * 0.1 * scrollDirection;
        geometricGrid.style.transform = `translate(${gridTransform}px, ${gridTransform * 0.5}px)`;
        
        // Animate orbs based on scroll
        orbs.forEach((orb, index) => {
            const orbOffset = scrollTop * (0.05 + index * 0.02);
            const direction = index % 2 === 0 ? 1 : -1;
            orb.style.transform = `translate(${orbOffset * direction}px, ${orbOffset * 0.5}px)`;
        });
        
        lastScrollTop = scrollTop;
    }
    
    // Throttled scroll handler
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                handleScrollEffects();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });
}

/*=============== SECTION TRANSITION EFFECTS ===============*/
function setupSectionTransitions() {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.getAttribute('id');
            const backgroundContainer = document.querySelector('.enhanced-background');
            
            if (entry.isIntersecting && backgroundContainer) {
                // Add section-specific class for styling
                backgroundContainer.classList.remove('home-section', 'about-section', 'skills-section', 'work-section', 'contact-section');
                backgroundContainer.classList.add(`${sectionId}-section`);
                
                // Trigger section-specific animations
                triggerSectionAnimation(sectionId);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function triggerSectionAnimation(sectionId) {
    const orbs = document.querySelectorAll('.orb');
    const meshGradient = document.querySelector('.mesh-gradient');
    
    switch(sectionId) {
        case 'home':
            // Energetic animation for home
            orbs.forEach((orb, index) => {
                orb.style.animationDuration = `${15 + index * 2}s`;
            });
            break;
            
        case 'about':
            // Calm animation for about
            orbs.forEach((orb, index) => {
                orb.style.animationDuration = `${20 + index * 3}s`;
            });
            break;
            
        case 'skills':
            // Technical animation for skills
            if (meshGradient) {
                meshGradient.style.filter = 'blur(40px) hue-rotate(60deg)';
            }
            break;
            
        case 'work':
            // Dynamic animation for work
            orbs.forEach((orb, index) => {
                orb.style.animationDuration = `${12 + index * 2}s`;
            });
            break;
            
        case 'contact':
            // Inviting animation for contact
            if (meshGradient) {
                meshGradient.style.filter = 'blur(80px) hue-rotate(120deg)';
            }
            break;
    }
}

/*=============== PERFORMANCE MONITORING ===============*/
function monitorPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function measureFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // If FPS drops below 30, reduce animation complexity
            if (fps < 30) {
                const backgroundContainer = document.querySelector('.enhanced-background');
                if (backgroundContainer) {
                    backgroundContainer.classList.add('reduced-animation');
                }
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    measureFPS();
}

/*=============== RESPONSIVE HANDLING ===============*/
function setupResponsiveHandling() {
    function handleResize() {
        const backgroundContainer = document.querySelector('.enhanced-background');
        if (!backgroundContainer) return;
        
        if (window.innerWidth <= 768) {
            backgroundContainer.classList.add('mobile-optimized');
        } else {
            backgroundContainer.classList.remove('mobile-optimized');
        }
        
        // Recreate particles for new screen size
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => particle.remove());
    }
    
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Initial check
    handleResize();
}

/*=============== UTILITY FUNCTIONS ===============*/
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

/*=============== CLEANUP ON PAGE UNLOAD ===============*/
window.addEventListener('beforeunload', () => {
    // Clear intervals and timeouts
    const backgroundContainer = document.querySelector('.enhanced-background');
    if (backgroundContainer) {
        backgroundContainer.remove();
    }
});

/*=============== INITIALIZE EVERYTHING ===============*/
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        initializeEnhancedBackground();
        setupSectionTransitions();
        setupResponsiveHandling();
        
        // Only monitor performance in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            monitorPerformance();
        }
    }, 100);
});

// Add this CSS class for reduced animations
const reducedAnimationStyle = document.createElement('style');
reducedAnimationStyle.textContent = `
    .enhanced-background.reduced-animation .orb {
        animation-duration: 30s !important;
    }
    .enhanced-background.reduced-animation .mesh-gradient {
        animation-duration: 40s !important;
        filter: blur(40px) !important;
    }
    .enhanced-background.reduced-animation .geometric-grid {
        animation: none !important;
    }
    .enhanced-background.mobile-optimized .particle-stream {
        display: none !important;
    }
    .enhanced-background.mobile-optimized .orb {
        width: 40px !important;
        height: 40px !important;
    }
`;
document.head.appendChild(reducedAnimationStyle);
