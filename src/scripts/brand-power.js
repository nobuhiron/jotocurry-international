/**
 * Brand power carousel initialization using Splide
 * Shows approximately 4.5 slides on desktop and 3.5 on mobile
 * Continuous smooth scrolling with interval: 0
 */
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

export default function initBrandPower() {
  const carouselElement = document.getElementById('brand-power-carousel');

  if (!carouselElement) {
    return;
  }

  const splide = new Splide(carouselElement, {
    type: 'loop',
    perPage: 4.5,
    perMove: 1,
    gap: '1rem',
    pagination: false,
    arrows: false,
    autoplay: false,
    speed: 10000,
    easing: 'linear',
    pauseOnHover: false,
    breakpoints: {
      768: {
        perPage: 2.5,
        gap: '0.75rem',
      },
    },
  });

  splide.mount();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // 連続スクロールを実装
  let scrollPosition = 0;
  let paused = false;
  const scrollSpeed = 0.5; // ピクセル/フレーム

  // フォーカスが当たったら一時停止（WCAG 2.2.2）
  carouselElement.addEventListener('focusin', () => { paused = true; });
  carouselElement.addEventListener('focusout', () => { paused = false; });
  carouselElement.addEventListener('mouseenter', () => { paused = true; });
  carouselElement.addEventListener('mouseleave', () => { paused = false; });

  function continuousScroll() {
    if (!paused) {
      const track = carouselElement.querySelector('.splide__track');
      const list = carouselElement.querySelector('.splide__list');

      if (track && list) {
        scrollPosition += scrollSpeed;
        const listWidth = list.scrollWidth;
        const trackWidth = track.clientWidth;

        // ループ処理
        if (scrollPosition >= listWidth - trackWidth) {
          scrollPosition = 0;
        }

        list.style.transform = `translateX(-${scrollPosition}px)`;
      }
    }

    requestAnimationFrame(continuousScroll);
  }

  // アニメーション開始
  requestAnimationFrame(continuousScroll);
}
