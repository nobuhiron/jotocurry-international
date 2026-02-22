/**
 * Mobile menu functionality
 */
export default function initHeader() {
  const menuToggle = document.getElementById('menu-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileMenuClose = document.getElementById('mobile-menu-close-btn');
  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  if (!menuToggle || !mobileMenu) {
    return;
  }

  function isDesktopSize() {
    return window.matchMedia('(min-width: 1200px)').matches;
  }

  function openMobileMenu() {
    if (isDesktopSize()) return;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', menuToggle.dataset.closeLabel || 'Close menu');
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenu.removeAttribute('inert');
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.add('is-open');
    }
    document.body.style.overflow = 'hidden';

    const focusableElements = Array.from(mobileMenu.querySelectorAll(focusableSelector));
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }

  function closeMobileMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', menuToggle.dataset.openLabel || 'Open menu');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.setAttribute('inert', '');
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
  menuToggle.dataset.openLabel = menuToggle.getAttribute('aria-label') || 'Open menu';
  menuToggle.dataset.closeLabel = mobileMenuClose?.getAttribute('aria-label') || 'Close menu';

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', () => {
      closeMobileMenu();
      menuToggle.focus();
    });
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => {
      closeMobileMenu();
      menuToggle.focus();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!mobileMenu.classList.contains('is-open')) {
      return;
    }

    if (e.key === 'Escape') {
      closeMobileMenu();
      menuToggle.focus();
    }

    if (e.key === 'Tab') {
      const focusableElements = Array.from(mobileMenu.querySelectorAll(focusableSelector));
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (e.shiftKey && activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 100);
  });

  handleResize();
  closeMobileMenu();
}
