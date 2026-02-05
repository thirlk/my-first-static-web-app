// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// Hero Carousel
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-carousel-dots .carousel-dot');

// Gallery
const gallerySlides = document.querySelectorAll('.gallery-slide');
const galleryDots = document.querySelectorAll('.gallery-dot');
const thumbnails = document.querySelectorAll('.thumbnail');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');
const galleryPlayPause = document.querySelector('.gallery-play-pause');

// ===== Variables =====
let heroCurrentSlide = 0;
let heroInterval;
let galleryCurrentSlide = 0;
let galleryInterval;
let galleryAutoPlay = true;

// ===== Navigation =====
// Toggle mobile menu
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = navToggle.querySelector('i');
  if (navMenu.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = navToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top button visibility
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Hero Carousel =====
function showHeroSlide(index) {
  heroSlides.forEach((slide, i) => {
    slide.classList.remove('active');
    heroDots[i].classList.remove('active');
  });
  heroSlides[index].classList.add('active');
  heroDots[index].classList.add('active');
}

function nextHeroSlide() {
  heroCurrentSlide = (heroCurrentSlide + 1) % heroSlides.length;
  showHeroSlide(heroCurrentSlide);
}

function startHeroCarousel() {
  heroInterval = setInterval(nextHeroSlide, 5000);
}

// Hero dot navigation
heroDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    heroCurrentSlide = index;
    showHeroSlide(heroCurrentSlide);
    clearInterval(heroInterval);
    startHeroCarousel();
  });
});

// Start hero carousel
startHeroCarousel();

// ===== Photo Gallery =====
function showGallerySlide(index) {
  gallerySlides.forEach((slide, i) => {
    slide.classList.remove('active');
    galleryDots[i].classList.remove('active');
    thumbnails[i].classList.remove('active');
  });
  gallerySlides[index].classList.add('active');
  galleryDots[index].classList.add('active');
  thumbnails[index].classList.add('active');
}

function nextGallerySlide() {
  galleryCurrentSlide = (galleryCurrentSlide + 1) % gallerySlides.length;
  showGallerySlide(galleryCurrentSlide);
}

function prevGallerySlide() {
  galleryCurrentSlide = (galleryCurrentSlide - 1 + gallerySlides.length) % gallerySlides.length;
  showGallerySlide(galleryCurrentSlide);
}

function startGalleryCarousel() {
  if (galleryAutoPlay) {
    galleryInterval = setInterval(nextGallerySlide, 4000);
  }
}

function stopGalleryCarousel() {
  clearInterval(galleryInterval);
}

// Gallery navigation
galleryNext.addEventListener('click', () => {
  nextGallerySlide();
  stopGalleryCarousel();
  startGalleryCarousel();
});

galleryPrev.addEventListener('click', () => {
  prevGallerySlide();
  stopGalleryCarousel();
  startGalleryCarousel();
});

// Gallery play/pause
galleryPlayPause.addEventListener('click', () => {
  galleryAutoPlay = !galleryAutoPlay;
  const icon = galleryPlayPause.querySelector('i');
  if (galleryAutoPlay) {
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
    startGalleryCarousel();
  } else {
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
    stopGalleryCarousel();
  }
});

// Gallery dots navigation
galleryDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    galleryCurrentSlide = index;
    showGallerySlide(galleryCurrentSlide);
    stopGalleryCarousel();
    startGalleryCarousel();
  });
});

// Thumbnail navigation
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    galleryCurrentSlide = index;
    showGallerySlide(galleryCurrentSlide);
    stopGalleryCarousel();
    startGalleryCarousel();
  });
});

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    nextGallerySlide();
    stopGalleryCarousel();
    startGalleryCarousel();
  } else if (e.key === 'ArrowLeft') {
    prevGallerySlide();
    stopGalleryCarousel();
    startGalleryCarousel();
  }
});

// Touch swipe support for gallery
let touchStartX = 0;
let touchEndX = 0;
const galleryMain = document.querySelector('.gallery-main');

galleryMain.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

galleryMain.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      nextGallerySlide();
    } else {
      // Swipe right - previous slide
      prevGallerySlide();
    }
    stopGalleryCarousel();
    startGalleryCarousel();
  }
}

// Start gallery carousel
startGalleryCarousel();

// ===== Contact Form Validation =====
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Basic validation
  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  // Success message (in a real app, you'd send this to a server)
  alert('Thank you for your inquiry! We will get back to you within 24 hours.');
  contactForm.reset();
});

// ===== Scroll Animations =====
function animateOnScroll() {
  const elements = document.querySelectorAll('.amenity-item, .rule-card, .attraction-card, .contact-item');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('scroll-animate', 'animated');
    }
  });
}

// Initial animation check
animateOnScroll();

// Animate on scroll
window.addEventListener('scroll', animateOnScroll);

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Active Navigation Link Highlight =====
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== Date Picker Minimum Date =====
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
checkinInput.setAttribute('min', today);
checkoutInput.setAttribute('min', today);

// Update checkout minimum when checkin changes
checkinInput.addEventListener('change', () => {
  const checkinDate = checkinInput.value;
  if (checkinDate) {
    const nextDay = new Date(checkinDate);
    nextDay.setDate(nextDay.getDate() + 1);
    checkoutInput.setAttribute('min', nextDay.toISOString().split('T')[0]);
    
    // Clear checkout if it's before new minimum
    if (checkoutInput.value && checkoutInput.value <= checkinDate) {
      checkoutInput.value = '';
    }
  }
});

// ===== Lazy Loading for Images =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== Console Welcome Message =====
console.log('%c🏖️ Ocean Breeze Guest', 'font-size: 24px; font-weight: bold; color: #0077b6;');
console.log('%cYour perfect beachfront getaway in Hikkaduwa, Sri Lanka', 'font-size: 14px; color: #48cae4;');
console.log('%c📞 +94 77 123 4567 | 📧 stay@oceanbreezeguest.lk', 'font-size: 12px; color: #6c757d;');
