// Pagefind search integration
// Lazy-loads Pagefind on first search drawer open, searches as-you-type

(function () {
  var pagefind = null;
  var searchInput = document.getElementById('search-input');
  var resultsContainer = document.getElementById('search-results');
  var statusEl = document.getElementById('search-status');
  var debounceTimer = null;

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

    if (!search.results.length) {
      resultsContainer.innerHTML =
        '<p class="c-search-results__empty">No results for \u201c' + escapeHtml(query) + '\u201d</p>';
      statusEl.textContent = 'No results found';
      return;
    }

    var countText = search.results.length + ' result' + (search.results.length === 1 ? '' : 's') + ' found';
    statusEl.textContent = countText;

    // Load the first 10 results
    var limit = Math.min(search.results.length, 10);
    var items = await Promise.all(search.results.slice(0, limit).map(function (r) { return r.data(); }));

    var html = '<p class="c-search-results__count">' + escapeHtml(countText) + '</p>';
    html += '<ul class="c-search-results__list">';
    items.forEach(function (item) {
      html += '<li class="c-search-results__item">';
      html += '<a href="' + escapeHtml(item.url) + '" class="c-search-results__link">';
      html += '<span class="c-search-results__header">';
      html += '<span class="c-search-results__title">' + escapeHtml(item.meta.title || 'Untitled') + '</span>';
      if (item.meta.date) {
        html += '<span class="c-search-results__meta">' + escapeHtml(item.meta.date) + '</span>';
      }
      html += '</span>';
      html += '<span class="c-search-results__excerpt">' + item.excerpt + '</span>';
      html += '</a>';
      html += '</li>';
    });
    html += '</ul>';

    if (search.results.length > limit) {
      html += '<p class="c-search-results__more">Showing ' + limit + ' of ' + search.results.length + ' results</p>';
    }

    resultsContainer.innerHTML = html;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();
