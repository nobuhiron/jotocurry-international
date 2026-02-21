/**
 * Franchise voices carousel initialization using Splide
 */
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

export default function initFranchiseVoices() {
  const carouselElement = document.getElementById('franchise-voices-carousel');

  if (!carouselElement) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  new Splide(carouselElement, {
    type: 'slide',
    perPage: 3,
    perMove: 1,
    gap: '1.5rem',
    pagination: true,
    arrows: true,
    speed: prefersReducedMotion ? 0 : 400,
    mediaQuery: 'max',
    breakpoints: {
      1024: {
        perPage: 1,
      },
    },
  }).mount();
}

