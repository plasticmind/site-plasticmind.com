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

  function openDrawer(direction) {
    shell.dataset.drawer = direction;
    document.body.style.overflow = 'hidden';

    // Focus management: only the open drawer should be interactive
    mainContent.setAttribute('inert', '');
    if (direction === 'left') {
      leftDrawer.removeAttribute('inert');
    } else {
      rightDrawer.removeAttribute('inert');
    }
  }

  function closeDrawers() {
    shell.dataset.drawer = '';
    document.body.style.overflow = '';

    // Restore normal focus: main content interactive, drawers inert
    mainContent.removeAttribute('inert');
    leftDrawer.setAttribute('inert', '');
    rightDrawer.setAttribute('inert', '');
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
  // Swipe Detection
  // ========================

  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const swipeThreshold = 50;
  const swipeRestraint = 100;

  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaY) < swipeRestraint) {
      const currentDrawer = shell.dataset.drawer;

      if (deltaX > 0) {
        // Swipe right - open left drawer or close right
        if (currentDrawer === 'right') {
          closeDrawers();
        } else if (!currentDrawer) {
          openDrawer('left');
        }
      } else {
        // Swipe left - close left drawer or open right
        if (currentDrawer === 'left') {
          closeDrawers();
        } else if (!currentDrawer) {
          openDrawer('right');
        }
      }
    }
  }

  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });

  // ========================
  // Bottom Drawers
  // ========================

  const bottomDrawers = document.querySelectorAll('.l-bottom-drawer');
  const bottomDrawerTriggers = document.querySelectorAll('[data-drawer-target]');

  function openBottomDrawer(drawerId) {
    const drawer = document.getElementById(drawerId);
    if (drawer) {
      bottomDrawers.forEach(d => {
        d.classList.remove('is-open');
        d.setAttribute('inert', '');
      });
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      drawer.removeAttribute('inert');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeBottomDrawer(drawer) {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.setAttribute('inert', '');
    document.body.style.overflow = '';
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
      const content = openDrawer.querySelector('.l-bottom-drawer__content');
      const trigger = e.target.closest('[data-drawer-target]');
      // Close if click is outside drawer content and not on a trigger
      if (!content.contains(e.target) && !trigger) {
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
    }
  });

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
