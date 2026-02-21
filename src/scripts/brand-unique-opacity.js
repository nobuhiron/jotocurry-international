/**
 * Brand Unique section opacity animation
 * スクロール位置に応じて、ビューポート上部に最も近いテキストブロックのみopacity: 1、他はopacity: 0.6に設定
 */
export default function initBrandUniqueOpacity() {
  const textBlocks = Array.from(document.querySelectorAll('.p-brand-unique__text-block'));
  const imageElements = Array.from(
    document.querySelectorAll('.p-brand-unique__image-column .p-brand-unique__image')
  );
  const HYSTERESIS_PX = 56;
  let currentActiveIndex = -1;

  if (textBlocks.length === 0) {
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    textBlocks.forEach((block) => block.classList.add('is-active'));
    if (imageElements.length > 0) {
      imageElements[0].classList.add('is-active');
    }
    return;
  }

  // ブレークポイント（1024px）をチェック
  const isDesktop = () => window.innerWidth >= 1024;

  // ビューポート上部からの距離を計算して、最も近い要素を検出
  function setActiveIndex(nextIndex) {
    if (nextIndex === currentActiveIndex) {
      return;
    }

    if (currentActiveIndex >= 0) {
      textBlocks[currentActiveIndex]?.classList.remove('is-active');
      imageElements[currentActiveIndex]?.classList.remove('is-active');
    }

    if (nextIndex >= 0) {
      textBlocks[nextIndex]?.classList.add('is-active');
      imageElements[nextIndex]?.classList.add('is-active');
    }

    currentActiveIndex = nextIndex;
  }

  function getDistanceFromAnchor(index, anchorY) {
    const rect = textBlocks[index]?.getBoundingClientRect();
    if (!rect) return Number.POSITIVE_INFINITY;
    return Math.abs(rect.top - anchorY);
  }

  function findClosestIndex(anchorY) {
    let closestIndex = -1;
    let closestDistance = Number.POSITIVE_INFINITY;

    textBlocks.forEach((block, index) => {
      const rect = block.getBoundingClientRect();
      const isNearViewport = rect.bottom >= -120 && rect.top <= window.innerHeight + 120;
      const baseDistance = Math.abs(rect.top - anchorY);
      const weightedDistance = isNearViewport ? baseDistance : baseDistance + 200;

      if (weightedDistance < closestDistance) {
        closestDistance = weightedDistance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }

  function updateActiveBlock() {
    if (!isDesktop()) {
      setActiveIndex(-1);
      return;
    }

    const anchorY = window.innerHeight * 0.28;
    const candidateIndex = findClosestIndex(anchorY);

    if (candidateIndex < 0) {
      return;
    }

    if (currentActiveIndex < 0) {
      setActiveIndex(candidateIndex);
      return;
    }

    if (candidateIndex === currentActiveIndex) {
      return;
    }

    const currentDistance = getDistanceFromAnchor(currentActiveIndex, anchorY);
    const candidateDistance = getDistanceFromAnchor(candidateIndex, anchorY);
    const currentRect = textBlocks[currentActiveIndex]?.getBoundingClientRect();
    const currentOutOfRange =
      !currentRect || currentRect.bottom < -120 || currentRect.top > window.innerHeight + 120;

    if (currentOutOfRange || candidateDistance + HYSTERESIS_PX < currentDistance) {
      setActiveIndex(candidateIndex);
    }
  }

  // スクロールイベントとリサイズイベントを監視
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveBlock();
        ticking = false;
      });
      ticking = true;
    }
  }

  // 初期化
  updateActiveBlock();

  // イベントリスナーを追加
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', () => {
    updateActiveBlock();
  });
}
