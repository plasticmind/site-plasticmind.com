/**
 * Ceci n'est pas une page.
 *
 * Makes the painted browser window on the 404 page behave like a macOS
 * window: drag the title bar to move it, drag a corner to resize it, and use
 * the close, minimize, and zoom lights. Double-clicking the title bar zooms.
 * Keyboard: focus the title bar, then use the arrow keys to move the window,
 * or Shift and the arrow keys to resize it.
 *
 * Geometry is stored in stage units (1 = 1% of the painting's width), the
 * same units the stylesheet uses, so the window scales with the painting.
 */
(() => {
  const root = document.querySelector('[data-treachery]');
  if (!root) return;

  const frame = root.querySelector('.c-treachery__frame');
  const stage = root.querySelector('.c-treachery__stage');
  const win = root.querySelector('[data-window]');
  const mover = win.querySelector('[data-move]');
  const zoomButton = win.querySelector('[data-action="zoom"]');
  const dock = root.querySelector('[data-action="restore"]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Measured from the original painting.
  const HOME = { x: 32.03, y: 5.77, w: 36.76, h: 30.93 };
  const MIN = { w: 15, h: 9 };
  const CHROME_H = 4.23; // title bar height
  const REACH = 5; // how much of the window must stay inside the painting
  const ZOOM_INSET = 2;
  const DOCK = { x: 50, y: 52.1 }; // center of the dock tile
  const KEY_STEP = 1.5;

  let geo = { ...HOME };
  let unzoomed = null;
  let hiddenBy = null;

  const unit = () => stage.getBoundingClientRect().width / 100;

  // The visible painting, in stage units, measured from the stage's corner.
  // The top stops at the stage so the window stays clear of the site header.
  function bounds() {
    const u = unit();
    const s = stage.getBoundingClientRect();
    const f = frame.getBoundingClientRect();
    return {
      left: (f.left - s.left) / u,
      right: (f.right - s.left) / u,
      top: 0,
      bottom: (f.bottom - s.top) / u,
    };
  }

  // Keeps the window a sensible size and its title bar within reach.
  function fit(g) {
    const b = bounds();
    const w = Math.min(Math.max(g.w, MIN.w), b.right - b.left);
    const h = Math.min(Math.max(g.h, MIN.h), b.bottom - b.top);
    return {
      w,
      h,
      x: Math.min(Math.max(g.x, b.left - w + REACH), b.right - REACH),
      y: Math.min(Math.max(g.y, b.top), b.bottom - CHROME_H),
    };
  }

  function render() {
    for (const key of ['x', 'y', 'w', 'h']) {
      win.style.setProperty(`--${key}`, geo[key].toFixed(2));
    }
  }

  // Zoom fills the composition, or the visible part of it on narrow screens.
  function zoomedGeo() {
    const b = bounds();
    const left = Math.max(b.left, 0) + ZOOM_INSET;
    const right = Math.min(b.right, 100) - ZOOM_INSET;
    return fit({ x: left, y: ZOOM_INSET, w: right - left, h: b.bottom - ZOOM_INSET * 2 });
  }

  const same = (a, b) => ['x', 'y', 'w', 'h'].every((k) => Math.abs(a[k] - b[k]) < 0.5);

  function syncZoom() {
    zoomButton.setAttribute('aria-pressed', String(same(geo, zoomedGeo())));
  }

  function animateTo(next) {
    if (!reducedMotion.matches) {
      win.classList.add('is-animating');
      clearTimeout(animateTo.timer);
      animateTo.timer = setTimeout(() => win.classList.remove('is-animating'), 320);
    }
    geo = next;
    render();
    syncZoom();
  }

  // Like the green button on a Mac: zoom to fill the painting, then back.
  function toggleZoom() {
    const zoomed = zoomedGeo();
    if (unzoomed && same(geo, zoomed)) {
      const back = unzoomed;
      unzoomed = null;
      animateTo(fit(back));
    } else {
      unzoomed = { ...geo };
      animateTo(zoomed);
    }
  }

  // Follows a pointer from a handle and applies update(startGeo, dx, dy).
  function track(event, update) {
    if (event.button !== 0) return;
    event.preventDefault();
    const handle = event.currentTarget;
    const start = { x: event.clientX, y: event.clientY, geo: { ...geo }, u: unit() };
    handle.setPointerCapture(event.pointerId);
    win.classList.remove('is-animating');
    win.classList.add('is-dragging');

    const onMove = (e) => {
      const dx = (e.clientX - start.x) / start.u;
      const dy = (e.clientY - start.y) / start.u;
      geo = fit(update(start.geo, dx, dy));
      render();
    };
    const onEnd = () => {
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onEnd);
      handle.removeEventListener('pointercancel', onEnd);
      win.classList.remove('is-dragging');
      syncZoom();
    };
    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onEnd);
    handle.addEventListener('pointercancel', onEnd);
  }

  mover.addEventListener('pointerdown', (event) => {
    track(event, (g, dx, dy) => ({ ...g, x: g.x + dx, y: g.y + dy }));
  });

  mover.addEventListener('dblclick', toggleZoom);

  mover.addEventListener('keydown', (event) => {
    const delta = {
      ArrowLeft: [-KEY_STEP, 0],
      ArrowRight: [KEY_STEP, 0],
      ArrowUp: [0, -KEY_STEP],
      ArrowDown: [0, KEY_STEP],
    }[event.key];
    if (!delta) return;
    event.preventDefault();
    const [dx, dy] = delta;
    geo = fit(
      event.shiftKey
        ? { ...geo, w: geo.w + dx, h: geo.h + dy }
        : { ...geo, x: geo.x + dx, y: geo.y + dy }
    );
    render();
    syncZoom();
  });

  for (const grip of win.querySelectorAll('[data-resize]')) {
    const edges = grip.dataset.resize;
    grip.addEventListener('pointerdown', (event) => {
      track(event, (g, dx, dy) => {
        const next = { ...g };
        if (edges.includes('e')) next.w = g.w + dx;
        if (edges.includes('s')) next.h = g.h + dy;
        if (edges.includes('w')) {
          const right = g.x + g.w;
          next.x = Math.min(g.x + dx, right - MIN.w);
          next.w = right - next.x;
        }
        if (edges.includes('n')) {
          const bottom = g.y + g.h;
          next.y = Math.min(Math.max(g.y + dy, 0), bottom - MIN.h);
          next.h = bottom - next.y;
        }
        return next;
      });
    });
  }

  // Close shrinks the window in place; minimize sends it into the dock.
  const effects = {
    close: { frames: [{ scale: '1', opacity: 1 }, { scale: '0.92', opacity: 0 }], duration: 180 },
    minimize: { frames: [{ scale: '1', opacity: 1 }, { scale: '0.06', opacity: 0.2 }], duration: 380 },
  };

  function originFor(kind) {
    if (kind !== 'minimize') return '50% 50%';
    const u = unit();
    return `${(DOCK.x - geo.x) * u}px ${(DOCK.y - geo.y) * u}px`;
  }

  const canAnimate = () => !reducedMotion.matches && typeof win.animate === 'function';

  function hide(kind) {
    hiddenBy = kind;
    const finish = () => {
      win.hidden = true;
      dock.hidden = false;
      dock.focus({ preventScroll: true });
    };
    if (!canAnimate()) return finish();
    win.style.transformOrigin = originFor(kind);
    const { frames, duration } = effects[kind];
    win
      .animate(frames, { duration, easing: kind === 'minimize' ? 'cubic-bezier(0.55, 0, 0.8, 0.4)' : 'ease-in' })
      .finished.then(finish, finish);
  }

  function show() {
    win.hidden = false;
    dock.hidden = true;
    mover.focus({ preventScroll: true });
    if (!canAnimate() || !hiddenBy) return;
    win.style.transformOrigin = originFor(hiddenBy);
    const { frames, duration } = effects[hiddenBy];
    win.animate([...frames].reverse(), { duration, easing: 'cubic-bezier(0.2, 0.6, 0.3, 1)' });
  }

  const actions = {
    close: () => hide('close'),
    minimize: () => hide('minimize'),
    zoom: toggleZoom,
    restore: show,
  };

  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (button && actions[button.dataset.action]) actions[button.dataset.action]();
  });

  // Filter values are in pixels, so scale the brushwork with the painting.
  function tuneFilters() {
    const u = unit();
    for (const el of root.querySelectorAll('[data-tune-frequency]')) {
      const [fx, fy] = el.dataset.tuneFrequency.split(' ').map(Number);
      el.setAttribute('baseFrequency', `${(fx / u).toFixed(4)} ${(fy / u).toFixed(4)}`);
    }
    for (const el of root.querySelectorAll('[data-tune-scale]')) {
      el.setAttribute('scale', (Number(el.dataset.tuneScale) * u).toFixed(2));
    }
    for (const el of root.querySelectorAll('[data-tune-blur]')) {
      el.setAttribute('stdDeviation', (Number(el.dataset.tuneBlur) * u).toFixed(2));
    }
  }

  let resizeFrame = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      geo = fit(geo);
      render();
      tuneFilters();
      syncZoom();
    });
  });

  render();
  tuneFilters();
  root.classList.add('is-ready');
})();
