// Pagefind search integration
// Lazy-loads Pagefind on first search drawer open, searches as-you-type

(function () {
  var pagefind = null;
  var searchInput = document.getElementById('search-input');
  var resultsContainer = document.getElementById('search-results');
  var statusEl = document.getElementById('search-status');
  var debounceTimer = null;
  var currentSearch = null;
  var currentShown = 0;
  var PAGE_SIZE = 10;

  if (!searchInput || !resultsContainer) return;

  // Lazy-load Pagefind JS on first interaction
  async function initPagefind() {
    if (pagefind) return pagefind;
    try {
      pagefind = await import('/pagefind/pagefind.js');
      await pagefind.init();
      return pagefind;
    } catch (e) {
      resultsContainer.innerHTML =
        '<p class="c-search-results__empty">Search is not available right now. Try running a build first.</p>';
      statusEl.textContent = 'Search unavailable';
      pagefind = null;
      return null;
    }
  }

  // Observe the search drawer opening to trigger lazy load
  var searchDrawer = document.getElementById('search-drawer');
  if (searchDrawer) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'class' && searchDrawer.classList.contains('is-open')) {
          initPagefind();
        }
      });
    });
    observer.observe(searchDrawer, { attributes: true, attributeFilter: ['class'] });
  }

  // Debounced search on input
  searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    var query = searchInput.value.trim();

    if (!query) {
      resultsContainer.innerHTML = '';
      statusEl.textContent = '';
      currentSearch = null;
      currentShown = 0;
      return;
    }

    debounceTimer = setTimeout(function () {
      performSearch(query);
    }, 300);
  });

  async function performSearch(query) {
    var pf = await initPagefind();
    if (!pf) return;

    resultsContainer.innerHTML = '<p class="c-search-results__loading">Searching\u2026</p>';

    var search = await pf.search(query);
    currentSearch = search;
    currentShown = 0;

    if (!search.results.length) {
      resultsContainer.innerHTML =
        '<p class="c-search-results__empty">No results for \u201c' + escapeHtml(query) + '\u201d</p>';
      statusEl.textContent = 'No results found';
      return;
    }

    var countText = search.results.length + ' result' + (search.results.length === 1 ? '' : 's') + ' found';
    statusEl.textContent = countText;

    resultsContainer.innerHTML = '<p class="c-search-results__count">' + escapeHtml(countText) + '</p>'
      + '<ul class="c-search-results__list"></ul>';

    await loadMore();
  }

  async function loadMore() {
    if (!currentSearch) return;

    var end = Math.min(currentShown + PAGE_SIZE, currentSearch.results.length);
    var batch = currentSearch.results.slice(currentShown, end);
    var items = await Promise.all(batch.map(function (r) { return r.data(); }));

    var list = resultsContainer.querySelector('.c-search-results__list');
    items.forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'c-search-results__item';
      li.innerHTML = '<a href="' + escapeHtml(item.url) + '" class="c-search-results__link">'
        + '<span class="c-search-results__header">'
        + '<span class="c-search-results__title">' + escapeHtml(item.meta.title || 'Untitled') + '</span>'
        + (item.meta.date ? '<span class="c-search-results__meta">' + escapeHtml(item.meta.date) + '</span>' : '')
        + '</span>'
        + '<span class="c-search-results__excerpt">' + item.excerpt + '</span>'
        + '</a>';
      list.appendChild(li);
    });

    currentShown = end;

    // Remove existing load-more button if present
    var existing = resultsContainer.querySelector('.c-search-results__load-more');
    if (existing) existing.remove();

    if (currentShown < currentSearch.results.length) {
      var remaining = currentSearch.results.length - currentShown;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'c-search-results__load-more';
      btn.textContent = 'Load more (' + remaining + ' remaining)';
      btn.addEventListener('click', function () {
        loadMore();
      });
      resultsContainer.appendChild(btn);
    }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();
