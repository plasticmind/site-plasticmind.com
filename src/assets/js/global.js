// Plasticmind Global JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // ========================
  // Drawer Management
  // ========================

  const shell = document.querySelector('.l-shell');
  const overlay = document.querySelector('.l-drawer-overlay');
  const menuButton = document.querySelector('[data-action="toggle-menu"]');
  const mainContent = document.querySelector('.l-main');
  const leftDrawer = document.getElementById('menu-drawer');
  const rightDrawer = document.getElementById('right-drawer');

  // Track which element opened the drawer so we can restore focus on close
  var drawerTrigger = null;

  var focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function openDrawer(direction) {
    drawerTrigger = document.activeElement;
    shell.dataset.drawer = direction;
    document.body.style.overflow = 'hidden';

    // Set drawer progress for dim overlays
    var drawer = direction === 'left' ? leftDrawer : rightDrawer;
    drawer.style.setProperty('--drawer-progress', 1);
    mainContent.style.setProperty('--drawer-progress', 1);

    // Focus management: only the open drawer should be interactive
    mainContent.setAttribute('inert', '');
    var activeDrawer;
    if (direction === 'left') {
      leftDrawer.removeAttribute('inert');
      activeDrawer = leftDrawer;
    } else {
      rightDrawer.removeAttribute('inert');
      activeDrawer = rightDrawer;
    }
    // Defer focus until the browser has processed the inert removal
    requestAnimationFrame(function() {
      var firstFocusable = activeDrawer.querySelector(focusableSelector);
      if (firstFocusable) firstFocusable.focus();
    });
  }

  function closeDrawers() {
    shell.dataset.drawer = '';
    document.body.style.overflow = '';

    // Reset drawer progress for dim overlays
    leftDrawer.style.removeProperty('--drawer-progress');
    rightDrawer.style.removeProperty('--drawer-progress');
    mainContent.style.removeProperty('--drawer-progress');

    // Restore normal focus: main content interactive, drawers inert
    mainContent.removeAttribute('inert');
    leftDrawer.setAttribute('inert', '');
    rightDrawer.setAttribute('inert', '');

    // Return focus to the element that opened the drawer
    if (drawerTrigger && typeof drawerTrigger.focus === 'function') {
      var el = drawerTrigger;
      drawerTrigger = null;
      requestAnimationFrame(function() { el.focus(); });
    }
  }

  if (menuButton) {
    menuButton.addEventListener('click', function(e) {
      e.stopPropagation();
      if (shell.dataset.drawer === 'left') {
        closeDrawers();
      } else {
        openDrawer('left');
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeDrawers);
  }

  if (mainContent) {
    mainContent.addEventListener('click', () => {
      if (shell.dataset.drawer) {
        closeDrawers();
      }
    });
  }

  // ========================
  // Progressive Swipe Gesture
  // ========================

  const LEFT_DRAWER_WIDTH = 264;   // 64px bar + 200px nav
  const RIGHT_DRAWER_WIDTH = 280;
  const DIRECTION_LOCK_DISTANCE = 10;
  const SNAP_THRESHOLD = 0.35;
  const VELOCITY_THRESHOLD = 0.3;  // px/ms
  const EDGE_ZONE = 120;           // Wide enough to catch on mobile without fighting browser back-swipe

  let isDragging = false;
  let directionLocked = false;
  let dragDirection = null;        // 'left' or 'right'
  let dragStartedOpen = false;
  let startX = 0;
  let startY = 0;
  let lastMoveX = 0;
  let lastMoveTime = 0;
  let velocityX = 0;

  function applyDrawerProgress(direction, progress) {
    const width = direction === 'left' ? LEFT_DRAWER_WIDTH : RIGHT_DRAWER_WIDTH;
    const drawer = direction === 'left' ? leftDrawer : rightDrawer;

    if (direction === 'left') {
      drawer.style.transform = 'translateX(' + (-width * (1 - progress)) + 'px)';
      mainContent.style.transform = 'translateX(' + (width * progress) + 'px)';
    } else {
      drawer.style.transform = 'translateX(' + (width * (1 - progress)) + 'px)';
      mainContent.style.transform = 'translateX(' + (-width * progress) + 'px)';
    }

    if (progress > 0) {
      drawer.style.zIndex = '102';
    } else {
      drawer.style.zIndex = '';
    }

    // Drive dim overlays on drawer and main content
    drawer.style.setProperty('--drawer-progress', progress);
    mainContent.style.setProperty('--drawer-progress', progress);

    overlay.style.opacity = progress;
  }

  function clearDragStyles() {
    shell.classList.remove('is-dragging');

    [leftDrawer, rightDrawer].forEach(function(d) {
      d.style.transform = '';
      d.style.zIndex = '';
      d.style.removeProperty('--drawer-progress');
    });
    mainContent.style.transform = '';
    mainContent.style.removeProperty('--drawer-progress');
    overlay.style.opacity = '';
    overlay.style.visibility = '';
  }

  function resetDragState() {
    isDragging = false;
    directionLocked = false;
    dragDirection = null;
    dragStartedOpen = false;
    startX = 0;
    startY = 0;
    lastMoveX = 0;
    lastMoveTime = 0;
    velocityX = 0;
  }

  function handleTouchStart(e) {
    var touch = e.changedTouches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    lastMoveX = startX;
    lastMoveTime = Date.now();
    velocityX = 0;
    directionLocked = false;
    isDragging = false;

    var currentDrawer = shell.dataset.drawer;
    if (currentDrawer === 'left' || currentDrawer === 'right') {
      dragStartedOpen = true;
      dragDirection = currentDrawer;
    } else {
      dragStartedOpen = false;
      dragDirection = null;
    }
  }

  function handleTouchMove(e) {
    var touch = e.changedTouches[0];
    var deltaX = touch.clientX - startX;
    var deltaY = touch.clientY - startY;

    // Direction lock: decide horizontal vs vertical within first ~10px
    if (!directionLocked) {
      if (Math.abs(deltaX) < DIRECTION_LOCK_DISTANCE && Math.abs(deltaY) < DIRECTION_LOCK_DISTANCE) {
        return; // Not enough movement to decide
      }
      directionLocked = true;

      // More vertical than horizontal — let browser scroll
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        dragDirection = null;
        return;
      }

      // Determine direction if drawer wasn't already open
      if (!dragStartedOpen) {
        var isNearLeftEdge = startX < EDGE_ZONE;
        var isNearRightEdge = startX > window.innerWidth - EDGE_ZONE;

        if (deltaX > 0 && isNearLeftEdge) {
          dragDirection = 'left';
        } else if (deltaX < 0 && isNearRightEdge) {
          dragDirection = 'right';
        } else {
          dragDirection = null;
          return;
        }
      }
    }

    // No valid drag direction — bail
    if (!dragDirection) return;

    e.preventDefault();

    // Commit to dragging
    if (!isDragging) {
      isDragging = true;
      shell.classList.add('is-dragging');
      overlay.style.visibility = 'visible';
    }

    // Track velocity
    var now = Date.now();
    var dt = now - lastMoveTime;
    if (dt > 0) {
      velocityX = (touch.clientX - lastMoveX) / dt;
    }
    lastMoveX = touch.clientX;
    lastMoveTime = now;

    // Calculate progress (0 = closed, 1 = open)
    var width = dragDirection === 'left' ? LEFT_DRAWER_WIDTH : RIGHT_DRAWER_WIDTH;
    var progress;

    if (dragDirection === 'left') {
      progress = dragStartedOpen
        ? 1 + deltaX / width    // closing: starts at 1, decreases
        : deltaX / width;       // opening: starts at 0, increases
    } else {
      progress = dragStartedOpen
        ? 1 - deltaX / width    // closing: starts at 1, decreases (positive deltaX closes)
        : -deltaX / width;      // opening: starts at 0, increases (negative deltaX opens)
    }

    progress = Math.max(0, Math.min(1, progress));
    applyDrawerProgress(dragDirection, progress);
  }

  function handleTouchEnd(e) {
    if (!isDragging || !dragDirection) {
      resetDragState();
      return;
    }

    var touch = e.changedTouches[0];
    var deltaX = touch.clientX - startX;
    var width = dragDirection === 'left' ? LEFT_DRAWER_WIDTH : RIGHT_DRAWER_WIDTH;

    // Final progress
    var progress;
    if (dragDirection === 'left') {
      progress = dragStartedOpen ? 1 + deltaX / width : deltaX / width;
    } else {
      progress = dragStartedOpen ? 1 - deltaX / width : -deltaX / width;
    }
    progress = Math.max(0, Math.min(1, progress));

    // Snap decision: velocity overrides position
    var shouldOpen;
    if (Math.abs(velocityX) > VELOCITY_THRESHOLD) {
      // Fast flick — use direction
      if (dragDirection === 'left') {
        shouldOpen = velocityX > 0;
      } else {
        shouldOpen = velocityX < 0;
      }
    } else {
      shouldOpen = progress >= SNAP_THRESHOLD;
    }

    // Remove drag mode (re-enables CSS transitions for snap)
    clearDragStyles();

    // Snap to final state
    if (shouldOpen) {
      openDrawer(dragDirection);
    } else {
      closeDrawers();
    }

    resetDragState();
  }

  function handleTouchCancel() {
    if (!isDragging) {
      resetDragState();
      return;
    }

    clearDragStyles();

    // Restore pre-gesture state
    if (dragStartedOpen && dragDirection) {
      openDrawer(dragDirection);
    } else {
      closeDrawers();
    }

    resetDragState();
  }

  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
  document.addEventListener('touchcancel', handleTouchCancel, { passive: true });

  // ========================
  // Bottom Drawers
  // ========================

  const bottomDrawers = document.querySelectorAll('.l-bottom-drawer');
  const bottomDrawerTriggers = document.querySelectorAll('[data-drawer-target]');

  // Track which element opened the bottom drawer
  var bottomDrawerTrigger = null;
  var bottomDrawerTrapHandler = null;

  function trapFocusIn(container) {
    return function(e) {
      if (e.key !== 'Tab') return;
      var focusables = Array.from(container.querySelectorAll(focusableSelector));
      if (focusables.length === 0) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
  }

  function openBottomDrawer(drawerId) {
    const drawer = document.getElementById(drawerId);
    if (drawer) {
      bottomDrawerTrigger = document.activeElement;
      bottomDrawers.forEach(d => {
        d.classList.remove('is-open');
        d.setAttribute('inert', '');
      });
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      drawer.removeAttribute('inert');
      document.body.style.overflow = 'hidden';

      // Trap focus within the bottom drawer
      if (bottomDrawerTrapHandler) {
        document.removeEventListener('keydown', bottomDrawerTrapHandler);
      }
      bottomDrawerTrapHandler = trapFocusIn(drawer);
      document.addEventListener('keydown', bottomDrawerTrapHandler);

      // Defer focus until the browser has processed the inert removal
      requestAnimationFrame(function() {
        var firstFocusable = drawer.querySelector(focusableSelector);
        if (firstFocusable) firstFocusable.focus();
      });
    }
  }

  function closeBottomDrawer(drawer) {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.setAttribute('inert', '');
    document.body.style.overflow = '';

    // Remove focus trap
    if (bottomDrawerTrapHandler) {
      document.removeEventListener('keydown', bottomDrawerTrapHandler);
      bottomDrawerTrapHandler = null;
    }

    // Return focus to the element that opened the bottom drawer
    if (bottomDrawerTrigger && typeof bottomDrawerTrigger.focus === 'function') {
      var el = bottomDrawerTrigger;
      bottomDrawerTrigger = null;
      requestAnimationFrame(function() { el.focus(); });
    }
  }

  function closeAllBottomDrawers() {
    bottomDrawers.forEach(drawer => closeBottomDrawer(drawer));
  }

  // Trigger buttons
  bottomDrawerTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.dataset.drawerTarget;
      openBottomDrawer(targetId);
    });
  });

  // Close buttons
  document.querySelectorAll('.l-bottom-drawer__close').forEach(btn => {
    btn.addEventListener('click', () => {
      const drawer = btn.closest('.l-bottom-drawer');
      closeBottomDrawer(drawer);
    });
  });

  // Close on backdrop click
  bottomDrawers.forEach(drawer => {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        closeBottomDrawer(drawer);
      }
    });
  });

  // Close bottom drawers when clicking outside
  document.addEventListener('click', (e) => {
    const openDrawer = document.querySelector('.l-bottom-drawer.is-open');
    if (openDrawer) {
      const trigger = e.target.closest('[data-drawer-target]');
      // Close if click is outside the drawer and not on a trigger
      if (!openDrawer.contains(e.target) && !trigger) {
        closeBottomDrawer(openDrawer);
      }
    }
  });

  // ========================
  // Theme Mode (Light/System/Dark)
  // ========================

  const themeInputs = document.querySelectorAll('input[name="theme"]');
  const themeToggleButton = document.querySelector('[data-action="toggle-theme"]');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme) {
    if (theme === 'system') {
      // Use system preference
      const systemTheme = prefersDark.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', systemTheme);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  function setTheme(theme) {
    localStorage.setItem('theme', theme);
    applyTheme(theme);

    // Set preference attribute for toolbar icon
    document.documentElement.setAttribute('data-theme-pref', theme);

    // Update radio buttons in drawer
    themeInputs.forEach(input => {
      input.checked = input.value === theme;
    });
  }

  // Listen for system preference changes
  prefersDark.addEventListener('change', () => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    if (savedTheme === 'system') {
      applyTheme('system');
    }
  });

  // Initialize theme
  const savedTheme = localStorage.getItem('theme') || 'system';
  setTheme(savedTheme);

  // Theme picker radio buttons
  themeInputs.forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) {
        setTheme(input.value);
      }
    });
  });

  // Toolbar toggle button cycles through modes
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      const currentTheme = localStorage.getItem('theme') || 'system';
      const themes = ['light', 'system', 'dark'];
      const currentIndex = themes.indexOf(currentTheme);
      const nextTheme = themes[(currentIndex + 1) % themes.length];
      setTheme(nextTheme);
    });
  }

  // ========================
  // Text Size Slider
  // ========================

  const textSizeSlider = document.getElementById('font-size-range');
  const textSizeDecreaseBtn = document.querySelector('.c-font-size-slider__icon--small');
  const textSizeIncreaseBtn = document.querySelector('.c-font-size-slider__icon--large');
  const textSizeLabels = ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large'];

  function setTextSize(size) {
    // Clamp to valid range
    size = Math.max(1, Math.min(5, parseInt(size)));

    document.documentElement.setAttribute('data-text-size', size);
    localStorage.setItem('textSize', size);

    if (textSizeSlider) {
      textSizeSlider.value = size;
      textSizeSlider.setAttribute('aria-valuetext', textSizeLabels[size - 1]);
    }
  }

  if (textSizeSlider) {
    textSizeSlider.addEventListener('input', () => {
      setTextSize(textSizeSlider.value);
    });
  }

  if (textSizeDecreaseBtn) {
    textSizeDecreaseBtn.addEventListener('click', () => {
      const current = parseInt(localStorage.getItem('textSize') || '3');
      setTextSize(current - 1);
    });
  }

  if (textSizeIncreaseBtn) {
    textSizeIncreaseBtn.addEventListener('click', () => {
      const current = parseInt(localStorage.getItem('textSize') || '3');
      setTextSize(current + 1);
    });
  }

  const savedTextSize = localStorage.getItem('textSize') || '3';
  setTextSize(savedTextSize);

  // ========================
  // Line Height Buttons
  // ========================

  const lineHeightButtons = document.querySelectorAll('[data-line-height]');

  function setLineHeight(value) {
    document.documentElement.setAttribute('data-line-height', value);
    localStorage.setItem('lineHeight', value);

    lineHeightButtons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.lineHeight === value);
    });
  }

  lineHeightButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setLineHeight(btn.dataset.lineHeight);
    });
  });

  const savedLineHeight = localStorage.getItem('lineHeight') || 'normal';
  setLineHeight(savedLineHeight);

  // ========================
  // Keyboard Navigation
  // ========================

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeDrawers();
      closeAllBottomDrawers();

      // Close mini-menu if open
      var miniMenu = document.querySelector('.c-mini-menu');
      if (miniMenu && miniMenu.classList.contains('is-open')) {
        miniMenu.classList.remove('is-open');
        var logo = document.querySelector('.c-site-header__logo');
        if (logo) logo.focus();
      }
    }

    // [ and ] toggle drawers (only when not in an input/textarea/contenteditable)
    var tag = e.target.tagName;
    var isEditable = tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable;
    if (!isEditable && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (e.key === '[') {
        if (shell.dataset.drawer === 'left') {
          closeDrawers();
        } else {
          openDrawer('left');
        }
      } else if (e.key === ']') {
        if (shell.dataset.drawer === 'right') {
          closeDrawers();
        } else {
          openDrawer('right');
        }
      }
    }
  });

  // ========================
  // Desktop Edge Handles
  // ========================

  var isTouch = ('ontouchstart' in window) || window.matchMedia('(pointer: coarse)').matches;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var edgeHandleLeft = document.querySelector('[data-edge-handle="left"]');
  var edgeHandleRight = document.querySelector('[data-edge-handle="right"]');

  // Show edge handles on non-touch devices (or always if reduced motion skips hints)
  if (!isTouch || prefersReducedMotion) {
    if (edgeHandleLeft) edgeHandleLeft.hidden = false;
    if (edgeHandleRight) edgeHandleRight.hidden = false;
  }

  if (edgeHandleLeft) {
    edgeHandleLeft.addEventListener('click', function() {
      if (shell.dataset.drawer === 'left') {
        closeDrawers();
      } else {
        openDrawer('left');
      }
    });
  }

  if (edgeHandleRight) {
    edgeHandleRight.addEventListener('click', function() {
      if (shell.dataset.drawer === 'right') {
        closeDrawers();
      } else {
        openDrawer('right');
      }
    });
  }

  // ========================
  // Touch Swipe Hints
  // ========================

  var swipeHintContainer = document.querySelector('.c-swipe-hint');
  var swipeHintLeft = document.querySelector('[data-swipe-hint="left"]');

  if (isTouch && !prefersReducedMotion && swipeHintContainer) {
    var hintSeen = localStorage.getItem('swipe-hint-seen');

    if (!hintSeen) {
      swipeHintContainer.hidden = false;

      // Start hint animation after short delay
      if (swipeHintLeft) {
        setTimeout(function() {
          swipeHintLeft.classList.add('is-animating');
        }, 800);

        // Auto-fade after animation completes (3 loops x 1.4s = 4.2s + 0.8s delay)
        setTimeout(function() {
          if (swipeHintLeft.classList.contains('is-animating')) {
            swipeHintLeft.classList.remove('is-animating');
            swipeHintLeft.classList.add('is-fading-out');
          }
        }, 5400);
      }

      // Auto-hide entire hint after animation done
      setTimeout(function() {
        dismissAllHints();
      }, 6200);

      // Watch for successful left drawer open via MutationObserver
      var hintObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.attributeName === 'data-drawer') {
            if (shell.dataset.drawer === 'left') {
              localStorage.setItem('swipe-hint-seen', 'true');
              dismissAllHints();
              hintObserver.disconnect();
            }
          }
        });
      });

      hintObserver.observe(shell, { attributes: true, attributeFilter: ['data-drawer'] });

    }
  }

  function dismissAllHints() {
    if (swipeHintContainer) swipeHintContainer.hidden = true;

    // Show edge handles if they were hidden for touch
    if (edgeHandleLeft) edgeHandleLeft.hidden = false;
    if (edgeHandleRight) edgeHandleRight.hidden = false;
  }

  // ========================
  // Archive Banner Dismiss
  // ========================

  const archiveBanner = document.querySelector('[data-archive-banner]');

  if (archiveBanner) {
    const postSlug = archiveBanner.dataset.postSlug;
    const dismissedKey = `archive-banner-dismissed-${postSlug}`;

    function updateBannerHeight() {
      const bannerHeight = archiveBanner.offsetHeight;
      document.documentElement.style.setProperty('--archive-banner-height', bannerHeight + 'px');
    }

    function dismissBanner() {
      archiveBanner.classList.add('is-dismissed');
      localStorage.setItem(dismissedKey, 'true');
      document.documentElement.style.setProperty('--archive-banner-height', '0px');
    }

    // Check if already dismissed for this post
    if (localStorage.getItem(dismissedKey) === 'true') {
      archiveBanner.classList.add('is-dismissed');
    } else {
      // Set initial banner height
      updateBannerHeight();
      // Update on resize (text may wrap differently)
      window.addEventListener('resize', updateBannerHeight);
    }

    // Click anywhere on banner to dismiss
    archiveBanner.addEventListener('click', dismissBanner);

    // Keyboard support for accessibility
    archiveBanner.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dismissBanner();
      }
    });
  }
});
