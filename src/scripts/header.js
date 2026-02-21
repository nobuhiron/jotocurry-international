/**
 * Mobile menu functionality
 */
export default function initHeader() {
  const menuToggle = document.getElementById('menu-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileMenuClose = document.getElementById('mobile-menu-close-btn');

  if (!menuToggle || !mobileMenu) {
    return;
  }

  function isDesktopSize() {
    return window.matchMedia('(min-width: 1200px)').matches;
  }

  function openMobileMenu() {
    if (isDesktopSize()) return;
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('is-open');
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.add('is-open');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.remove('is-open');
    }
    document.body.style.overflow = '';
  }

  function toggleMobileMenu() {
    if (isDesktopSize()) return;
    if (mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function handleResize() {
    if (isDesktopSize() && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  }

  menuToggle.addEventListener('click', toggleMobileMenu);

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
      menuToggle.focus();
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 100);
  });

  handleResize();
}
