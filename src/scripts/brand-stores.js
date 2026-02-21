/**
 * Brand stores carousel initialization using Splide
 */
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

export default function initBrandStores() {
  const carouselElement = document.getElementById('brand-stores-carousel');

  if (!carouselElement) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  new Splide(carouselElement, {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    gap: '1.5rem',
    pagination: true,
    arrows: true,
    speed: prefersReducedMotion ? 0 : 400,
    breakpoints: {
      768: {
        perPage: 2,
      },
      1024: {
        perPage: 3,
      },
    },
  }).mount();
}

