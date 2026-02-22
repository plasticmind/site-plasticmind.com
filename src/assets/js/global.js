// Plasticmind Global JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const shell = document.querySelector('.l-shell');
  const overlay = document.querySelector('.l-drawer-overlay');
  const menuButton = document.querySelector('[data-action="toggle-menu"]');
  const mainContent = document.querySelector('.l-main');

  // ========================
  // Left Drawer Toggle
  // ========================

  function toggleLeftDrawer() {
    const currentDrawer = shell.dataset.drawer;
    if (currentDrawer === 'left') {
      closeDrawers();
    } else {
      openDrawer('left');
    }
  }

  function openDrawer(direction) {
    shell.dataset.drawer = direction;
    document.body.style.overflow = 'hidden';
  }

  function closeDrawers() {
    shell.dataset.drawer = '';
    document.body.style.overflow = '';
  }

  // Menu button click
  if (menuButton) {
    menuButton.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleLeftDrawer();
    });
  }

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', closeDrawers);
  }

  // Close drawers on main content click
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
      bottomDrawers.forEach(d => d.classList.remove('is-open'));
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeBottomDrawer(drawer) {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
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
  // Dark Mode Toggle
  // ========================

  const themeToggle = document.querySelector('[data-action="toggle-theme"]');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // ========================
  // Text Size Controls
  // ========================

  const textSizeButtons = document.querySelectorAll('[data-action="text-size"]');

  function setTextSize(size) {
    document.documentElement.setAttribute('data-text-size', size);
    localStorage.setItem('textSize', size);

    textSizeButtons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.size === size);
    });
  }

  textSizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setTextSize(btn.dataset.size);
    });
  });

  const savedTextSize = localStorage.getItem('textSize');
  if (savedTextSize) {
    setTextSize(savedTextSize);
  }

  // ========================
  // Font Family Controls
  // ========================

  const fontFamilyButtons = document.querySelectorAll('[data-action="font-family"]');

  function setFontFamily(font) {
    document.documentElement.setAttribute('data-font', font);
    localStorage.setItem('fontFamily', font);

    fontFamilyButtons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.font === font);
    });
  }

  fontFamilyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setFontFamily(btn.dataset.font);
    });
  });

  const savedFont = localStorage.getItem('fontFamily');
  if (savedFont) {
    setFontFamily(savedFont);
  }

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
