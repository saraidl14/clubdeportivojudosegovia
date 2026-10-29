(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var heroArches = document.querySelector('.hero .arch-row');
  if (heroArches) {
    setTimeout(function () {
      heroArches.classList.add('is-built');
    }, 150);
  }

  var upcomingList = document.getElementById('events-upcoming');
  var pastList = document.getElementById('events-past');
  var pastWrap = document.getElementById('events-past-wrap');
  if (upcomingList && pastList && pastWrap) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var finished = [];
    upcomingList.querySelectorAll('.event-card[data-date]').forEach(function (card) {
      var p = card.getAttribute('data-date').split('-');
      var lastDay = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
      if (lastDay < today) finished.push({ card: card, lastDay: lastDay });
    });
    finished.sort(function (a, b) { return b.lastDay - a.lastDay; });
    finished.forEach(function (item) { pastList.appendChild(item.card); });
    if (finished.length) pastWrap.hidden = false;
  }

  var searchInput = document.getElementById('events-search');
  var chipBar = document.querySelector('.event-filter__chips');
  if (searchInput && chipBar) {
    var activeFilter = 'all';
    var emptyMsg = document.getElementById('events-empty');
    var norm = function (t) {
      return t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    };
    var applyFilter = function () {
      var q = norm(searchInput.value.trim());
      var visibleUpcoming = 0;
      var visiblePast = 0;
      document.querySelectorAll('#events-upcoming .event-card, #events-past .event-card').forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').split(' ');
        var tagOk = activeFilter === 'all' || tags.indexOf(activeFilter) !== -1;
        var textOk = !q || norm(card.textContent).indexOf(q) !== -1;
        var show = tagOk && textOk;
        card.classList.toggle('is-filtered-out', !show);
        if (show) {
          if (card.parentNode.id === 'events-past') visiblePast++;
          else visibleUpcoming++;
        }
      });
      var pastBlock = document.getElementById('events-past-wrap');
      if (pastBlock) pastBlock.classList.toggle('is-filtered-out', visiblePast === 0);
      if (emptyMsg) emptyMsg.hidden = visibleUpcoming + visiblePast > 0;
    };
    chipBar.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      activeFilter = btn.getAttribute('data-filter');
      chipBar.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      applyFilter();
    });
    searchInput.addEventListener('input', applyFilter);
  }

  var resultsToggle = document.getElementById('results-toggle');
  if (resultsToggle) {
    resultsToggle.addEventListener('click', function () {
      var extraRows = document.querySelectorAll('.results-table tbody tr.extra-row');
      var expanded = resultsToggle.getAttribute('aria-expanded') === 'true';
      extraRows.forEach(function (row) {
        row.classList.toggle('row-hidden', expanded);
      });
      resultsToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      resultsToggle.textContent = expanded ? 'Mostrar más' : 'Mostrar menos';
    });
  }
})();
