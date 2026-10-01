// Initialize Icons and Theme on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  lucide.createIcons();
});

// ==========================================
// Theme Management (Dark / Light Mode)
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function updateThemeIcon(isDark) {
  themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
  lucide.createIcons();
}

function initTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateThemeIcon(currentTheme === 'dark');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', targetTheme);
  localStorage.setItem('theme', targetTheme);
  updateThemeIcon(targetTheme === 'dark');
});

// Respect system preference changes if no manual toggle exists
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    const targetTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', targetTheme);
    updateThemeIcon(targetTheme === 'dark');
  }
});

// ==========================================
// Mobile Navigation Drawer
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const menuIcon = document.getElementById('menuIcon');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const isOpen = navLinks.classList.contains('active');
  menuIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
  lucide.createIcons();
});

// Close Mobile Drawer on Link Click
document.querySelectorAll('.nav-link, .btn-nav').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuIcon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
  });
});

// ==========================================
// Header Elevation on Scroll
// ==========================================
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    header.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// ==========================================
// Smooth Scrolling with Sticky Header Offset
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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
    }
  });
});
