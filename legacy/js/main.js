/**
 * ProjectM Agency - Main Interactive Scripts
 * Pure Vanilla JavaScript (ES6+) - Fast, Lightweight, Shared Hosting Compatible
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDynamicHeroText();
  initServicesTabs();
  initFaqAccordion();
  initStatsCounter();
  initBackToTop();
  initSmoothScroll();
});

/* ---------------------------------------------------------
   1. Navbar & Mobile Drawer
--------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-links .nav-link');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Open drawer
  if (hamburgerBtn && mobileDrawer && mobileOverlay) {
    hamburgerBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    });

    const closeDrawer = () => {
      mobileDrawer.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    };

    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    mobileOverlay.addEventListener('click', closeDrawer);

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Escape key closes drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
        closeDrawer();
      }
    });
  }

  // Active link spy using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(section => observer.observe(section));
  }
}

/* ---------------------------------------------------------
   2. Dynamic Hero Text Rotator
   Concise phrases that stay cleanly inline without breaking
--------------------------------------------------------- */
function initDynamicHeroText() {
  const targetElement = document.getElementById('dynamicText');
  if (!targetElement) return;

  const phrases = [
    'Modern Websites',
    'Digital Marketing',
    'Targeted SEO',
    'Paid Ads & PPC',
    'Custom Web Apps'
  ];

  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let isDeleting = true;
  let typingSpeed = 2200; // Hold initial phrase before cycling

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      const nextText = currentPhrase.substring(0, charIndex - 1);
      targetElement.textContent = nextText.length > 0 ? nextText : '\u00A0';
      charIndex--;
      typingSpeed = 45;
    } else {
      targetElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2200; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 350; // Pause before typing next phrase
    }

    setTimeout(type, typingSpeed);
  }

  // Start rotation after initial pause
  setTimeout(type, typingSpeed);
}

/* ---------------------------------------------------------
   3. Services Tab Filter
--------------------------------------------------------- */
function initServicesTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}



/* ---------------------------------------------------------
   5. FAQ Accordion
--------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherAnswer = other.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
        const otherBtn = other.querySelector('.faq-question-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---------------------------------------------------------
   6. Stats Counter Animation
--------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-counter-number[data-target]');
  if (statNumbers.length === 0) return;

  let hasAnimated = false;

  const runCounter = () => {
    statNumbers.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const isDecimal = target % 1 !== 0;
      const duration = 1800; // ms
      const steps = 50;
      const stepTime = duration / steps;
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        const formatted = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
        counter.textContent = `${prefix}${formatted}${suffix}`;
      }, stepTime);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        runCounter();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('statsSection');
  if (statsSection) observer.observe(statsSection);
}

/* ---------------------------------------------------------
   7. Back to Top Button
--------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------
   8. Smooth Scrolling for Internal Links
--------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
